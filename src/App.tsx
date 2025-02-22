import { InputField } from '@Components/inputField'
import './index.css'
import { InputType } from '@Configs/constants'
import { Button } from '@Components/button'
import { SwitchField } from '@Components/switch';
import { DropdownContent, DropdownItem, DropdownRoot, DropdownTrigger } from './components/dropdown';
function App() {

    return (
        <div class="bg-brown h-[100vh] w-full border-2 border-red-400">
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

            <Button
                class='w-[500px] mx-5  bg-hue  text-white  '>
                Custom Button
            </Button>
            <SwitchField switchStyle='mx-5' class='bg-white' knobStyle='bg-warm'></SwitchField>
            <div class='ml-80'>
                <DropdownRoot >
                    <DropdownTrigger class="inline-flex w-[35px] h-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
                        aria-label="Customise options"
                    >
                        Dropdown
                    </DropdownTrigger>
                    <DropdownContent>
                        <DropdownRoot>
                            <DropdownTrigger>Item1</DropdownTrigger>
                            <DropdownContent position="right">
                                <DropdownItem>Sub item1</DropdownItem>
                            </DropdownContent>
                        </DropdownRoot>
                        <DropdownItem>Item2</DropdownItem>
                        <DropdownItem>Item3</DropdownItem>
                    </DropdownContent>
                </DropdownRoot>

            </div>
        </div>
    );
};

export default App


