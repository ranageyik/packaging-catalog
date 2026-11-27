<?php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if (preg_match('~^/(ambalaj-urunleri\.webp|stil\.css|uygulama\.js|st-ambalaj-logo\.svg|yuklemeler/[a-f0-9]{32}\.(?:jpg|png|webp))$~D', $path) && is_file(__DIR__ . $path)) {
    return false;
}
require __DIR__ . '/index.php';
