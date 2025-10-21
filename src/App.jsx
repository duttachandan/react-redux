import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import ScrollToTop from './utils/scrollToTop';
import Home from './pages/Home';
import About from "./pages/About";
import Auth from "./pages/Auth"
import AuthChecker from './utils/AuthChecker';



function App() {
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
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
