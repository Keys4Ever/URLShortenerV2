const Option = ({ icon, label, moveTo, hasBorder = false }) => {
    return (
        <li>
            <a 
                href={moveTo} 
                className={`flex items-center px-4 py-2 text-sm text-black bg-white hover:bg-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 ${hasBorder ? 'border-b-2 border-black dark:border-white' : ''}`}
            >
                <span className="mr-2">{icon}</span>
                {label}
            </a>
        </li>
    );
};

export default Option;
