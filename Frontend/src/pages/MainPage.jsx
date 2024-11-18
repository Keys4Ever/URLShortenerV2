import { useEffect, useState } from "react"
import LookURLSection from "../components/MainPageComponents/LookURLSection";
import HeroSection from "../components/MainPageComponents/HeroSection";
import QuickShorten from "../components/QuickShorten";

const MainPage = () =>{
    return (
        <div className="max-w-[900px] mx-auto">
            <HeroSection />
            <LookURLSection />
            <QuickShorten />
        </div>
    )   
}

export default MainPage;