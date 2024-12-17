import { ExternalLink, Github } from "lucide-react";
import { useAuth } from "../../context/authContext";
import ABtn from "../ABtn";
import InvertedABtn from "../InvertedABtn";

const HeroSection = () => {
    const { auth } = useAuth();

    return (
        <section className="max-w-5xl mx-auto px-4 py-20 flex items-center">
            <div className="border-4 border-white p-8 text-left w-full mb-6">
                <h1 className="text-xl sm:text-2xl md:text-5xl font-bold mb-4 leading-tight"> 
                    Simple fully functional
                    <br />
                    <span className="text-4xl sm:text-3xl md:text-6xl">URL Shortener</span> 
                </h1>
                <p className="text-lg sm:text-xl mb-6 text-gray-400">
                    Open source project made with React & Node.js
                </p>
                
                <div className="flex gap-4 items-center">
                    <InvertedABtn
                        label="Get Started"
                        place="right"
                        link={auth.authenticated ? "/dashboard" : `${import.meta.env.VITE_BACKEND_URL}auth/login`}
                        external={true}
                        icon={<ExternalLink />}
                    />
                    <ABtn
                        label="Github Repo"
                        link="https://github.com/Keys4Ever/URLShortenerV2"
                        icon={<Github />}
                        external={true}
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
