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


function App() {
  const { initialValue: themeValue } = useLocalStorage<string>('Theme', 'light');
  const themeToProvide = themeValue === 'light' ? lightTheme : blackTheme;

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
