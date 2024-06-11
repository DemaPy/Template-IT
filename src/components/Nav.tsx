import { Link } from "react-router-dom";
import { useAuth } from "../store/login";
import { Button } from "./ui/button";

const Nav = () => {
    const { isLogged, setIsLoggedOut, setIsLoggedIn } = useAuth()


    // const requestToExtension = () => {
    //     // The ID of the extension we want to talk to.
    //     var editorExtensionId = "jpncjjhjgbbjlglddfjeldbeojhbimmk";

    //     // Make a simple request:
    //     chrome.runtime.sendMessage(editorExtensionId, { name: "Dema", id: 385843 }, (response) => {
    //         console.log(response);
    //     })
    // }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLoggedOut()
    }

    return (
        <nav className="flex items-center justify-between border-b py-6">
            <p className="text-2xl font-bold">
                <Link to={"/"}>Template It</Link>
            </p>
            {!isLogged && (
                <Button onClick={setIsLoggedIn}>
                    Login
                </Button>
            )}
            {isLogged && (
                <ol className="flex items-center gap-2">
                    <Link to={'/templates'}>
                        <li className="font-semibold text-sm rounded-md border-2 border-violet-300 cursor-pointer px-3 py-2 transition text-violet-400 hover:text-violet-600">
                            Templates
                        </li>
                    </Link>
                    <Link to={'/campaigns'}>
                        <li className="font-semibold text-sm rounded-md border-2 border-violet-300 cursor-pointer px-3 py-2 transition text-violet-400 hover:text-violet-600">
                            Campaigns
                        </li>
                    </Link>
                    <Link to={'/components'}>
                        <li className="font-semibold text-sm rounded-md border-2 border-violet-300 cursor-pointer px-3 py-2 transition text-violet-400 hover:text-violet-600">
                            Components
                        </li>
                    </Link>
                    <Button onClick={handleLogout} variant={"outline"}>
                        Logout
                    </Button>
                </ol>
            )}
        </nav >
    );
};

export default Nav;
