import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {

    const [search, setSearch] = useState("");
    const { setSelectedConverstion } = useConversation();
    const { converstions } = useGetConversations();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.length < 3) {
            return toast.error("Search term must be 3 characters long.")
        }

        const conversation = converstions.find((c) => (c.fullName.toLowerCase().includes(search.toLowerCase())));

        if (conversation) {
            setSelectedConverstion(conversation)
            setSearch('')
        }
        else{
            toast.error("No such user found")
        }
    }

    return (
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search"
                className="input input-bordered rounded-full"
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
            >
            </input>
            <button
                type="submit"
                className="btn btn-circle bg-sky-500 text-white"
                disabled={search.length === 0 ? true : false}
            >
                <FaSearch className="w-6 h-6 outline-none" />
            </button>
        </form>
    )
}

export default SearchInput