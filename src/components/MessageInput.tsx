interface MessageInputProps {
  userInput: string;
  setUserInput: (value: string) => void;
  onSendMessage: () => void;
  isLoading?: boolean;
}

export default function MessageInput({
  userInput,
  setUserInput,
  onSendMessage,
  isLoading = false,
}: MessageInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Describe your symptoms or health concerns..."
        className="flex-1 px-4 py-3 rounded-xl border border-ds-gray/30 focus:border-ds-primary-blue focus:outline-none transition-colors"
        disabled={isLoading}
      />
      <button
        onClick={onSendMessage}
        disabled={isLoading || !userInput.trim()}
        className="px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 disabled:opacity-50"
        style={{ backgroundColor: "#5B73FF" }}
      >
        Send
      </button>
    </div>
  );
}
