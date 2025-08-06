export interface ChatMessage {
  id: number;
  type: "ai" | "user";
  message: string;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.type === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {/* AI Doctor Avatar */}
          {message.type === "ai" && (
            <div className="flex-shrink-0 mr-4">
              <img
                src="/images/doctor1.webp"
                alt="AI Doctor"
                className="w-12 h-12 rounded-full object-cover border-3 border-blue-300 shadow-lg bg-white p-1"
                style={{
                  filter: "brightness(1.05) contrast(1.1)",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
                }}
              />
            </div>
          )}

          <div
            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              message.type === "user" ? "text-white" : "text-gray-800"
            }`}
            style={{
              backgroundColor: message.type === "user" ? "#5B73FF" : "#f3f4f6",
            }}
          >
            <div className="text-sm whitespace-pre-line">
              {message.message.split("\n").map((line, index) => {
                // Handle bold formatting
                if (line.includes("**")) {
                  const parts = line.split("**");
                  return (
                    <div key={index}>
                      {parts.map((part, partIndex) =>
                        partIndex % 2 === 1 ? (
                          <strong key={partIndex}>{part}</strong>
                        ) : (
                          <span key={partIndex}>{part}</span>
                        )
                      )}
                    </div>
                  );
                }
                // Handle bullet points
                if (line.trim().startsWith("•")) {
                  return (
                    <div key={index} className="ml-2">
                      {line}
                    </div>
                  );
                }
                return <div key={index}>{line}</div>;
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
