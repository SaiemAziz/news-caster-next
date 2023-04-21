import React, { createContext, useLayoutEffect, useState } from 'react';

import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import app from '../firebase.config';

export let AuthContext = createContext('')

const Auth = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();

    let auth = getAuth(app)
    let [user, setUser] = useState(null)
    let [loadUser, setLoadUser] = useState(true)
    let [cat, setCat] = useState('All')
    // check currently signed in user
    useLayoutEffect(() => {
        setLoadUser(true)
        onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                let res = await fetch(`/api/user-info?email=${currentUser.email}`)
                let myUser = await res.json();
                setUser(myUser.data)
                setLoadUser(false)
            } else {
                setUser(null)
            }
            setLoadUser(false)
        })
    }, [])


    // register user with email and password
    let registerUser = (email, password) => {
        setLoadUser(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // log in user with email and password
    let loginUser = (email, password) => {
        setLoadUser(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // log in user with google
    let loginUserGoogle = () => {
        setLoadUser(true)
        return signInWithPopup(auth, googleProvider)
    }
    // log out user
    let logOutUser = () => {
        setLoadUser(true)
        return signOut(auth)
    }

    let userInfo = {
        user,
        setUser,
        loadUser,
        setLoadUser,
        registerUser,
        loginUser,
        logOutUser,
        loginUserGoogle,
        cat, setCat
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Auth;