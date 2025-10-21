import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ children }) => {
    const location = useLocation();
    const { pathname } = location;
    useEffect(() => {
        console.log("You are welcomed to", pathname)
    }, [pathname])
    return children;
}

export default ScrollToTop
