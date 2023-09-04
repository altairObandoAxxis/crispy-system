import React from 'react';

export const UserContext = React.createContext();

export const UserProvider = ({ children })=>{
    const [ data, setData ] = React.useState({userLogged: false });
    return <UserContext.Provider value={{ state: data, setData }}>
        {children}
    </UserContext.Provider>
}