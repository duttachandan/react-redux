import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../features/loadingSlice.js";
import { preloadImages } from "../utils/PreLoadImage";
import Banner from "../assets/banner-img.jpg";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            dispatch(startLoading());

            // Simulate API call
            const apiPromise = new Promise((resolve) => setTimeout(resolve, 2000));

            // Preload images
            const imagePromise = preloadImages([
                Banner
            ]);

            await Promise.all([apiPromise, imagePromise]);
            dispatch(stopLoading());
        };

        loadData();
    }, [dispatch]);

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">Home Page</h1>
            <img src={Banner} alt="banner" className="mt-5 w-full" />
        </div>
    );
};

export default Home;
