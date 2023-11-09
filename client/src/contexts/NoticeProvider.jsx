import { createContext, useContext } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
const NoticeContext = createContext();

/**
 * The Notice class defines a notice, such as an error, warning, or info.
 * @param {string} text for notice
 * @param {string} error | info | success | warning
 */
export class Notice {
    constructor(message, type = 'info'){
        this.message = message
        this.type = type
    }

    // Send Notice to the console, such as console.error for type = error.
    sendToConsole(){
        let method = 'log' // Method to use based on type
        switch(this.type){
            case 'error': method = 'error'; break;
            case 'info': method = 'info'; break;
            case 'success': method = 'info'; break;
            case 'warning': method = 'warn'; break;
            default: method = 'log'
        }
        console[method](this.message)
    }
}

export const NoticeProvider = ({ children }) => {
    const [notice, setNotice] = useLocalStorage("notice", null);

    const createNotice = (message, type = 'info') => {
        const newNotice = new Notice(message, type)
        newNotice.sendToConsole()
        setNotice(newNotice)
    }

    const deleteNotice = () => {
        setNotice(null)
    }

    const value = {notice, createNotice, deleteNotice}
    return <NoticeContext.Provider value={value}>{children}</NoticeContext.Provider>;
};

export const useNotice = () => {
  return useContext(NoticeContext);
};