import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { useSelector } from "react-redux";

import './App.css';

import ScrollToTop from './utils/scrollToTop';
import AuthChecker from './utils/AuthChecker';
import Loader from "./utils/Loader";


// import Home from './pages/Home';
// import About from "./pages/About";
// import Auth from "./pages/Auth"
const Home = React.lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Auth = lazy(() => import('./pages/Auth'))





function App() {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> }
  ];

  const Auths = [
    { path: '/auth', element: <Auth /> },
  ];

  return (
    <BrowserRouter>
      {/* ScrollToTop is optional; comment or define if using */}
      <ScrollToTop>
        {isLoading && <Loader />}
        <Suspense fallback={<Loader />}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            <Route element={<AuthChecker />}>
              {
                Auths.map((route, index) => (
                  <Route key={index} path={route.path} element={route.element} />
                ))
              }
            </Route>
          </Routes>
        </Suspense>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
