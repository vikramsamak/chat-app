
const Message = () => {
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        src="https://placehold.co/20x20"
                        alt="avatar"
                    ></img>
                </div>
            </div>
            <div className="chat-bubble bg-blue-500 text-white">
                hi how ar u
            </div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
                12:42
            </div>
        </div>
    )
}

export default Message