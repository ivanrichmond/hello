import { createContext, useEffect, useMemo, useState } from "react";

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
    const [isValid, setIsValid] = useState(false);
    
    let isAdmin = useMemo(() => {
        const lsIsAdmin = window.localStorage.getItem('isAdmin')
        if(lsIsAdmin){
            return true
        }
        if(!isValid){
            const password = prompt(packageJSON.adminPrompt)
            if( validateAdminPassword(password) ){
                setIsValid(true)
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }, [isValid])

    useEffect(() => {
        if(isAdmin) window.localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    }, [isAdmin])

    const value = {isAdmin}
    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
