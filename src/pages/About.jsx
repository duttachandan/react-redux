// About.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts';

const About = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>About Page</h2>
            {data.map((post) => (
                <div key={post.id}>
                    <h4>{post.title}</h4>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
};

export default About;
