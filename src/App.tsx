import { createSignal, onMount } from 'solid-js'
import './App.css'

declare const chrome: any;

function App() {
    const [isSidePanelOpen, setIsSidePanelOpen] = createSignal(false);
    // Load state from Chrome Storage
    onMount(() => {
        chrome.storage.local.get(["isSidePanelOpen"], (result: any) => {
            if (result.isSidePanelOpen !== undefined) {
                setIsSidePanelOpen(result.isSidePanelOpen);
            }
        });
    });

    const togglePanel = async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if (tab && tab.id !== undefined) {
                if (isSidePanelOpen()) {
                    // Move back to Popup (close Side Panel)
                    await chrome.sidePanel.close({ tabId: tab.id });
                    setIsSidePanelOpen(false);
                } else {
                    // Open the Side Panel
                    await chrome.sidePanel.open({ tabId: tab.id });
                    setIsSidePanelOpen(true);

                    // Close the popup window after switching to the Side Panel
                    window.close();
                }

                // Store the state in Chrome Storage
                chrome.storage.local.set({ isSidePanelOpen: !isSidePanelOpen() });
            } else {
                console.error("No active tab found.");
            }
        } catch (error) {
            console.error("Failed to toggle side panel:", error);
        }
    };

    return (
        <>

            <h1 class='text-md text-orange-400'>{isSidePanelOpen() ? "Side Panel" : "Popup"}</h1>
            <p class="read-the-doc text-3xl">
                Click on the Vite and Solid logos to learn more
            </p>

            <
                button onClick={togglePanel}>
                {isSidePanelOpen() ? "Move to Popup" : "Open in Side Panel"}
            </button>
        </>
    )
}

export default App
