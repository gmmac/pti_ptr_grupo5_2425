import { createContext, useContext, useState, useEffect } from "react";
import api from "../../utils/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserType } from "./UserTypeProvider";

const AuthContext = createContext();
const AuthProvider = ({ children, userType="client", loginPath }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserType } = useUserType()

  const fetchUser = async () => {
    try {
      const response = await api.get(`/api/auth/user-info`, {
          params:{
              userType: userType === "organizer" ? "organizer" : ""
          },
          withCredentials: true,
      });

      if (response.data?.userInfo) {
        setUser(response.data.userInfo);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      setUser(null);
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  };

  useEffect(() => {
    setUserType(userType)
    fetchUser();
  }, [refresh]);

  useEffect(() => { // is not logged
    const isOnPublicAuthRoute = location.pathname.includes("register") || location.pathname.includes("changePassword");
    if (!user && !loading && userType != "client" && !isOnPublicAuthRoute) {
      navigate(loginPath || `/${userType}/login`);
    }
  }, [user, loading, navigate, loginPath, userType, refresh]);


  useEffect(() => { // is logged
    if (user && userType && userType !== "client") {
      const profilePath = userType === "client" ? "/profile" : "/organizer";
      navigate(profilePath);
    }else if(user && userType && userType === "client"){
      const profilePath = "/profile";
      navigate(profilePath);
    }
  }, [user]);
  
  
  const loginAction = async (formData, setErrors, newErrors = {}) => {
    try {
      await api.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
        userType,
      });
  
      await fetchUser();
  
    } catch (error) {
      if (error.response?.status === 403) {
        newErrors.invalidCredentials = "Invalid credentials!";
      } else if (error.response?.status === 429) {
        newErrors.invalidCredentials = "Too many attempts. Try again later!";
      } else {
        newErrors.invalidCredentials = "Login failed. Try again.";
      }
  
      setErrors(newErrors);
    }
  };
  

  const logOut = async () => {
    try {
      await api.get(`/api/auth/logout?userType=${userType}`);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setUser(null);
    }
  };


  const getUserType = () => userType;

  const isUserLoggedIn = () => !!user;

  const refreshPage = () => setRefresh(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginAction,
        isUserLoggedIn,
        logOut,
        refreshPage,
        loading,
        getUserType
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
