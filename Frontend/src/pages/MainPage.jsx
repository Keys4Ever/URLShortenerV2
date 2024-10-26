import { useEffect, useState } from "react"
import LookURLSection from "../components/MainPageComponents/LookURLSection";
import HeroSection from "../components/MainPageComponents/HeroSection";

const MainPage = () =>{
    return (
        <div className="bg-white dark:bg-black text-black dark:text-white">
            <HeroSection />
            <LookURLSection />
        </div>
    )   
}

export default MainPage;