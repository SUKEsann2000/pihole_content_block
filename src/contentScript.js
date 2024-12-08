// content.js
(function () {
  'use strict';

  // ロードエラーが発生した要素を削除する関数
  const handleLoadError = (failedElement) => {
      console.log(`Element failed to load:`, failedElement);

      // 5秒後に削除
      setTimeout(() => {
          if (failedElement && failedElement.parentNode) {
              console.log(`Removing failed element:`, failedElement);
              failedElement.remove();
          }
      }, 5000); // 5秒後に削除
  };

  // グローバルエラーハンドラ
  window.addEventListener('error', (event) => {
      // ターゲットが存在し、特定のタグの場合にのみ処理
      const tags = ['IMG','SCRIPT','IFRAME','LINK','DIV','SPAN'];
      if (event.target && tags.includes(event.target.tagName)) {
          const failedElement = event.target;
          handleLoadError(failedElement);
      }
  }, true); // キャプチャフェーズでリスン

  // ネットワークエラー監視のために fetch をラップ
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
      try {
          const response = await originalFetch(...args);
          if (!response.ok) {
              console.warn(`Fetch failed for: ${args[0]} with status: ${response.status}`);
          }
          return response;
      } catch (error) {
          console.error(`Network fetch error:`, error);

          // エラーが検出された場合、関連要素を削除する処理を追加可能
          const url = args[0];
          const elements = document.querySelectorAll('img, iframe, script, link');
          elements.forEach((element) => {
              if (element.src === url || element.href === url) {
                  handleLoadError(element);
              }
          });

          throw error; // 再スローして他のエラーハンドラが処理できるようにする
      }
  };

  console.log("Global error and fetch interceptor initialized.");
})();
