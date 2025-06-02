import React from 'react'
import { useState, useContext } from 'react'

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    //function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    //function to clear user data (e.g., on logout)
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('token'); // Clear token from local storage
    };
    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;