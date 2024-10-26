import { ExternalLink, Github } from "lucide-react";
import { useAuth } from "../../context/authContext";
import ABtn from "../ABtn";
import InvertedABtn from "../InvertedABtn";

const HeroSection = () => {
    const { auth } = useAuth();

    return (
        <section className="max-w-5xl mx-auto px-4 py-20 flex items-center">
            <div className="border-4 border-white p-8 text-left w-full mb-6">
                <h1 className="text-6xl font-bold mb-4 leading-tight">
                    Simple fully functional
                    <br />
                    URL Shortener
                </h1>
                <p className="text-xl mb-6 text-gray-400">
                    Open source project made with React & Node.js
                </p>
                
                <div className="flex gap-4 items-center">
                    <InvertedABtn
                        label="Get Started"
                        place="right"
                        link={auth.authenticated ? "/dashboard" : "http://localhost:3000/login"}
                        icon={<ExternalLink />}
                    />
                    <ABtn
                        label="Github Repo"
                        link="https://github.com/Keys4Ever/URLShortenerV2"
                        icon={<Github />}
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
