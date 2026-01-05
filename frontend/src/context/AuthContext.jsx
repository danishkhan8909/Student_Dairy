import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/APIclient";
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const savedUser = localStorage.getItem("user");
        if(savedUser) setUser(JSON.parse(savedUser));
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await API.post("/auth/login", {email, password});
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify({name: res.data.name, role: res.data.role}));
        setUser({name: res.data.name, role: res.data.role});
    };

    const register = async (data ) => {
        await API.post("/auth/register",data);
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading}} >
            {children}
        </AuthContext.Provider>
    );

};
export const useAuth = () => useContext(AuthContext);