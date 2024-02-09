import { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import useSendMessage from "../../hooks/useSendMessage";
import Loader from "../SharedComponents/Loader";

const MessageInput = () => {

    const [message, setMessage] = useState("");

    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendMessage(message);
        setMessage("")
    }


    return (
        <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input
                    type="text"
                    className="border text-sm rounded-lg w-full p-2.5 bg-gray-700  border-gray-600 text-white"
                    placeholder="Send a message"
                    value={message}
                    onChange={(e) => { setMessage(e.target.value) }}
                />
                <button
                    className={`absolute inset-y-0 end-0 flex items-center pe-3 ${message.length === 0 ? 'text-gary-600' : "text-white"} `}
                    disabled={message.length === 0 ? true : false}
                >
                    {
                        loading ? <Loader /> : <LuSendHorizonal />
                    }

                </button>
            </div>
        </form >
    )
}

export default MessageInput