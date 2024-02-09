import useGetConversations from "../../hooks/useGetConversations"
import { getRandomEmoji } from "../../utils/emojis";
import Loader from "../SharedComponents/Loader";
import Conversation from "./Conversation"

const Conversations = () => {

  const { loading, converstions } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {
        converstions.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === Conversations.length - 1}
          />
        ))
      }
      {loading ? <Loader /> : null}
    </div>
  )
}

export default Conversations