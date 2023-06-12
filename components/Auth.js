import React, { createContext, useEffect, useLayoutEffect, useState } from 'react';

import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import app from '../firebase.config';
import { toast } from 'react-toastify';

export let AuthContext = createContext('')

const Auth = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();

    let auth = getAuth(app)
    let [user, setUser] = useState(null)
    let [loadUser, setLoadUser] = useState(true)
    let [cat, setCat] = useState('All')
    const [news, setNews] = useState(null)
    const [editNews, setEditNews] = useState(true)
    // check currently signed in user
    useEffect(() => {
        setLoadUser(true)
        let check = localStorage.getItem('remember')
        if (check) {
            onAuthStateChanged(auth, async (currentUser) => {
                if (currentUser) {
                    if (currentUser.emailVerified) {
                        let res = await fetch(`/api/user-info?email=${currentUser.email}`)
                        let myUser = await res.json();
                        setUser(myUser.data)
                    } else {
                        setUser(null)
                    }
                    setLoadUser(false)
                } else {
                    setUser(null)
                }
                setLoadUser(false)
            })
        } else {
            setLoadUser(false)
            setUser(null)
        }
    }, [])


    // register user with email and password
    let registerUser = (email, password) => {
        setLoadUser(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // register user with email and password
    let sendVerification = () => {
        setLoadUser(true)
        sendEmailVerification(auth.currentUser)
            .then(() => {
                toast.success("Verification sent to your email. Check spam folder too.")
                setLoadUser(false)
            })
            .catch(err => {
                toast.error(err.code)
                setLoadUser(false)
            })
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
        sendVerification,
        cat, setCat,
        news, setNews,
        editNews, setEditNews
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Auth;