// popup.js
document.getElementById('scrape').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ['content.js']
        },
        () => {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'scrape' }, (response) => {
            if (response) {
              const fullDocument = `${response.html}\n${response.styles}`;
              const blob = new Blob([fullDocument], { type: 'text/html' });
              const url = URL.createObjectURL(blob);
              chrome.downloads.download({ url, filename: 'scraped_page.html' });
            }
          });
        }
      );
    });
  });