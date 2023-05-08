import { createContext, useState } from "react";


export const dataContext = createContext(null);

const Provider=({children})=>
{
    const[account,setaccounts]=useState({username:'', name:''});

    return(
        <dataContext.Provider value={{
            account,
            setaccounts
        }}>

        {children}{//getting from app.js
        }
        </dataContext.Provider>
    )
}

export default Provider;