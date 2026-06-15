export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    browser.runtime.onMessage.addListener((msg) => {
      if (msg.type === 'GET_SELECTION') {
        const text = window.getSelection()?.toString()?.trim();
        if (text) {
          browser.runtime.sendMessage({ type: 'SELECTION_RESULT', text });
        }
      }
    });
  },
});
