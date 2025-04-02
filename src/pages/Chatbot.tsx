import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";

const Chatbot = () => {
  const { user } = useAuth();
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: string; message: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    setChatHistory((prev) => [
      ...prev,
      { sender: "User", message: userMessage },
    ]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          contents: [{ parts: [{ text: userMessage }] }],
          generationConfig: {
            maxOutputTokens: 250, // Limit the response length
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const botMessage =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";

      // Remove excessive spaces and newlines
      const cleanedMessage = botMessage.replace(/\n{2,}/g, "\n").trim(); // Replaces multiple newlines with a single one

      // Split into sentences while preserving readability
      const splitMessages = cleanedMessage.match(/[^.!?]+[.!?]+/g) || [
        cleanedMessage,
      ];

      let formattedMessages = [];
      let tempMessage = "";

      splitMessages.forEach((sentence) => {
        if ((tempMessage + " " + sentence).length < 100) {
          // Adjust length as needed
          tempMessage += (tempMessage ? " " : "") + sentence.trim();
        } else {
          formattedMessages.push(tempMessage);
          tempMessage = sentence.trim();
        }
      });

      if (tempMessage) formattedMessages.push(tempMessage); // Push last message

      setChatHistory((prev) => [
        ...prev,
        ...formattedMessages.map((msg) => ({ sender: "Bot", message: msg })),
      ]);
    } finally {
      setIsLoading(false);
      setUserMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Financial Chatbot</h1>
        <p className="text-muted-foreground">
          Ask anything. Get insights and recommendations to improve your
          financial situation
        </p>
      </div>
      <div className="bg-fintrack-dark-lighter border-gray-800 shadow-md rounded-lg p-4 ">
        <h1 className="text-2xl font-bold tracking-tight mb-4 text-center">
          Hello, {user?.name}
        </h1>
        <div className="chat-history mb-4 h-96 overflow-y-auto p-2 rounded bg-gray-800 border-gray-700">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                chat.sender === "User" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-l-2xl rounded-b-2xl ${
                  chat.sender === "User"
                    ? "bg-gray-950 text-white"
                    : "text-white"
                }`}
              >
                {chat.message}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            className="flex-1 p-2 bg-gray-800 border-gray-700"
            placeholder="Ask for financial advice..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={isLoading} // Disable input while loading
          />
          <button
            className="bg-fintrack-green hover:bg-fintrack-green-dark px-8 py-2 flex items-center space-x-2"
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loader h-6 w-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              <SendHorizontal className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
