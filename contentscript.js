chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // document.body.style.backgroundColor = '#333';
    document.querySelector( message.selector ).click();
});