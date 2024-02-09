import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useGetConversations = () => {

    const [loading, setloading] = useState(false);

    const [converstions, setConverstions] = useState([]);

    useEffect(() => {
        const getConverstions = async () => {
            setloading(true);
            try {
                const res = await fetch('/api/users')
              
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error)
                }

                setConverstions(data);
            } catch (error) {
                toast.error(error.message)
            } finally {
                setloading(false);
            }
        }

        getConverstions();
    }, []);

    return { loading, converstions };
}

export default useGetConversations;