const StyledButton = ({ label, icon, place = "left" }) => {
    return (
        <button 
            className="flex items-center gap-2 text-black border-black hover:bg-black hover:text-white border-2 px-4 py-2 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
        >
            {icon && place === "left" && (
                <span className="w-5 h-5 flex items-center justify-center">
                    {icon}
                </span>
            )}
            <span className="font-bold text-sm leading-none">{label}</span>
            {icon && place === "right" && (
                <span className="w-5 h-5 flex items-center justify-center">
                    {icon}
                </span>
            )}
        </button>
    );
};

export default StyledButton;
