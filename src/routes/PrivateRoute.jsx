// import React, { useContext } from 'react'
// import { AuthContext } from '../context/auth-context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function PrivateRoute({children}) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading) {
        return <span className="loading loading-bars loading-xl"></span>
    }

    if(!user){
        return <Navigate to={'/signin'} state={location.pathname}></Navigate>
    }

  return children;
}

export default PrivateRoute