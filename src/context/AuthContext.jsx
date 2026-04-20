import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; //detects a user
import { auth, db } from "../js/firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider ({ children }) {

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState("");
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                //setUser(currentUser);
                //setLoading(false);

                if (currentUser) {
                    setUser(currentUser);
                    
                    //fetch firestore ONCE here
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    }
                
                }
                else {
                    setUser(null);
                    setUserData(null);
                }
            });
        
            return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, userData }}>
            {children}
        </AuthContext.Provider>
    );
}

//custom hook (clean access)
export function useAuth() {
    return useContext(AuthContext);
}