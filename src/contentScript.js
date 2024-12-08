// content.js
(function () {
  'use strict';

  // ���[�h�G���[�����������v�f���폜����֐�
  const handleLoadError = (failedElement) => {
      console.log(`Element failed to load:`, failedElement);

      // 5�b��ɍ폜
      setTimeout(() => {
          if (failedElement && failedElement.parentNode) {
              console.log(`Removing failed element:`, failedElement);
              failedElement.remove();
          }
      }, 5000); // 5�b��ɍ폜
  };

  // �O���[�o���G���[�n���h��
  window.addEventListener('error', (event) => {
      // �^�[�Q�b�g�����݂��A����̃^�O�̏ꍇ�ɂ̂ݏ���
      const tags = ['IMG','SCRIPT','IFRAME','LINK','DIV','SPAN'];
      if (event.target && tags.includes(event.target.tagName)) {
          const failedElement = event.target;
          handleLoadError(failedElement);
      }
  }, true); // �L���v�`���t�F�[�Y�Ń��X��

  // �l�b�g���[�N�G���[�Ď��̂��߂� fetch �����b�v
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

          // �G���[�����o���ꂽ�ꍇ�A�֘A�v�f���폜���鏈����ǉ��\
          const url = args[0];
          const elements = document.querySelectorAll('img, iframe, script, link');
          elements.forEach((element) => {
              if (element.src === url || element.href === url) {
                  handleLoadError(element);
              }
          });

          throw error; // �ăX���[���đ��̃G���[�n���h���������ł���悤�ɂ���
      }
  };

  console.log("Global error and fetch interceptor initialized.");
})();
