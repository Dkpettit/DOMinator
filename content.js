// content.js
(function() {
    function scrapeHTMLAndCSS() {
      const html = `<!DOCTYPE html>\n<html>\n${document.documentElement.innerHTML}\n</html>`;
      const styles = Array.from(document.styleSheets).map(sheet => {
        try {
          return Array.from(sheet.cssRules || []).map(rule => rule.cssText).join('\n');
        } catch (error) {
          console.warn('Could not access stylesheet:', sheet.href);
          return '';
        }
      }).join('\n');
  
      const cssWrapper = `<style>\n${styles}\n</style>`;
  
      return { html, styles: cssWrapper };
    }
  
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'scrape') {
        const result = scrapeHTMLAndCSS();
        sendResponse(result);
      }
    });
  })();