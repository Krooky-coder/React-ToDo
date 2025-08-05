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
import { useState } from 'react';
import ThemeChange from '../components/ThemeChange/index.tsx';
import { Container } from './style.ts';

function App() {
  const { initialValue: themeValue } = useLocalStorage<string>('Theme', 'light');

  const themeToProvide = themeValue === 'light' ? lightTheme : blackTheme;
  const [theme, setTheme] = useState<string>(themeValue);

  return (
    <ThemeProvider theme={themeToProvide}>
      <Container>
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
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
        <ThemeChange theme={theme} setTheme={setTheme} />
      </Container>
    </ThemeProvider>
  ) 
}

export default App
