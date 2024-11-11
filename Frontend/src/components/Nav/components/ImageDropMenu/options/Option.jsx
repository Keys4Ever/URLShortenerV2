import { useNavigate } from "react-router-dom";

const Option = ({ icon, label, moveTo, hasBorder = false }) => {
    const navigate = useNavigate();
    return (
        <li>
            <a
                onClick={() => navigate(moveTo)}
                className={`flex items-center gap-2 px-3 sm:px-4 hover:cursor-pointer py-2 text-sm sm:text-base text-black bg-white hover:bg-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 ${hasBorder ? 'border-b border-black dark:border-white' : ''}`}
            >
                <span className="mr-2">
                    {icon}
                </span>
                <span className="truncate">{label}</span>
            </a>
        </li>
    );
};

export default Option;
