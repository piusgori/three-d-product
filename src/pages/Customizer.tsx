import { AnimatePresence, motion } from "framer-motion"
import { useSnapshot } from "valtio"
import state from "../store";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { DecalTypes, EditorTabs, FilterTabs } from "../config/constants";
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from "../components";
import { useState } from "react";
import { reader } from "../config/helpers";

const Customizer = () => {

    const snap = useSnapshot(state);

    const [file, setFile] = useState<any>('');
    const [prompt, setPrompt] = useState<string>('');
    const [generatingImg, setGeneratingImg] = useState<boolean>(false);
    const [activeEditorTab, setActiveEditorTab] = useState<string>('');
    const [activeFilterTab, setActiveFilterTab] = useState<any>({ logoShirt: true, stylishShirt: false });

    console.log(prompt, setPrompt, generatingImg, setGeneratingImg)

    const handleDecals = (type: any, result: any) => {
        const decalType: any = DecalTypes[type];
        state[decalType.stateProperty] = result;

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab);
        }
    }

    const handleActiveFilterTab = (tabName: any) => {
        switch (tabName) {
            case 'logoShirt':
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case 'stylishShirt':
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
        };

        setActiveFilterTab((prevState: any) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
        })
    }

    const readFile = (type: any) => {
        reader(file).then((result) => {
            handleDecals(type, result);
            setActiveEditorTab('');
        })
    }

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case 'colorpicker':
                return <ColorPicker />;
            case 'filepicker':
                return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
            case 'apipicker':
                return <AIPicker />;
            default:
                return;
        }
    }

  return (
    <AnimatePresence>
        {!snap.intro && (
            <>
                <motion.div
                    key='custom'
                    className="absolute top-0 left-0 z-10"
                    {...slideAnimation('left')}
                >
                    <div className="flex items-center min-h-screen">
                        <div className='editortabs-container tabs'>
                            {EditorTabs.map((tab, index) => (
                                <Tab
                                    key={index}
                                    tab={tab}
                                    handleClick={() => { setActiveEditorTab(tab.name) }}
                                />
                            ))}

                            {generateTabContent()}
                        </div>
                    </div>
                </motion.div>

                <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
                    <CustomButton type='filled' title='Go Back' handleClick={() => { state.intro = true }}  customStyles="w-fit px-4 py-2.5 font-bold text-sm"/>
                </motion.div>

                <motion.div className="filtertabs-container" {...slideAnimation('up')}>
                    {FilterTabs.map((tab, index) => (
                        <Tab
                            key={index}
                            tab={tab}
                            isFilterTab
                            isActiveTab={activeFilterTab[tab.name]}
                            handleClick={() => { handleActiveFilterTab(tab.name) }}
                        />
                    ))}
                </motion.div>
            </>
        )}
    </AnimatePresence>
  )
}

export default Customizer