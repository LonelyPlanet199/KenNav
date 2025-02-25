chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "addBookmark") {
    window.postMessage({
      type: "ADD_BOOKMARK",
      bookmark: message.bookmark
    }, "*");
  }
});