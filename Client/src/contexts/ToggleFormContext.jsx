import {createContext , useState} from "react";

export const ToggleFormContext = createContext()
const ToggleFormProvider = ({children}) => {
    const [dialogState, setDialogState] = useState({ isOpen: false, type: '' });
    const handleOpenDialog = (type) => {
        setDialogState({ isOpen: true, type });
    };
    const handleCloseDialog = () => {
        setDialogState({ isOpen: false, type: '' });
    };
    const toggleData = {
        handleOpenDialog,
        handleCloseDialog,
        dialogState,
        setDialogState
    }
    return (
        <div>
            <ToggleFormContext.Provider value={toggleData}>
                {children}
            </ToggleFormContext.Provider>
        </div>
    );
};

export default ToggleFormProvider;