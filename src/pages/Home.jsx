import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            This is Home Page
            <Link to="/about" className="py-3 px-6 rounded-lg bg-blue-600">About Page</Link>
            <Link to="/auth" className="py-3 px-6 rounded-lg bg-blue-600">Authentication Page</Link>
        </div>
    )
}

export default Home
