chrome.contextMenus.create({
  id: "add-to-nav",
  title: "添加到导航页面",
  contexts: ["bookmark"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "add-to-nav" && info.bookmarkId) {
    chrome.bookmarks.get(info.bookmarkId, (bookmark) => {
      const bookmarkData = bookmark[0];
      addBookmarkToNav(bookmarkData);
    });
  }
});

function addBookmarkToNav(bookmark) {
  chrome.tabs.query({ url: "http://localhost:YOUR_PORT/*" }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "addBookmark",
        bookmark: {
          name: bookmark.title,
          url: bookmark.url,
          icon: "🔗"
        }
      });
    } else {
      chrome.storage.local.set({ pendingBookmark: bookmark }, () => {
        chrome.tabs.create({ url: "http://localhost:YOUR_PORT/" });
      });
    }
  });
}