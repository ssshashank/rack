import { Button } from "@Components/button";
import { createSignal } from "solid-js";

declare const chrome: any;

const Popup = () => {
    const [isSidePanel, setSidePanel] = createSignal<boolean>(false);

    const togglePanel = async () => {
        const [tab] = await chrome?.tabs?.query({ active: true, currentWindow: true });
        if (tab && tab?.id !== undefined) {
            if (isSidePanel()) {
                // close the side panel
                await chrome?.sidePanel?.close({ tabId: tab?.id });
                setSidePanel(false);
            } else {
                // open the side panel
                await chrome?.sidePanel?.open({ tabId: tab?.id });
                setSidePanel(true);
                // close the popup window
                window.close();
            }
        } 
        console.log(tab);
    };

    return (
        <div class="w-full h-full bg-yellow-100">
            <h1 class="text-blue-600">Extension</h1>
            <Button onclick={togglePanel}>Click Here</Button>
        </div>
    );
};

export default Popup; 
