import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (usernameOrEmail, password) => {
        try {
            const response = await api.post('/auth/login', { usernameOrEmail, password });
            if (response.data.accessToken) {
                // response.data now contains { accessToken, tokenType, username, email, name }
                // We store the whole object in localStorage
                localStorage.setItem("user", JSON.stringify(response.data));
                setUser(response.data);
            }
            return { success: true };
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
    };

    const register = async (username, email, password, name) => {
        try {
            await api.post('/auth/register', { username, email, password, name });
            return { success: true };
        } catch (error) {
            console.error("Registration failed:", error);
            return { success: false, message: error.response?.data?.message || "Registration failed" };
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        // Optional: Call backend logout if needed, but for JWT it's mostly client-side
        // api.post('/auth/logout').catch(err => console.error("Logout API failed", err));
    };

    const checkAuth = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.accessToken) {
                setUser(storedUser);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Failed to parse user from local storage", error);
            setUser(null);
            localStorage.removeItem("user");
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
