<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}
$data = __DIR__ . '/veri';
if (!is_writable($data) || !is_writable(__DIR__ . '/yuklemeler')) {
    fwrite(STDERR, "veri ve yuklemeler klasörlerinin yazma izinlerini kontrol edin.\n");
    exit(1);
}
fwrite(STDOUT, "Yönetici şifresini girin: ");
$terminal = function_exists('posix_isatty') && posix_isatty(STDIN) && function_exists('shell_exec');
if ($terminal) shell_exec('stty -echo');
try {
    $password = rtrim(fgets(STDIN) ?: '', "\r\n");
} finally {
    if ($terminal) shell_exec('stty echo');
    fwrite(STDOUT, "\n");
}
if ($password === '') {
    fwrite(STDERR, "Yönetici şifresini girin.\n");
    exit(1);
}
$tmp = tempnam($data, 'sifre-');
$record = json_encode(['hash'=>password_hash(hash('sha256', $password), PASSWORD_DEFAULT), 'sha256'=>true, 'next'=>0], JSON_THROW_ON_ERROR);
if (file_put_contents($tmp, $record) === false || !rename($tmp, $data . '/yonetici.json')) {
    @unlink($tmp);
    fwrite(STDERR, "Yönetici şifresi kaydedilemedi.\n");
    exit(1);
}
fwrite(STDOUT, "Yönetim paneli hazır: /yonetim\n");
