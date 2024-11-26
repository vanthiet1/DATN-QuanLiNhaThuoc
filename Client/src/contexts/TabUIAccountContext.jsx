import { useState, createContext } from 'react';

export const TabUIAccountContext = createContext();

const TabUIAccountProvider = ({ children }) => {
    const [tabIndex, setTabIndex] = useState(1);

    const tabIndexUi = (index) => {
        setTabIndex(index);
    };

    const data = {
        tabIndex,
        tabIndexUi,
        setTabIndex,
    };
    

    return (
        <TabUIAccountContext.Provider value={data}>
            {children}
        </TabUIAccountContext.Provider>
    );
};

export default TabUIAccountProvider;
