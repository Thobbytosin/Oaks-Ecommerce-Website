import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config'
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()
const auth = getAuth();
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    // const navigation = useNavigate()

    // Create a User
    const createUser = async (email, password) => {
        setLoading(true)
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    // Create user using gmail
    const signUpWithGmail = async () => {
        setLoading(true)
        return await signInWithPopup(auth, googleProvider)
    }

    // password reset
    const resetPassword = async (email) => {
        setLoading(true)
        return await sendPasswordResetEmail(auth, email)
    }
    useEffect(() => {
        user ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false)
    }, [user])

    // login
    const login = async (email, password) =>  {
        setLoading(true)
        return await signInWithEmailAndPassword(auth, email, password)
    }

    
    // logout
    const logout = () => {
        localStorage.removeItem("cartCount")
        localStorage.removeItem("cartItems")
        localStorage.removeItem("userTotal")
        setIsUserLoggedIn(false)
        
        return signOut(auth)
        
    } 

    // user is available
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, currentUser => {
            const timer = setTimeout(() => {
                setUser(currentUser)
                setLoading(false)
            }, 3000);
            // clearTimeout(timer)
        })

        return () => {
            return unsubscribe()
        }
    })

    
    const authInfo = {
        user,
        loading, 
        createUser,
        signUpWithGmail,
        login,
        logout,
        isUserLoggedIn,
        resetPassword
    }

  return (
    <AuthContext.Provider value={authInfo} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider