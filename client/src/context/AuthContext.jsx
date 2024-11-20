import React, { createContext, useContext, useState } from 'react'


const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("lms-user")) || null);

    console.log(JSON.parse(localStorage.getItem("lms-user")))

    return (
        <AuthContext.Provider value={{authUser,setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider