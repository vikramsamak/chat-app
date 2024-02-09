import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {

    const [loading, setloading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const SignUp = async ({ fullName, username, password, confirmPassword, gender }) => {
        const sucess = handleInputError({ fullName, username, password, confirmPassword, gender });
        if (!sucess) return;

        setloading(true);
        try {

            const res = await fetch("/api/auth/signup",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
                })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("currenUser", JSON.stringify(data))
            setAuthUser(data)

        } catch (error) {
            toast.error(error.message)
        } finally {
            setloading(false);
        }
    }

    return { loading, SignUp };
}

function handleInputError({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields.")
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Password do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters.");
        return false;
    }

    return true;
}

export default useSignUp;