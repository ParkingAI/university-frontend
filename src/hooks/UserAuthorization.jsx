import React, { useContext, createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { checkUser } from "../api/auth.js"


const UserAuthorizationContext = createContext(null)

export const UserAuthorization = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['sp_user']);


    const userClear = () => {
        try {
            removeCookie("sp_user", { path: '/', domain: import.meta.env.VITE_DOMAIN });
            setIsLoadingUser(false);
            setUser(null);
        } catch (e) { }
    };

    const userLogout = () =>{
        userClear()
    }

    useEffect(() => {
        if (!isLoadingUser) {
            if (!cookies.sp_user) {
                navigate("/login");
            };
        };
    }, [cookies.sp_user]);

    useEffect(() => {
        const verifyUser = async () => {
            if (!user && isLoadingUser) {
                if (!cookies.sp_user) {
                    userClear();
                } else {
                    try {
                        fetchUser();
                    } catch (error) {
                        userClear();
                    };
                };
            };
        };
        verifyUser();
    }, []);

    const fetchUser = async () => {
        const response = await checkUser();
        if (response && response.status === 200 && response.data && response.data.status === true) {
            setUser((response.data.user ?? null));
            setIsLoadingUser(false);
        } else {
            userClear();
        };
    };

    return (
        <UserAuthorizationContext.Provider value={{ user, setUser, isLoadingUser, userLogout}}>
            {children}
        </UserAuthorizationContext.Provider>
    );
}

export const useUserAuthorization = () => {
    return useContext(UserAuthorizationContext);
};
