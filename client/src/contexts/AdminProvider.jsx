import { createContext } from "react";

import packageJSON from '../../package.json'
import { useLocalStorage } from "../hooks/useLocalStorage";
export const AdminContext = createContext();

//TODO: This is insecure!  Make this come from server.
// For right now, I'm only working on the UI, so this a placeholder for
// the real solution, which will be taht this will be in package.json
// on the server-side Node app (:5000) and we'll have to do a fetch
// to get this info.
export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useLocalStorage("isAdmin", false);

    const validateAdmin = () => {
        const password = prompt(packageJSON.adminPrompt)
        const isValid = password === packageJSON.adminPassword
        setIsAdmin( isValid )
        return isValid
    }

    const value = {isAdmin, validateAdmin}
    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
