import { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode } from 'jwt-decode'
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({})
  const [token, setToken] = useState(localStorage.getItem('token') || null); // null orniga ""
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [userBek, setUserBek] = useState('');
  const [userDepartment, setUserDepartment] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);
  

    // 30 daqiqalik (millisekundlarda)
  const INACTIVITY_LIMIT = 60 * 60 * 1000; // 30 minut

  useEffect(()=>{
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
      setUserName(decoded.name);
      setUserBek(decoded.id);
      setUserDepartment(decoded.department); // 👈 Qo‘shildi
      setUserInfo(decoded)
    }
    
  }, [token]);
  
  console.log(userInfo)
  console.log(userBek)

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUserRole(localStorage.getItem('role'))
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUserDepartment('');
    setToken(null);
    setUserRole('');
    // clearTimeout(timeoutId);
  };

  // harakatni aniqlash va taymerni yangilash
  const resetTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(logout, INACTIVITY_LIMIT);
    setTimeoutId(newTimeoutId);
  };

  // eventlar: mouse, keyboard, touch
  useEffect(() => {
    if (token) {
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keydown', resetTimer);
      window.addEventListener('click', resetTimer);
      window.addEventListener('scroll', resetTimer);

      // birinchi marta taymer ishga tushirish
      resetTimer();
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [token]);


  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) setToken(storedToken);
  // }, []);

  return (
    <AuthContext.Provider value={{ token, userRole, userName, userDepartment, login, logout,  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
