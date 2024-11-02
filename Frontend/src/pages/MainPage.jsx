import { useEffect, useState } from "react"
import LookURLSection from "../components/MainPageComponents/LookURLSection";
import HeroSection from "../components/MainPageComponents/HeroSection";

const MainPage = () =>{
    return (
        <div className="max-w-[900px] mx-auto">
            <HeroSection />
            <LookURLSection />
        </div>
    )   
}

export default MainPage;