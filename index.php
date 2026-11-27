<?php
declare(strict_types=1);

$path = rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/', '/') ?: '/';
$admin = $path === '/yonetim';
$list = $path === '/teklif-listem';
$method = $_SERVER['REQUEST_METHOD'];
$data = __DIR__ . '/veri/';
$catalog = $data . 'urunler.json';
$categories = readJson($data . 'kategoriler.json');
$phone = '905422543628';

function readJson(string $file): array {
    return json_decode(file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);
}

function saveJson(string $file, array $value): void {
    $tmp = tempnam(dirname($file), 'kayit-');
    try {
        if (file_put_contents($tmp, json_encode($value, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR)) === false || !rename($tmp, $file)) {
            throw new RuntimeException('Kayıt yazılamadı.');
        }
    } finally {
        if (is_file($tmp)) unlink($tmp);
    }
}

function locked(callable $action) {
    $file = fopen(__DIR__ . '/veri/yazma.lock', 'c');
    if (!$file || !flock($file, LOCK_EX)) throw new RuntimeException('Kayıt kilidi alınamadı.');
    try {
        return $action();
    } finally {
        fclose($file);
    }
}

function products(): array {
    global $catalog, $data;
    $items = readJson(is_file($catalog) ? $catalog : $data . 'katalog.json');
    $photos = readJson($data . 'fotograflar.json');
    $covers = readJson($data . 'urun-kapaklari.json');
    foreach ($items as &$item) {
        if (!$item['images'] && empty($item['images_managed'])) {
            $cover = isset($covers[$item['code']]) ? [$covers[$item['code']]] : [];
            $item['images'] = array_values(array_filter(array_merge($cover, $photos[$item['code']] ?? []), fn($file) => is_file(__DIR__ . '/yuklemeler/' . $file)));
        }
    }
    unset($item);
    return $items;
}

