import { createContext, useState } from "react";

import packageJSON from '../../package.json'
export const AdminContext = createContext();

// I export this separately, so I can unit test it.
export const validateAdminPassword = (password) => {
    return password === packageJSON.adminPassword
}

//TODO: This is insecure!  Make this come from server.
// For right now, I'm only working on the UI, so this a placeholder for
// the real solution, which will be taht this will be in package.json
// on the server-side Node app (:5000) and we'll have to do a fetch
// to get this info.
export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const validateAdmin = () => {
        const password = prompt(packageJSON.adminPrompt)
        const isValid = validateAdminPassword(password)
        setIsAdmin( isValid )
        return isValid
    }

    const value = {isAdmin, validateAdmin}
    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
