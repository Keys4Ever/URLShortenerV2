import { ArrowLeft } from "lucide-react"
import ABtn from "../../components/ABtn"

export const PageNotFound = () =>{
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img src="/tehe.gif" alt="404"/>
            <h1>Error 404</h1>
            <h2>Page not found</h2>
            <ABtn link="/" icon={<ArrowLeft/>} label="Go back home"/>
        </div>
    )
}