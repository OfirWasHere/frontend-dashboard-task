import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFirebase from "./useFirebase";
import { FirebaseError } from "firebase/app";
import { LoginServiceModal } from "../utils/types";

export default function useAuth() {
    const { firebaseAuth } = useFirebase();
    const [loader, setLoader] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [authChecked, setAuthChecked] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    async function firebaseLogin({ email, password }: LoginServiceModal): Promise<string | null> {
        setLoader(true);
        try {
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
            setUser(userCredential.user);
            navigate("/dashboard");
            return null;
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error("Sign-up failed:", error);
            }
            return "Email or password are wrong"
        } finally {
            setLoader(false);
        }
    }

    async function firebaseLogout() {
        try {
            await signOut(firebaseAuth);
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    async function firebaseSignUp({ email, password }: LoginServiceModal): Promise<string | null> {
        try {
            setLoader(true);
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            setUser(userCredential.user);
            navigate("/dashboard");
            return null
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error("Sign-up failed:", error);
            }
        } finally {
            setLoader(false);
        }
    }

    async function firebaseGoogleAuthLogin() {
        const provider = await new GoogleAuthProvider();
        signInWithPopup(firebaseAuth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                navigate("/dashboard");
            }).catch((error) => {
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            setUser(user);
            setAuthChecked(true)
        });
        return () => unsubscribe();
    }, [firebaseAuth, location, user, navigate]);

    useEffect(() => {
        if (authChecked && user && location.pathname === '/') {
            navigate('/dashboard');
        }
    }, [authChecked, user, location, navigate]);

    return { loader, user, authChecked, firebaseLogin, firebaseLogout, firebaseSignUp, firebaseGoogleAuthLogin };
}