import { useState } from "react";
import { aiHealthService } from "../services/aiService";
import ChatMessages, { type ChatMessage } from "./ChatMessages";
import DoctorsList from "./DoctorsList";
import BookingForm from "./BookingForm";
import MessageInput from "./MessageInput";
import {
  checkForSpecialtyRequest,
  extractDateFromInput,
  extractTimeFromInput,
  getAvailableDoctors,
  findDoctorByName,
  type DoctorWithAvailability,
} from "../utils/consultationUtils";
import { analyzeSymptoms } from "../utils/symptomAnalysis";

interface ConsultationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BookingData {
  selectedDate: string;
  selectedTime: string;
  appointmentType: string;
  fullName: string;
  email: string;
  phone: string;
  symptoms: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 1,
  type: "ai",
  message:
    "Hello! I'm your AI health assistant. I can help you in two ways:\n\n1. 🩺 Find and book appointments with specialist doctors\n2. 💬 Provide health guidance and answer your questions\n\nPlease describe your symptoms or health concerns, and I'll assist you accordingly!",
  timestamp: new Date(),
};

export default function ConsultationDialog({
  isOpen,
  onClose,
}: ConsultationDialogProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    INITIAL_MESSAGE,
  ]);
  const [userInput, setUserInput] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<
    DoctorWithAvailability[]
  >([]);
  const [showDoctorsList, setShowDoctorsList] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorWithAvailability | null>(null);
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedDate: "",
    selectedTime: "",
    appointmentType: "consultation",
    fullName: "",
    email: "",
    phone: "",
    symptoms: "",
  });
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);

  const addMessage = (message: string, type: "ai" | "user") => {
    const newMessage: ChatMessage = {
      id: chatMessages.length + 1,
      type,
      message,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, newMessage]);
  };

  const getHealthAdvice = async (userQuery: string): Promise<string> => {
    try {
      setIsLoadingAI(true);
      const context =
        conversationContext.length > 0
          ? conversationContext.slice(-3).join(" | ")
          : "";

      const aiResponse = await aiHealthService.getHealthAdvice(
        userQuery,
        context
      );
      setConversationContext((prev) =>
        [...prev, userQuery, aiResponse.message].slice(-6)
      );
      return aiResponse.message;
    } catch (error) {
      console.error("Error getting AI health advice:", error);
      return `I apologize, but I'm currently experiencing technical difficulties. For your health concerns, I recommend:

🩺 **Immediate Steps:**
• Monitor your symptoms and note any changes
• Stay hydrated and get adequate rest
• Contact your healthcare provider for evaluation
• Seek emergency care if symptoms are severe

**⚠️ Important:** This is general guidance only. Please consult with a qualified healthcare professional for personalized medical advice.`;
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleSpecialtyRequest = (specialtyRequest: string) => {
    const specialtyDoctors = getAvailableDoctors().filter(
      (d: DoctorWithAvailability) => d.specialty === specialtyRequest
    );
    setFilteredDoctors(specialtyDoctors);

    setTimeout(() => {
      addMessage(
        `Here are the available ${specialtyRequest} doctors. Please select a doctor below to book an appointment:`,
        "ai"
      );
      setShowDoctorsList(true);
    }, 1000);
  };

  const handleDoctorBookingRequest = (lowerInput: string) => {
    const availableDoctors = getAvailableDoctors();
    const doctorFound = findDoctorByName(lowerInput, availableDoctors);

    if (doctorFound) {
      setSelectedDoctor(doctorFound);
      setFilteredDoctors([doctorFound]);
      setShowDoctorsList(true);
      setShowBookingForm(true);

      const requestedDate = extractDateFromInput(lowerInput);
      const requestedTime = extractTimeFromInput(lowerInput);

      console.log("Date extraction debug:", {
        userInput: lowerInput,
        extractedDate: requestedDate,
        extractedTime: requestedTime,
      });

      if (requestedDate || requestedTime) {
        setBookingData((prev) => ({
          ...prev,
          ...(requestedDate && { selectedDate: requestedDate }),
          ...(requestedTime && { selectedTime: requestedTime }),
        }));
      }

      setTimeout(() => {
        const cleanDoctorName = doctorFound.name.replace(/^dr\.?\s*/i, "");
        addMessage(
          `Perfect! I found Dr. ${cleanDoctorName}, a ${
            doctorFound.specialty
          } specialist. Please fill out the booking form below to schedule your appointment.${
            requestedDate || requestedTime
              ? " I've pre-filled your preferred date and time."
              : ""
          }`,
          "ai"
        );
      }, 1000);
    } else {
      setTimeout(() => {
        addMessage(
          `I couldn't find a doctor with that exact name in our system. Here are all our available doctors. Please select the doctor you'd like to book with:`,
          "ai"
        );
        setFilteredDoctors(availableDoctors);
        setShowDoctorsList(true);
      }, 1000);
    }
  };

  const handleSymptomAnalysis = async (input: string) => {
    const relevantDoctors = analyzeSymptoms(input);
    setFilteredDoctors(relevantDoctors);

    addMessage(
      "🤔 Analyzing your symptoms and preparing personalized health guidance...",
      "ai"
    );

    setTimeout(async () => {
      try {
        const healthAdvice = await getHealthAdvice(input);
        const responseMessage = `${healthAdvice}

---

**Would you also like to see specialist doctors?**

I've found ${relevantDoctors.length} specialist doctors who can help with your symptoms. You can:

1. 🩺 **See available doctors** and book an appointment
2. 💬 **Continue our conversation** for more health guidance

Just let me know what you'd prefer!`;

        // Replace the loading message
        setChatMessages((prev) => [...prev.slice(0, -1)]);
        addMessage(responseMessage, "ai");
        setBookingData((prev) => ({ ...prev, symptoms: input }));
      } catch (error) {
        console.error("Error getting AI health advice:", error);
        setChatMessages((prev) => [...prev.slice(0, -1)]);
        addMessage(
          `Thank you for sharing your symptoms. Based on what you've described, I've found ${relevantDoctors.length} specialist doctors who can help you.

Would you like to:

1. 🩺 **See the available doctors** and book an appointment
2. 💬 **Get health advice** and guidance for your symptoms first

Please let me know which option you prefer!`,
          "ai"
        );
        setBookingData((prev) => ({ ...prev, symptoms: input }));
      }
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    addMessage(userInput, "user");

    // Check if user is requesting doctors by specific specialty
    const specialtyRequest = checkForSpecialtyRequest(userInput);
    if (specialtyRequest) {
      handleSpecialtyRequest(specialtyRequest);
      setUserInput("");
      return;
    }

    const lowerInput = userInput.toLowerCase();

    // Check if user wants to book with a specific doctor by name
    if (
      (lowerInput.includes("book") || lowerInput.includes("appointment")) &&
      (lowerInput.includes("dr.") ||
        lowerInput.includes("dr ") ||
        lowerInput.includes("doctor"))
    ) {
      handleDoctorBookingRequest(lowerInput);
      setUserInput("");
      return;
    }

    // Check if doctors are already shown for continued chat
    if (showDoctorsList) {
      const wantsToDoctors =
        lowerInput.includes("see doctors") ||
        lowerInput.includes("show doctors") ||
        lowerInput.includes("available doctors") ||
        lowerInput.includes("book appointment") ||
        lowerInput.includes("1") ||
        lowerInput.includes("option 1");

      if (wantsToDoctors && filteredDoctors.length > 0) {
        setTimeout(() => {
          addMessage(
            `Perfect! Here are the available specialist doctors who can help with your symptoms. Please select a doctor below to book an appointment:`,
            "ai"
          );
          setShowDoctorsList(true);
        }, 1000);
      } else {
        // Provide health guidance
        addMessage(
          "🤔 Let me analyze your question and provide detailed guidance...",
          "ai"
        );

        setTimeout(async () => {
          try {
            const healthAdvice = await getHealthAdvice(userInput);
            setChatMessages((prev) => [...prev.slice(0, -1)]);
            addMessage(
              `I understand you'd like to continue our conversation. Based on your question about "${userInput}", here's detailed health guidance:

${healthAdvice}

**⚠️ Important Reminder:** This guidance is for educational purposes and should not replace professional medical advice. If your symptoms persist, worsen, or you have specific concerns, please consult with one of the specialists shown above or your primary care physician.

Is there anything specific about your health concerns you'd like me to explain further?`,
              "ai"
            );
          } catch (error) {
            console.error("Error getting health advice:", error);
            setChatMessages((prev) => [...prev.slice(0, -1)]);
            addMessage(
              "I apologize, but I'm having trouble processing your request right now. Please try again or consult with one of the available doctors.",
              "ai"
            );
          }
        }, 1000);
      }
    } else {
      // Initial symptom analysis
      await handleSymptomAnalysis(userInput);
    }

    setUserInput("");
  };

  const handleDoctorSelect = (doctor: DoctorWithAvailability) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true);

    // Auto-fill booking data based on last user message
    const lastUserMessage =
      chatMessages[chatMessages.length - 1]?.message?.toLowerCase() || "";

    if (lastUserMessage.includes("9am") || lastUserMessage.includes("9 am")) {
      setBookingData((prev) => ({ ...prev, selectedTime: "9:00" }));
    }

    if (
      lastUserMessage.includes("aug 12") ||
      lastUserMessage.includes("august 12") ||
      lastUserMessage.includes("12 august") ||
      lastUserMessage.includes("tuesday")
    ) {
      setBookingData((prev) => ({ ...prev, selectedDate: "2025-08-12" }));
    }

    setTimeout(() => {
      const cleanDoctorName = doctor.name.replace(/^dr\.?\s*/i, "");
      addMessage(
        `Great choice! Dr. ${cleanDoctorName} is an excellent ${doctor.specialty} specialist. Please fill out the booking form below to schedule your appointment.`,
        "ai"
      );
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingData.selectedDate || !bookingData.selectedTime) {
      alert("Please select both date and time for your appointment.");
      return;
    }

    alert(
      `Appointment booked with ${selectedDoctor?.name} on ${bookingData.selectedDate} at ${bookingData.selectedTime} for ${bookingData.appointmentType}!`
    );

    // Reset and close
    onClose();
    setBookingData({
      selectedDate: "",
      selectedTime: "",
      appointmentType: "consultation",
      fullName: "",
      email: "",
      phone: "",
      symptoms: "",
    });
    setShowDoctorsList(false);
    setShowBookingForm(false);
    setChatMessages([INITIAL_MESSAGE]);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="rounded-3xl shadow-xl border w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "rgba(229, 231, 235, 0.5)",
        }}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className="text-3xl font-bold mb-2"
                style={{ color: "#374151" }}
              >
                AI Health Assistant
              </h2>
              <p style={{ color: "#6b7280" }}>
                Tell me about your symptoms and I'll help you find the right
                doctor
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: "#f3f4f6" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e5e7eb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f3f4f6")
              }
            >
              <svg
                className="w-6 h-6 text-ds-text-body"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Chat Content */}
          <div className="h-96 flex flex-col">
            <ChatMessages messages={chatMessages} />

            {/* Inline Doctors List */}
            {showDoctorsList && filteredDoctors.length > 0 && (
              <DoctorsList
                doctors={filteredDoctors}
                onDoctorSelect={handleDoctorSelect}
              />
            )}

            {/* Inline Booking Form */}
            {showBookingForm && selectedDoctor && (
              <BookingForm
                selectedDoctor={selectedDoctor}
                bookingData={bookingData}
                setBookingData={setBookingData}
                onSubmit={handleSubmit}
              />
            )}

            {/* Input Area */}
            <MessageInput
              userInput={userInput}
              setUserInput={setUserInput}
              onSendMessage={handleSendMessage}
              isLoading={isLoadingAI}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
