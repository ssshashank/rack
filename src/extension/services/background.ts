import { resolve } from "path";

console.log("Background service worker running.");

// Listen for messages (for example purposes)
chrome.runtime.onMessage.addListener((message: string, _sender: any, sendResponse: any): any => {
    console.log("Received message in background:", message);
    sendResponse({ status: "ok" });
});

// Register the side panel when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setOptions({
        enabled: true,
        path: resolve(__dirname, "./src/extension/popup.html")
    });
    console.log("Side Panel registered!");
});

