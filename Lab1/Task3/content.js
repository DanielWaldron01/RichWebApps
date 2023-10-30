document.addEventListener('DOMContentLoaded', function () {
    const toggleColorCheckbox = document.getElementById('toggleColor');
  
    toggleColorCheckbox.addEventListener('change', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: toggleBackgroundColor,
        });
      });
    });
  });
  
  function toggleBackgroundColor() {
    chrome.storage.local.get('colorChangerActive', function (result) {
      const isActive = !result.colorChangerActive;
  
      if (isActive) {
        document.body.style.backgroundColor = 'red';
      } else {
        document.body.style.backgroundColor = 'white';
      }
  
      chrome.storage.local.set({ colorChangerActive: isActive });
    });
  }