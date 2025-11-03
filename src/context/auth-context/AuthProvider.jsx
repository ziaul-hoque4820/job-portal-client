import React from 'react'
import { AuthContext } from './AuthContext'

function AuthProvider({ children }) {

    const authInfo = {

    }



    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider