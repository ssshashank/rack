import { createSignal } from "solid-js";
import { InputType } from '@Configs/constants'
import { Button } from '@Components/button'
import { SwitchField } from '@Components/switch';
import { InputField } from '@Components/inputField'

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
        <div class="bg-brown h-[100vh] w-full">
            <h1 class="text-hue text-3xl">
                Custom Components
            </h1>

            <InputField
                labelStyle='mx-5 text-warm'
                type={InputType.TEXT}
                placeholder="Johndoe@hoohamail.com"
                label={'Email *'}
                class='w-[500px] mx-5 bg-transparent text-warm '
            />

            <Button onclick={togglePanel}
                class='w-[500px] mx-5  bg-hue  text-white  '>
                Custom Button
            </Button>
            <SwitchField switchStyle='mx-5' class='bg-white' knobStyle='bg-warm'></SwitchField>
        </div>
    );
};

export default Popup; 
