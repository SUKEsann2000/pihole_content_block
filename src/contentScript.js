// content.js
(function() {
  'use strict';

  // 対象のURLパターンをチェック
  const blockedURLs = ["0.0.0.0", "127.0.0.1"];

  // 全てのリンク、画像、スクリプトなどをスキャン
  const elements = document.querySelectorAll('a, img, iframe, script, link');
  elements.forEach(element => {
      const src = element.src || element.href;
      if (src && blockedURLs.some(url => src.includes(url))) {
          console.log(`Blocked element removed: ${src}`);
          element.remove();
      }
  });

  // consoleから確認用ログを出力
  console.log("Blocked elements successfully removed.");
})();
