//@flow
// This is a basic model for a helper with functions.
// It doesn't do much exciting, but it allows us 
// to model how other helpers can work,
// which is a lot of what Hello is all about:
// providing a model for a well-architected web app.
import { promiseGetCurrentUser } from "./dbPromises";

// Standard type for helper function return values.
export interface StandardReturn {
    error: Error | null, // Any error thrown by a helper function
    payload: any, // The result of the function
}

export const sayHello = async (): Promise<StandardReturn> => {
    const greetingPrefix = `Hello`
    const greetingSuffix = `!`
    try {
        const currentUser = await promiseGetCurrentUser();
        if(currentUser.payload.name){
            const greeting = `${greetingPrefix}, ${currentUser.payload.name}!`
            return {error: null, payload: greeting}
        } else {
            return {error: null, payload: `${greetingPrefix}${greetingSuffix}`}
        }
    } catch (error) {
        return { 
            error: error instanceof Error ? error : new Error(String(error)), 
            payload: '' 
        };
    }
}