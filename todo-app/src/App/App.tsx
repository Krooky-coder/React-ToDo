import './App.css'
import { HomePage } from '../Pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from '../Pages/PageNotFound';
import RegisterForm from '../Pages/RegisterForm';
import { ThemeProvider } from 'styled-components';
import useLocalStorage from '../utils/localStorage';
import { blackTheme, lightTheme } from '../Theme';
import LoginForm from '../Pages/LoginForm/index'
import { ProfilePage } from '../Pages/ProfilePage';
import ProtectedRoute from '../components/ProtectedRoute.tsx';
import { useEffect } from 'react';
import useAuth from '../utils/useAuth.ts';
import { useAppDispath } from '../utils/useAppDispatch.ts';
import { fetchProfile } from '../api/auth.ts';
import { fetchTodos } from '../api/todos.ts';

function App() {
  const { initialValue: themeValue } = useLocalStorage<string>('Theme', 'light');
  const { initialValue: accessToken} = useLocalStorage('Access Token', '');

  const dispatch = useAppDispath()
  const themeToProvide = themeValue === 'light' ? lightTheme : blackTheme;

  // const chekAuth = async () => {
  //         await dispatch(fetchProfile({ accessToken }))
  //         await dispatch(fetchTodos({ page: 1, limit: 2, accessToken }))
  //     }
  
  //     useEffect(() => {
  //         chekAuth()
  //     },[accessToken])

  return (
    <ThemeProvider theme={themeToProvide}>
      <Routes>
        <Route 
           path='/' 
           element={
               <ProtectedRoute>
                 <HomePage />
               </ProtectedRoute>
            }
        />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route 
           path='/profile' 
           element={
               <ProtectedRoute>
                 <ProfilePage />
               </ProtectedRoute>
            }
        />

        {/* Not Found */}
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  ) 
}

export default App
