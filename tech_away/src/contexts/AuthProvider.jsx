import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
          api.get("/api/auth/user-info", {withCredentials: true})
          .then((response) => {
                if (response.data?.nic) {
                    setUser(response.data);
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {console.log(user)}, [user]);

    const loginAction = (data) => {
        if (data) {
            setUser(data.result[0]);
            setToken(data.token);
            localStorage.setItem('token', data.token);
            navigate('/profile');
        }
    };

    const logOut = () => {
        axios.get('/api/utilizador/logout');
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
        navigate('/forms');
    };

    return (
        <AuthContext.Provider
            value={{ token, user, loginAction, logOut, loading, setUser}}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};