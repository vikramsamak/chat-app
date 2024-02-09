import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setloading] = useState();
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        const sucess = handleInputError(username, password);
        if (!sucess) return;
        setloading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("currenUser", JSON.stringify(data))
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setloading(false);
        }
    }
    return { loading, login };
}

function handleInputError(username, password) {
    if (!username || !password) {
        toast.error("Please fill all the fields.")
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters.");
        return false;
    }

    return true;
}


export default useLogin;