#!/usr/bin/env bash
set -e
PIECES=(
  "pieces/tidu-mind-12-mot-diem-tot"
  "pieces/tidu-mind-13-vi-sao-de-phan-xet"
  "pieces/tidu-mind-14-tai-sao-gop-y-thanh-tranh-cai"
  "pieces/tidu-mind-15-lang-nghe-khong-phai-dong-y"
  "pieces/tidu-mind-16-cang-nhieu-lua-chon"
  "pieces/tidu-mind-17-tri-hoan-khong-chi-luoi-bieng"
  "pieces/tidu-mind-18-mot-ngay-te"
  "pieces/tidu-mind-19-vi-sao-cu-nho-cau-kho-nghe"
  "pieces/tidu-mind-20-thoi-gian-cho-lo-lang"
)

for p in "${PIECES[@]}"; do
  name=$(basename "$p")
  echo "=== EXPORTING $p ==="
  ./bin/reel export "$p" "$p/$name.mp4"
done
echo "=== ALL VIDEOS EXPORTED SUCCESSFULLY ==="

