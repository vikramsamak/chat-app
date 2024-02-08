import { BiLogOut } from "react-icons/bi";
import useLogOut from "../../hooks/useLogOut";
import Loader from "../SharedComponents/Loader";

const LogoutButton = () => {

    const { loading, logout } = useLogOut();

    return (
        <div className="mt-auto">
            {
                loading ?
                    (
                        <Loader />
                    ) : (
                        <button
                            onClick={logout}
                            className="w-6 h-6 text-white cursor-pointer"
                        >
                            <BiLogOut className="w-full h-full" />
                        </button>
                    )
            }
        </div>
    )
}

export default LogoutButton