function h(string $value): string {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function slug(string $value): string {
    $map = ['Ç'=>'c','Ğ'=>'g','İ'=>'i','Ö'=>'o','Ş'=>'s','Ü'=>'u','ç'=>'c','ğ'=>'g','ı'=>'i','ö'=>'o','ş'=>'s','ü'=>'u','â'=>'a','×'=>'x'];
    return trim(preg_replace('/[^a-z0-9]+/', '-', strtolower(strtr($value, $map))), '-');
}

function redirect(string $url, int $status = 303): void {
    header('Location: ' . $url, true, $status);
    exit;
}

function wa(string $message): string {
    global $phone;
    return 'https://wa.me/' . $phone . '?text=' . rawurlencode($message);
}

function offer(array $product): string {
    return wa("Merhaba ST Ambalaj, {$product['name']} ({$product['code']}) için fiyat ve stok bilgisi almak istiyorum.\nTalep ettiğim miktar: ");
}

function url(array $product): string {
    return '/urun/' . $product['slug'];
}

function price(array $product): string {
    return $product['visible'] && $product['price'] !== '' ? number_format((float)$product['price'], 2, ',', '.') . ' TL' : '';
}

function imageUrl(string $file): string {
    return '/yuklemeler/' . rawurlencode($file);
}

function field(string $key): string {
    return is_string($_POST[$key] ?? null) ? trim($_POST[$key]) : '';
}

function token(): void {
    echo '<input type="hidden" name="csrf" value="' . h($_SESSION['csrf']) . '">';
}

if ($path === '/products') redirect('/urunler' . (empty($_SERVER['QUERY_STRING']) ? '' : '?' . $_SERVER['QUERY_STRING']), 301);

if ($admin || $list || str_starts_with($path, "/urun/") || isset($_COOKIE['stambalaj'])) {
    session_name('stambalaj');
    session_set_cookie_params(['path'=>'/', 'httponly'=>true, 'samesite'=>'Lax', 'secure'=>!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off']);
    session_start();
    $_SESSION['csrf'] ??= bin2hex(random_bytes(32));
}

$error = '';
$auth = $data . 'yonetici.json';
$setupKeyFile = $data . 'kurulum-anahtari.txt';
$logged = !empty($_SESSION['admin']);
if ($admin) {
    header('Cache-Control: no-store');
    header('X-Robots-Tag: noindex');
}
if (($admin || $list) && $method === 'POST') {
    try {
        if (!hash_equals($_SESSION['csrf'], field('csrf'))) throw new RuntimeException('Oturum süresi doldu. Sayfayı yenileyin.');
        $action = field('action');
        if ($list) {
            $id = field('id');
            if ($action === 'add' && isset(products()[$id])) {
                $_SESSION['list'][$id] ??= 1;
            } elseif ($action === 'remove') {
                unset($_SESSION['list'][$id]);
            } elseif ($action === 'update') {
                foreach ($_SESSION['list'] ?? [] as $id => $quantity) {
                    $posted = $_POST['quantity'][$id] ?? null;
                    if (is_string($posted) && ctype_digit($posted)) $_SESSION['list'][$id] = max(1, min(999999, (int)$posted));
                }
            }
            redirect('/teklif-listem');
        }
        if ($action === 'setup') {
            locked(function () use ($auth, $setupKeyFile) {
                if (is_file($auth) || !is_file($setupKeyFile)) throw new RuntimeException('İlk kurulum kullanılamıyor.');
                $key = trim((string)file_get_contents($setupKeyFile));
                if (strlen($key) < 32 || !hash_equals($key, field('setup_key'))) throw new RuntimeException('Kurulum anahtarı geçersiz.');
                $password = is_string($_POST['password'] ?? null) ? $_POST['password'] : '';
                if ($password === '') throw new RuntimeException('Yönetici şifresini girin.');
                if ($password !== ($_POST['password_repeat'] ?? null)) throw new RuntimeException('Şifreler eşleşmiyor.');
                saveJson($auth, ['hash'=>password_hash(hash('sha256', $password), PASSWORD_DEFAULT), 'sha256'=>true, 'next'=>0]);
                @unlink($setupKeyFile);
            });
            redirect('/yonetim?kuruldu=1');
        }
        if ($action === 'login' && is_file($auth)) {
            locked(function () use ($auth) {
                $state = readJson($auth);
                if ($state['next'] > time()) throw new RuntimeException('Tekrar denemeden önce kısa bir süre bekleyin.');
                $password = is_string($_POST['password'] ?? null) ? $_POST['password'] : '';
                $hashInput = !empty($state['sha256']) ? hash('sha256', $password) : $password;
                if (!password_verify($hashInput, $state['hash'])) {
                    $state['next'] = time() + 3;
                    saveJson($auth, $state);
                    throw new RuntimeException('Şifre hatalı.');
                }
            });
            session_regenerate_id(true);
            $_SESSION['admin'] = true;
            redirect('/yonetim');
        }
        if (!$logged) throw new RuntimeException('Yönetim paneline giriş yapın.');
        if ($action === 'logout') {
            unset($_SESSION['admin']);
            session_regenerate_id(true);
            redirect('/yonetim');
        }
        if ($action === 'save') {
            locked(function () use ($catalog, $categories) {
                $all = products();
                $id = field('id');
                if ($id !== '' && !isset($all[$id])) throw new RuntimeException('Ürün bulunamadı.');
                $previous = $all[$id] ?? null;
                $name = field('name');
                $code = field('code');
                $category = field('category');
                $price = str_replace(',', '.', field('price'));
                $slug = $previous['slug'] ?? slug($name);
                if ($name === '' || $code === '' || $slug === '' || !isset($categories[$category])) throw new RuntimeException('Ürün adını, kodunu ve kategorisini girin.');
                if ($price !== '' && !preg_match('/^\d{1,10}(?:\.\d{1,2})?$/D', $price)) throw new RuntimeException('Geçerli bir TL fiyatı girin.');
                foreach ($all as $key => $item) {
                    if ((string)$key !== $id && ($item['slug'] === $slug || strcasecmp($item['code'], $code) === 0)) throw new RuntimeException('Ürün adresi veya kodu zaten kullanılıyor.');
                }
                $removed = (array)($_POST['remove'] ?? []);
                $images = array_values(array_diff($previous['images'] ?? [], array_filter($removed, 'is_string')));
                $created = [];
                $uploads = $_FILES['images'] ?? [];
                try {
                    foreach ($uploads['error'] ?? [] as $i => $status) {
                        if ($status === UPLOAD_ERR_NO_FILE) continue;
                        if ($status !== UPLOAD_ERR_OK || $uploads['size'][$i] > 5 * 1024 * 1024) throw new RuntimeException('Her görsel en fazla 5 MB olabilir.');
                        $tmp = $uploads['tmp_name'][$i];
                        $type = (new finfo(FILEINFO_MIME_TYPE))->file($tmp);
                        $ext = ['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp'][$type] ?? null;
                        if (!$ext || !@getimagesize($tmp)) throw new RuntimeException('JPG, PNG veya WebP görseli yükleyin.');
                        if (count($images) >= 12) throw new RuntimeException('Bir üründe en fazla 12 görsel kullanılabilir.');
                        $file = bin2hex(random_bytes(16)) . '.' . $ext;
                        if (!move_uploaded_file($tmp, __DIR__ . '/yuklemeler/' . $file)) throw new RuntimeException('Görsel yüklenemedi.');
                        $created[] = $file;
                        $images[] = $file;
                    }
                    $cover = field('cover');
                    if (in_array($cover, $images, true)) $images = [$cover, ...array_values(array_diff($images, [$cover]))];
                    $id = $id !== '' ? $id : bin2hex(random_bytes(8));
                    $all[$id] = ['name'=>$name, 'code'=>$code, 'slug'=>$slug, 'category'=>$category,
                        'description'=>field('description'), 'specs'=>field('specs'), 'price'=>$price,
                        'visible'=>field('visible') === '1', 'images'=>$images, 'images_managed'=>true];
                    saveJson($catalog, $all);
                } catch (Throwable $exception) {
                    foreach ($created as $file) unlink(__DIR__ . '/yuklemeler/' . $file);
                    throw $exception;
                }
                $shared = array_merge(array_values(readJson(__DIR__ . '/veri/urun-kapaklari.json')), ...array_values(readJson(__DIR__ . '/veri/fotograflar.json')));
                foreach (array_diff($previous['images'] ?? [], $images, $shared) as $file) {
                    @unlink(__DIR__ . '/yuklemeler/' . $file);
                }
            });
            redirect('/yonetim?kaydedildi=1');
        }
    } catch (RuntimeException $exception) {
        $error = $exception->getMessage();
    }
}
$products = products();
$home = $path === '/';
$category = str_starts_with($path, '/kategori/') ? substr($path, strlen("/kategori/")) : '';
$product = null;
foreach ($products as $id => $item) {
    if ($path === url($item)) {
        $product = $item;
        $productId = (string)$id;
        break;
    }
}
$catalogPage = $path === '/urunler' || isset($categories[$category]);
$info = ['/kurumsal'=>'Kurumsal', '/iletisim'=>'İletişim'];
$missing = !$admin && !$list && !$home && !$catalogPage && !$product && !isset($info[$path]);
if ($missing) http_response_code(404);
$title = $product['name'] ?? $categories[$category][0] ?? $info[$path] ?? ($admin ? 'Yönetim' : ($list ? 'Teklif Listem' : ($home ? 'Ambalaj ve Sevkiyat Ürünleri' : ($missing ? 'Sayfa Bulunamadı' : 'Ürün Kataloğu'))));
$general = wa('Merhaba ST Ambalaj, ürün ve fiyat bilgisi almak istiyorum.');
function logo(): void {
    ?><a href="/" class="brand" aria-label="ST Ambalaj ana sayfa"><img src="/st-ambalaj-logo.svg" width="228" height="48" alt="ST Ambalaj"></a><?php
}

function whatsappIcon(): void {
    ?><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M20.7 11.8a8.7 8.7 0 0 1-12.9 7.6L3 20.7l1.3-4.6a8.7 8.7 0 1 1 16.4-4.3Z"/><path fill="currentColor" stroke="none" d="M8.5 7.4c.5-.2.8 0 1 .5l.9 1.9c.1.3 0 .5-.3.8l-.5.6a6 6 0 0 0 3.2 2.8l.6-.8c.2-.3.5-.3.8-.2l1.9.9c.3.1.4.3.3.7-.2 1-1 1.7-2 1.6-3.5-.4-6.5-3.1-7.1-6.4-.2-1 .3-2 1.2-2.4Z"/></svg><?php
}

function card(array $p): void {
    global $categories;
    ?>
    <article class="card">
        <a class="visual" href="<?= h(url($p)) ?>" aria-label="<?= h($p['name']) ?>">
            <?php if ($p['images']): ?><img loading="lazy" src="<?= h(imageUrl($p['images'][0])) ?>" alt="<?= h($p['name']) ?>"><?php else: ?><span><?= h($p['code']) ?></span><?php endif ?>
        </a>
        <div class="card-body">
            <p class="eyebrow"><?= h($categories[$p['category']][0]) ?> · <?= h($p['code']) ?></p>
            <h3><a href="<?= h(url($p)) ?>"><?= h($p['name']) ?></a></h3>
            <p><?= h($p['description']) ?></p>
            <?php if (price($p) !== ''): ?><strong class="price"><?= h(price($p)) ?></strong><?php endif ?>
            <a class="button outline" href="<?= h(offer($p)) ?>">WhatsApp’tan Teklif Al</a>
        </div>
    </article>
    <?php
}
?>
<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="<?= h($product['description'] ?? 'ST Ambalaj ürün kataloğu. Koli bantları, streç filmler ve sevkiyat için koruyucu ambalaj ürünleri.') ?>">
<title><?= h($title) ?> | ST Ambalaj</title>
<link rel="stylesheet" href="/stil.css?v=7">
<link rel="icon" href="/st-ambalaj-logo.svg" type="image/svg+xml">
<script defer src="/uygulama.js?v=3"></script>
</head>
<body>
<header class="site-header"><div class="wrap nav">
<?php logo(); ?>
<nav aria-label="Ana menü"><a href="/urunler">Ürünler</a><a href="/kurumsal">Kurumsal</a><a href="/iletisim">İletişim</a><a href="/teklif-listem">Teklif Listem</a></nav>
<a class="phone" href="tel:+905422543628">0542 254 36 28</a>
</div></header>
<main>
<?php if ($home): ?>
<section class="hero"><div class="wrap hero-inner">
<div class="hero-copy"><p class="eyebrow">AMBALAJ MALZEMELERİ</p>
<h1 class="hero-title"><span>Paketleme ve</span> <span>sevkiyat ürünleri</span></h1>
<p>Koli bantları, streç filmler ve koruyucu ambalaj ürünleri. Kataloğu inceleyin, ihtiyacınız olan miktar için teklif alın.</p>
<div class="actions"><a class="button" href="/urunler">Ürünleri İncele</a><a class="button outline" href="tel:+905422543628">0542 254 36 28</a></div>
</div>
<a class="hero-media hero-catalog" href="/urunler"><img src="/ambalaj-urunleri.webp" width="1440" height="920" fetchpriority="high" alt="ST Ambalaj kataloğundaki 23 ürünün görseli"><span>Tüm Ürünleri İncele</span></a>
</div></section>
<section class="wrap section" id="kategoriler">
<div class="heading category-heading"><h2>Ürün kategorileri</h2><a class="button outline" href="/urunler">Tüm Ürünler</a></div>
<?php $covers = readJson($data . 'kategori-kapaklari.json'); ?>
<div class="category-grid"><?php foreach ($categories as $key => [$label, $description]): $cover = $covers[$key] ?? null; ?>
<a class="category<?= $cover ? ' category-feature' : '' ?>" href="/kategori/<?= h($key) ?>">
<?php if ($cover): ?><img class="category-image" src="<?= h(imageUrl($cover)) ?>" loading="lazy" alt=""><?php endif ?>
<div class="category-copy"><h3><?= h($label) ?></h3><p><?= h($description) ?></p><span class="category-link">Kategoriyi İncele</span></div>
</a>
<?php endforeach ?></div></section>
<?php
$featured = [];
foreach ($products as $item) {
    $featured[$item['category']] ??= $item;
}
?>
<section class="featured" id="urunler"><div class="wrap section">
<div class="heading"><h2>Öne çıkan ürünler</h2><a href="/urunler">Tüm Ürünleri Gör</a></div>
<div class="grid"><?php foreach (array_intersect_key($featured, $categories) as $item) card($item); ?></div>
</div></section>
<?php elseif ($catalogPage): ?>
<section class="banner"><div class="wrap"><h1><?= h($title) ?></h1><p><?= h($categories[$category][1] ?? 'Ürünleri inceleyin ve WhatsApp’tan teklif isteyin.') ?></p></div></section>
<section class="wrap section">
<form class="search" action="<?= h($path) ?>"><label>Ürün adı veya kodu <input type="search" name="ara" value="<?= h(is_string($_GET['ara'] ?? null) ? $_GET['ara'] : '') ?>"></label><button class="button">Ara</button></form>
<div class="filters"><a href="/urunler" <?= $category === '' ? 'aria-current="page"' : '' ?>>Tümü</a>
<?php foreach ($categories as $key => [$label]): ?><a href="/kategori/<?= h($key) ?>" <?= $category === $key ? 'aria-current="page"' : '' ?>><?= h($label) ?></a><?php endforeach ?></div>
<?php $query = slug(is_string($_GET['ara'] ?? null) ? $_GET['ara'] : '');
$filtered = array_filter($products, fn($p) => ($category === '' || $p['category'] === $category) && str_contains(slug($p['name'] . ' ' . $p['code']), $query)); ?>
<p class="muted"><?= count($filtered) ?> ürün</p><div class="grid"><?php foreach ($filtered as $item) card($item); ?></div>
<?php if (!$filtered): ?><p>Aramanıza uygun ürün bulunamadı.</p><?php endif ?>
<?php $categoryPhotos = readJson($data . 'kategori-fotograflari.json')[$category] ?? [];
if ($categoryPhotos && $query === ''): ?>
<section class="category-photos"><h2>Kategori fotoğrafları</h2><div class="photo-grid"><?php foreach ($categoryPhotos as $index => $file): ?><a href="<?= h(imageUrl($file)) ?>"><img src="<?= h(imageUrl($file)) ?>" loading="lazy" alt="<?= h($title) ?> — Fotoğraf <?= $index + 1 ?>"></a><?php endforeach ?></div></section>
<?php endif ?></section>
<?php elseif ($product): ?>
<section class="wrap section"><a class="crumb" href="/kategori/<?= h($product['category']) ?>">← <?= h($categories[$product['category']][0]) ?></a>
<div class="detail"><div class="product-gallery">
<?php if ($product['images']): ?>
<button type="button" class="gallery-open" aria-label="Ürün görselini büyüt" aria-haspopup="dialog">
<img id="gallery-main" src="<?= h(imageUrl($product['images'][0])) ?>" alt="<?= h($product['name']) ?>">
</button>
<?php if (count($product['images']) > 1): ?>
<div class="thumbs"><?php foreach ($product['images'] as $i => $file): ?>
<button type="button" data-image="<?= h(imageUrl($file)) ?>" aria-label="Görsel <?= $i+1 ?>" aria-pressed="<?= $i === 0 ? 'true' : 'false' ?>"><img src="<?= h(imageUrl($file)) ?>" alt=""></button>
<?php endforeach ?></div>
<?php endif ?>
<dialog class="gallery-dialog" aria-label="Ürün fotoğraf galerisi">
<div class="gallery-overlay-content">
<form method="dialog"><button type="submit" class="gallery-close" aria-label="Galeriyi kapat" autofocus>×</button></form>
<?php if (count($product['images']) > 1): ?>
<button type="button" class="gallery-prev" aria-label="Önceki görsel">‹</button>
<?php endif ?>
<img class="gallery-enlarged" alt="<?= h($product['name']) ?>">
<?php if (count($product['images']) > 1): ?>
<button type="button" class="gallery-next" aria-label="Sonraki görsel">›</button>
<p class="gallery-count" aria-live="polite"></p>
<?php endif ?>
</div>
</dialog>
<?php else: ?>
<div class="visual detail-visual"><span><?= h($product['code']) ?></span></div>
<?php endif ?>
</div>
<div><p class="eyebrow"><?= h($product['code']) ?></p><h1><?= h($product['name']) ?></h1><p><?= h($product['description']) ?></p>
<?php if (price($product) !== ''): ?><strong class="price"><?= h(price($product)) ?></strong><?php endif ?>
<div class="actions"><a class="button" href="<?= h(offer($product)) ?>">WhatsApp’tan Teklif Al</a><form method="post" action="/teklif-listem"><input type="hidden" name="action" value="add"><input type="hidden" name="id" value="<?= h($productId) ?>"><?php token(); ?><button class="button outline">Listeye Ekle</button></form></div>
<?php if ($product['specs'] !== ''): ?><h2>Ürün özellikleri</h2><ul class="specs"><?php foreach (preg_split('/\R/', $product['specs'], -1, PREG_SPLIT_NO_EMPTY) as $line): ?><li><?= h($line) ?></li><?php endforeach ?></ul><?php endif ?>
</div></div></section>
<?php elseif ($list): ?>
<section class="wrap section narrow"><h1>Teklif Listem</h1><?php if ($error): ?><p role="alert"><?= h($error) ?></p><?php endif ?>
<?php $selected = array_intersect_key($_SESSION['list'] ?? [], $products);
if (!$selected): ?><p>Teklif listeniz boş.</p><a class="button" href="/urunler">Ürünleri İncele</a><?php else: ?>
<form method="post" id="quote-list"><?php token(); ?><input type="hidden" name="action" value="update">
<?php foreach ($selected as $id => $quantity): $item = $products[$id]; ?>
<div class="list-row"><a href="<?= h(url($item)) ?>"><?= h($item['name']) ?> <small><?= h($item['code']) ?></small></a><label>Miktar<input type="number" min="1" max="999999" name="quantity[<?= h((string)$id) ?>]" value="<?= $quantity ?>"></label><button class="button outline" form="remove-<?= h((string)$id) ?>">Çıkar</button></div>
<?php endforeach ?><div class="actions"><button class="button outline">Miktarları Kaydet</button>
<?php $lines = []; foreach ($selected as $id => $quantity) $lines[] = $products[$id]['name'] . ' (' . $products[$id]['code'] . ') × ' . $quantity; ?>
<a class="button" href="<?= h(wa("Merhaba ST Ambalaj, aşağıdaki ürünler için teklif almak istiyorum.\n" . implode("\n", $lines))) ?>">Listeyi WhatsApp’a Gönder</a></div></form>
<?php foreach ($selected as $id => $quantity): ?><form id="remove-<?= h((string)$id) ?>" method="post"><?php token(); ?><input type="hidden" name="action" value="remove"><input type="hidden" name="id" value="<?= h((string)$id) ?>"></form><?php endforeach ?>
<?php endif ?></section>
<?php elseif ($admin): ?>
<section class="wrap section admin-shell<?= $logged ? '' : ' admin-login' ?>">
<div class="admin-heading"><div><p class="eyebrow">ST Ambalaj</p><h1>Ürün yönetimi</h1></div><a class="button outline" href="/urunler">Kataloğu Gör</a></div>
<?php if ($error): ?><p class="notice" role="alert"><?= h($error) ?></p><?php endif ?>
<?php if (!$logged): ?>
<?php if (!is_file($auth)): ?>
<form class="panel" method="post">
<?php token(); ?><input type="hidden" name="action" value="setup">
<h2>İlk yönetici kurulumu</h2>
<?php if (is_file($setupKeyFile)): ?>
<label>Kurulum anahtarı <input name="setup_key" type="password" required autocomplete="off"></label>
<label>Yeni yönetici şifresi <input name="password" type="password" required autocomplete="new-password"></label>
<label>Yeni şifreyi tekrar girin <input name="password_repeat" type="password" required autocomplete="new-password"></label>
<button class="button">Yönetici Şifresini Oluştur</button>
<?php else: ?><p>Hosting dosya yöneticisinde <code>veri/kurulum-anahtari.txt</code> dosyasını oluşturun ve içine en az 32 karakterli rastgele bir anahtar yazın. Sonra bu sayfayı yenileyin. Terminalden kurulum için <code>php kurulum.php</code> komutunu da kullanabilirsiniz.</p><?php endif ?>
</form>
<?php else: ?>
<?php if (isset($_GET['kuruldu'])): ?><p role="status">Yönetici şifresi oluşturuldu. Şifrenizle giriş yapabilirsiniz.</p><?php endif ?>
<form class="panel" method="post"><?php token(); ?><input type="hidden" name="action" value="login"><label>Yönetici şifresi <input type="password" name="password" autocomplete="current-password" required></label><button class="button">Giriş Yap</button></form>
<?php endif ?>
<?php else:
$edit = field('id') ?: (is_string($_GET['urun'] ?? null) ? $_GET['urun'] : '');
$current = $products[$edit] ?? null;
if (isset($_GET['kaydedildi'])): ?><p role="status">Ürün kaydedildi.</p><?php endif ?>
<div class="actions"><a class="button outline" href="/yonetim">Yeni Ürün</a><form method="post"><?php token(); ?><button class="button outline" name="action" value="logout">Çıkış Yap</button></form></div>
<div class="admin-workspace"><form id="urun-formu" class="panel" method="post" enctype="multipart/form-data"><?php token(); ?><input type="hidden" name="action" value="save"><input type="hidden" name="id" value="<?= h($edit) ?>">
<h2><?= $current ? 'Ürünü düzenle' : 'Yeni ürün' ?></h2>
<div class="fields"><label>Ürün adı<input required maxlength="160" name="name" value="<?= h(field('name') ?: ($current['name'] ?? '')) ?>"></label>
<label>Ürün kodu<input required maxlength="40" name="code" value="<?= h(field('code') ?: ($current['code'] ?? '')) ?>"></label>
<label>Kategori<select name="category"><?php foreach ($categories as $key => [$label]): ?><option value="<?= h($key) ?>" <?= (field('category') ?: ($current['category'] ?? '')) === $key ? 'selected' : '' ?>><?= h($label) ?></option><?php endforeach ?></select></label>
<label>Fiyat (TL)<input name="price" inputmode="decimal" value="<?= h($method === 'POST' ? field('price') : ($current['price'] ?? '')) ?>"></label></div>
<label class="check"><input type="checkbox" name="visible" value="1" <?= ($method === 'POST' ? field('visible') === '1' : ($current['visible'] ?? false)) ? 'checked' : '' ?>> Fiyatı sitede göster</label>
<label>Açıklama<textarea name="description" rows="3"><?= h($method === 'POST' ? field('description') : ($current['description'] ?? '')) ?></textarea></label>
<label>Teknik özellikler (her satıra bir özellik)<textarea name="specs" rows="6"><?= h($method === 'POST' ? field('specs') : ($current['specs'] ?? '')) ?></textarea></label>
<label>Ürün görselleri (JPG, PNG veya WebP, en fazla 12 görsel)<input type="file" name="images[]" accept="image/jpeg,image/png,image/webp" multiple></label>
<div class="admin-photos"><?php foreach ($current['images'] ?? [] as $i => $file): ?><div><img src="<?= h(imageUrl($file)) ?>" alt="Ürün görseli <?= $i+1 ?>"><label class="check"><input type="radio" name="cover" value="<?= h($file) ?>" <?= $i === 0 ? 'checked' : '' ?>> Kapak</label><label class="check"><input type="checkbox" name="remove[]" value="<?= h($file) ?>"> Kaldır</label></div><?php endforeach ?></div>
<button class="button">Ürünü Kaydet</button></form>
<aside class="admin-inventory"><h2>Katalogdaki ürünler</h2><div class="admin-list"><?php foreach ($products as $id => $item): ?><a href="/yonetim?urun=<?= h((string)$id) ?>#urun-formu"<?= (string)$id === $edit ? ' aria-current="true"' : '' ?>>
<?php if ($item['images']): ?><img src="<?= h(imageUrl($item['images'][0])) ?>" loading="lazy" alt=""><?php endif ?>
<span><small><?= h($item['code']) ?></small><?= h($item['name']) ?></span><strong>Düzenle</strong></a><?php endforeach ?></div></aside></div>
<?php endif ?></section>
<?php elseif ($path === '/kurumsal'): ?>
<section class="wrap section narrow"><h1>ST Ambalaj</h1><p>Depolama, paketleme ve sevkiyat için koli ve kâğıt bantlar, streç filmler, köşe koruyucular, balonlu naylonlar, nakliye poşetleri ve iş eldivenleri sunuyoruz.</p><h2>Teklif nasıl alınır?</h2><p>Katalogdan ürünü seçin ve WhatsApp’ta açılan mesaja ihtiyacınız olan miktarı ekleyin. Birden çok ürün için Teklif Listem’i kullanabilirsiniz.</p><a class="button" href="/urunler">Ürünleri İncele</a></section>
<?php elseif ($path === '/iletisim'): ?>
<section class="wrap section narrow"><h1>İletişim</h1><p>Fiyat, stok ve ürün özellikleri için ST Ambalaj’a ulaşın.</p><div class="actions"><a class="button" href="<?= h($general) ?>">WhatsApp’tan Yazın</a><a class="button outline" href="tel:+905422543628">0542 254 36 28</a></div></section>
<?php else: ?>
<section class="wrap section"><h1>Sayfa bulunamadı</h1><a class="button" href="/urunler">Ürünleri İncele</a></section>
<?php endif ?>
</main>
<footer class="site-footer"><div class="wrap footer-main">
<div class="footer-brand"><?php logo(); ?></div>
<nav aria-label="Alt menü"><a href="/urunler">Ürün Kataloğu</a><a href="/kurumsal">Kurumsal</a><a href="/iletisim">İletişim</a></nav>
<div class="footer-contact"><a href="tel:+905422543628">0542 254 36 28</a><a class="footer-wa" href="<?= h($general) ?>"><?php whatsappIcon(); ?> WhatsApp</a></div>
</div><div class="wrap footer-bottom"><small>© <?= date('Y') ?> ST Ambalaj</small><a href="/yonetim">Yönetim Paneli</a></div></footer>
<?php if (!$admin): ?>
<div class="floating-contact" role="group" aria-label="Hızlı iletişim">
<a class="floating-call" href="tel:+905422543628" aria-label="0542 254 36 28 numarasını ara">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3H4.8A1.8 1.8 0 0 0 3 5c.7 8.5 7.5 15.3 16 16a1.8 1.8 0 0 0 2-1.8V17l-5-2-1.6 2a14.5 14.5 0 0 1-7.4-7.4L9 8 7 3Z"/></svg>
</a>
<a class="floating-wa" href="<?= h($product ? offer($product) : $general) ?>" aria-label="<?= $product ? 'Bu ürün için WhatsApp’tan teklif al' : 'WhatsApp üzerinden sipariş ve bilgi al' ?>">
<span class="floating-wa-copy" aria-hidden="true">7/24 Online Sipariş</span><?php whatsappIcon(); ?>
</a>
</div>
<?php endif ?>
</body>
</html>
