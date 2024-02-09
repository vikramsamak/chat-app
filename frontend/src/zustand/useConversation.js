import { create } from "zustand"

const useConversation = create((set) => ({
    selectedConverstion: null,
    setSelectedConverstion: (selectedConverstion) => set({ selectedConverstion }),
    messages: [],
    setMessages: (messages) => set({ messages })

}))

export default useConversation;