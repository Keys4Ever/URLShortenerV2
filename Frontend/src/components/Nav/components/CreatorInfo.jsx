const CreatorInfo = ({link, label}) => {
    return(
        <a href={link} className="text-black border-black hover:bg-black hover:text-white border-2 px-4 py-2 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition-all duration-200">
            {label}
        </a>

    )
}


export default CreatorInfo;