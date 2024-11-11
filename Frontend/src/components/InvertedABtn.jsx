import { useNavigate } from "react-router-dom";

const InvertedABtn = ({ link, label, icon, place = "left", external = false }) => {
    const navigate = useNavigate();
    return (
        <button 
            onClick={() => external ? window.location.href = link : navigate(link)}
            className="flex items-center hover:cursor-pointer justify-center gap-2 text-white bg-black hover:bg-white hover:text-black border-2 px-4 py-2 dark:text-black dark:bg-white dark:hover:bg-black dark:hover:text-white transition-all duration-200"
        >
            {icon && place === "left" && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
            <span className="font-bold text-sm leading-none">{label}</span>
            {icon && place === "right" && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
        </button>
    );
};

export default InvertedABtn;
