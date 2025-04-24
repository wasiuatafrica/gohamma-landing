import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ChatbotContextType {
  isChatbotOpen: boolean;
  setIsChatbotOpen: (isOpen: boolean) => void;
}

// Create context with a default value (can be undefined or a default object)
const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

interface ChatbotProviderProps {
  children: ReactNode;
}

// Create provider component
export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({ children }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);

  return (
    <ChatbotContext.Provider value={{ isChatbotOpen, setIsChatbotOpen }}>
      {children}
    </ChatbotContext.Provider>
  );
};

// Custom hook to use the chatbot context
export const useChatbot = (): ChatbotContextType => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
