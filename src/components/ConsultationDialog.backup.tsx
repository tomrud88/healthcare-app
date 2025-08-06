import { useState } from "react";
import { doctors, type Doctor } from "../data/doctors";
import { aiHealthService } from "../services/aiService";

interface ConsultationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DoctorWithAvailability extends Doctor {
  availability: string;
}

interface ChatMessage {
  id: number;
  type: "ai" | "user";
  message: string;
  timestamp: Date;
}

export default function ConsultationDialog({
  isOpen,
  onClose,
}: ConsultationDialogProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "ai",
      message:
        "Hello! I'm your AI health assistant. I can help you in two ways:\n\n1. 🩺 Find and book appointments with specialist doctors\n2. 💬 Provide health guidance and answer your questions\n\nPlease describe your symptoms or health concerns, and I'll assist you accordingly!",
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState("");

  // Helper function to check if user is requesting doctors by specialty
  const checkForSpecialtyRequest = (input: string): string | null => {
    const lowerInput = input.toLowerCase();

    // Common specialty patterns
    const specialtyPatterns = [
      {
        pattern: /neurology|neurologist|neurologists|brain|nervous system/,
        specialty: "Neurology",
      },
      {
        pattern: /cardiology|cardiologist|cardiologists|heart|cardiac/,
        specialty: "Cardiology",
      },
      {
        pattern: /dermatology|dermatologist|dermatologists|skin/,
        specialty: "Dermatology",
      },
      {
        pattern: /pediatrics?|pediatrician|pediatricians|children|child/,
        specialty: "Pediatrics",
      },
      {
        pattern: /orthopedic|orthopedist|orthopedists|bone|joint|fracture/,
        specialty: "Orthopedics",
      },
      {
        pattern: /general practice|general practitioner|family medicine|gp/,
        specialty: "General Practice",
      },
      {
        pattern: /dentist|dentists|dentistry|dental|tooth|teeth/,
        specialty: "Dentistry",
      },
      {
        pattern: /pulmonology|pulmonologist|pulmonologists|lung|respiratory/,
        specialty: "Pulmonology",
      },
      {
        pattern: /gynecology|gynecologist|gynecologists|women/,
        specialty: "Gynecology",
      },
      {
        pattern: /nephrology|nephrologist|nephrologists|kidney/,
        specialty: "Nephrology",
      },
    ];

    // Check if user is asking to "show" or "see" doctors with specialty
    if (
      lowerInput.includes("show") ||
      lowerInput.includes("see") ||
      lowerInput.includes("find") ||
      lowerInput.includes("get")
    ) {
      for (const { pattern, specialty } of specialtyPatterns) {
        if (pattern.test(lowerInput)) {
          return specialty;
        }
      }
    }

    return null;
  };

  // Helper function to get available doctors
  const getAvailableDoctors = (): DoctorWithAvailability[] => {
    return doctors.map((doctor) => ({
      ...doctor,
      availability: "Available today", // Adding required availability property
    }));
  };

  // Helper function to extract date from user input
  const extractDateFromInput = (input: string): string | null => {
    const lowerInput = input.toLowerCase();
    const currentYear = new Date().getFullYear();

    // Check for specific date patterns
    // Tuesday 12 August, August 12, 12 August, etc.
    const datePatterns = [
      // Pattern: "tuesday 12 august" or "12 august"
      /(?:tuesday|monday|wednesday|thursday|friday|saturday|sunday)?\s*(\d{1,2})\s*(?:august|aug)/,
      // Pattern: "august 12" or "aug 12"
      /(?:august|aug)\s*(\d{1,2})/,
      // Pattern: "12/08" or "12-08"
      /(\d{1,2})[/-]0?8/,
    ];

    for (const pattern of datePatterns) {
      const match = lowerInput.match(pattern);
      if (match) {
        const day = parseInt(match[1]);
        if (day >= 1 && day <= 31) {
          // Create date for August (month 7, 0-indexed) avoiding timezone issues
          const year = currentYear;
          const month = 8; // August (1-indexed for formatting)
          const dayStr = day.toString().padStart(2, "0");
          const monthStr = month.toString().padStart(2, "0");
          return `${year}-${monthStr}-${dayStr}`;
        }
      }
    }

    return null;
  };

  // Helper function to extract time from user input
  const extractTimeFromInput = (input: string): string | null => {
    const lowerInput = input.toLowerCase();

    // Time patterns
    const timePatterns = [
      // Pattern: "9 am", "9am", "9:00 am"
      /(\d{1,2})(?::(\d{2}))?\s*am/,
      // Pattern: "9 pm", "9pm", "9:00 pm"
      /(\d{1,2})(?::(\d{2}))?\s*pm/,
      // Pattern: "9:30", "09:30"
      /(\d{1,2}):(\d{2})/,
    ];

    for (const pattern of timePatterns) {
      const match = lowerInput.match(pattern);
      if (match) {
        let hour = parseInt(match[1]);
        const minute = match[2] ? parseInt(match[2]) : 0;

        // Handle AM/PM
        if (lowerInput.includes("pm") && hour !== 12) {
          hour += 12;
        } else if (lowerInput.includes("am") && hour === 12) {
          hour = 0;
        }

        // Format as HH:MM
        return `${hour}:${minute.toString().padStart(2, "0")}`;
      }
    }

    return null;
  };
  const [filteredDoctors, setFilteredDoctors] = useState<
    DoctorWithAvailability[]
  >([]);
  const [showDoctorsList, setShowDoctorsList] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorWithAvailability | null>(null);
  const [bookingData, setBookingData] = useState({
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

  // Generate available dates (next 14 days, excluding weekends for some specialties)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip weekends for certain specialties
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      if (
        isWeekend &&
        selectedDoctor &&
        ["Cardiology", "Neurology"].includes(selectedDoctor.specialty)
      ) {
        continue;
      }

      // Highlight August 13th or August 12th if they're requested
      const isAug13 = date.getMonth() === 7 && date.getDate() === 13; // August is month 7 (0-indexed)
      const isAug12 = date.getMonth() === 7 && date.getDate() === 12;
      const isRequestedDate = isAug13 || isAug12;

      dates.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        isRequested: isRequestedDate, // Mark if this is the requested date
      });
    }
    return dates;
  };

  // Generate available time slots
  const generateTimeSlots = (): { value: string; label: string }[] => {
    const slots: { value: string; label: string }[] = [];
    const startHour = selectedDoctor?.specialty === "Dentistry" ? 8 : 9;
    const endHour = selectedDoctor?.specialty === "Cardiology" ? 18 : 17;

    for (let hour = startHour; hour <= endHour; hour++) {
      if (hour === 12) continue; // Skip lunch hour

      const timeSlots = [`${hour}:00`, `${hour}:30`];
      timeSlots.forEach((time) => {
        const [h, m] = time.split(":");
        const hour24 = parseInt(h);
        const isAM = hour24 < 12;
        const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
        const displayTime = `${hour12}:${m} ${isAM ? "AM" : "PM"}`;

        slots.push({
          value: time,
          label: displayTime,
        });
      });
    }
    return slots;
  };

  const analyzeSymptoms = (symptoms: string): DoctorWithAvailability[] => {
    const symptomsLower = symptoms.toLowerCase();
    const availableDoctors = getAvailableDoctors();

    // Comprehensive keyword matching for each specialty
    if (
      symptomsLower.includes("chest pain") ||
      symptomsLower.includes("heart") ||
      symptomsLower.includes("cardiac") ||
      symptomsLower.includes("cardio") ||
      symptomsLower.includes("blood pressure") ||
      symptomsLower.includes("hypertension") ||
      symptomsLower.includes("palpitations") ||
      symptomsLower.includes("arrhythmia") ||
      symptomsLower.includes("cardiovascular") ||
      symptomsLower.includes("cholesterol") ||
      symptomsLower.includes("coronary") ||
      symptomsLower.includes("angina") ||
      symptomsLower.includes("cardiologist")
    ) {
      return availableDoctors.filter((d) => d.specialty === "Cardiology");
    } else if (
      symptomsLower.includes("skin") ||
      symptomsLower.includes("rash") ||
      symptomsLower.includes("acne") ||
      symptomsLower.includes("dermatology") ||
      symptomsLower.includes("dermatologist") ||
      symptomsLower.includes("eczema") ||
      symptomsLower.includes("psoriasis") ||
      symptomsLower.includes("mole") ||
      symptomsLower.includes("pigmentation") ||
      symptomsLower.includes("dermatitis") ||
      symptomsLower.includes("allergy") ||
      symptomsLower.includes("itching") ||
      symptomsLower.includes("hives") ||
      symptomsLower.includes("wrinkles") ||
      symptomsLower.includes("aging") ||
      symptomsLower.includes("spots")
    ) {
      return availableDoctors.filter((d) => d.specialty === "Dermatology");
    } else if (
      symptomsLower.includes("headache") ||
      symptomsLower.includes("neurological") ||
      symptomsLower.includes("migraine") ||
      symptomsLower.includes("neurology") ||
      symptomsLower.includes("neurologist") ||
      symptomsLower.includes("seizure") ||
      symptomsLower.includes("epilepsy") ||
      symptomsLower.includes("stroke") ||
      symptomsLower.includes("paralysis") ||
      symptomsLower.includes("numbness") ||
      symptomsLower.includes("tingling") ||
      symptomsLower.includes("memory loss") ||
      symptomsLower.includes("confusion") ||
      symptomsLower.includes("dizziness") ||
      symptomsLower.includes("vertigo") ||
      symptomsLower.includes("tremor") ||
      symptomsLower.includes("parkinson") ||
      symptomsLower.includes("alzheimer")
    ) {
      return availableDoctors.filter((d) => d.specialty === "Neurology");
    } else if (
      symptomsLower.includes("child") ||
      symptomsLower.includes("kid") ||
      symptomsLower.includes("pediatric") ||
      symptomsLower.includes("pediatrics") ||
      symptomsLower.includes("pediatrician") ||
      symptomsLower.includes("baby") ||
      symptomsLower.includes("infant") ||
      symptomsLower.includes("toddler") ||
      symptomsLower.includes("adolescent") ||
      symptomsLower.includes("teenager") ||
      symptomsLower.includes("vaccination") ||
      symptomsLower.includes("vaccine") ||
      symptomsLower.includes("growth") ||
      symptomsLower.includes("development") ||
      symptomsLower.includes("fever in child")
    ) {
      return availableDoctors.filter((d) => d.specialty === "Pediatrics");
    } else if (
      symptomsLower.includes("tooth") ||
      symptomsLower.includes("dental") ||
      symptomsLower.includes("teeth") ||
      symptomsLower.includes("dentist") ||
      symptomsLower.includes("dentistry") ||
      symptomsLower.includes("cavity") ||
      symptomsLower.includes("gum") ||
      symptomsLower.includes("oral") ||
      symptomsLower.includes("toothache") ||
      symptomsLower.includes("bleeding gums") ||
      symptomsLower.includes("gingivitis") ||
      symptomsLower.includes("periodontitis") ||
      symptomsLower.includes("crown") ||
      symptomsLower.includes("filling") ||
      symptomsLower.includes("extraction") ||
      symptomsLower.includes("root canal") ||
      symptomsLower.includes("braces") ||
      symptomsLower.includes("orthodontic") ||
      symptomsLower.includes("jaw pain") ||
      symptomsLower.includes("bad breath") ||
      symptomsLower.includes("mouth")
    ) {
      return availableDoctors.filter((d) => d.specialty === "Dentistry");
    } else if (
      symptomsLower.includes("bone") ||
      symptomsLower.includes("joint") ||
      symptomsLower.includes("fracture") ||
      symptomsLower.includes("orthopedic") ||
      symptomsLower.includes("orthopedics") ||
      symptomsLower.includes("orthopedist") ||
      symptomsLower.includes("arthritis") ||
      symptomsLower.includes("back pain") ||
      symptomsLower.includes("neck pain") ||
      symptomsLower.includes("shoulder pain") ||
      symptomsLower.includes("knee pain") ||
      symptomsLower.includes("hip pain") ||
      symptomsLower.includes("ankle pain") ||
      symptomsLower.includes("spine") ||
      symptomsLower.includes("spinal") ||
      symptomsLower.includes("ligament") ||
      symptomsLower.includes("tendon") ||
      symptomsLower.includes("muscle strain") ||
      symptomsLower.includes("sports injury") ||
      symptomsLower.includes("broken bone")
    ) {
      return availableDoctors.filter((d) => d.specialty === "Orthopedics");
    } else if (
      symptomsLower.includes("kidney") ||
      symptomsLower.includes("urine") ||
      symptomsLower.includes("nephrology") ||
      symptomsLower.includes("nephrologist") ||
      symptomsLower.includes("urinary") ||
      symptomsLower.includes("bladder") ||
      symptomsLower.includes("dialysis") ||
      symptomsLower.includes("kidney stones") ||
      symptomsLower.includes("blood in urine") ||
      symptomsLower.includes("frequent urination") ||
      symptomsLower.includes("kidney disease") ||
      symptomsLower.includes("renal") ||
      symptomsLower.includes("proteinuria") ||
      symptomsLower.includes("creatinine") ||
      symptomsLower.includes("hypertension kidney")
    ) {
      return availableDoctors.filter((d) => d.specialty === "Nephrology");
    } else if (
      symptomsLower.includes("lung") ||
      symptomsLower.includes("breathing") ||
      symptomsLower.includes("cough") ||
      symptomsLower.includes("pulmonology") ||
      symptomsLower.includes("pulmonologist") ||
      symptomsLower.includes("asthma") ||
      symptomsLower.includes("bronchitis") ||
      symptomsLower.includes("pneumonia") ||
      symptomsLower.includes("shortness of breath") ||
      symptomsLower.includes("wheezing") ||
      symptomsLower.includes("chest congestion") ||
      symptomsLower.includes("respiratory") ||
      symptomsLower.includes("copd") ||
      symptomsLower.includes("tuberculosis") ||
      symptomsLower.includes("sleep apnea") ||
      symptomsLower.includes("oxygen") ||
      symptomsLower.includes("airways")
    ) {
      return availableDoctors.filter((d) => d.specialty === "Pulmonology");
    } else if (
      symptomsLower.includes("women") ||
      symptomsLower.includes("pregnancy") ||
      symptomsLower.includes("menstrual") ||
      symptomsLower.includes("gynecology") ||
      symptomsLower.includes("gynecologist") ||
      symptomsLower.includes("period") ||
      symptomsLower.includes("menstruation") ||
      symptomsLower.includes("pcos") ||
      symptomsLower.includes("endometriosis") ||
      symptomsLower.includes("ovarian") ||
      symptomsLower.includes("uterine") ||
      symptomsLower.includes("cervical") ||
      symptomsLower.includes("pap smear") ||
      symptomsLower.includes("contraception") ||
      symptomsLower.includes("fertility") ||
      symptomsLower.includes("menopause") ||
      symptomsLower.includes("vaginal") ||
      symptomsLower.includes("breast") ||
      symptomsLower.includes("prenatal") ||
      symptomsLower.includes("postpartum")
    ) {
      return availableDoctors.filter((d) => d.specialty === "Gynecology");
    } else {
      // Default to showing a diverse mix of specialists from different specialties
      const specialties = [
        "Cardiology",
        "Neurology",
        "Dermatology",
        "Dentistry",
        "Pulmonology",
        "Orthopedics",
      ];
      const diverseDoctors: DoctorWithAvailability[] = [];

      specialties.forEach((specialty) => {
        const doctorInSpecialty = availableDoctors.find(
          (d) => d.specialty === specialty
        );
        if (doctorInSpecialty) {
          diverseDoctors.push(doctorInSpecialty);
        }
      });

      return diverseDoctors.length > 0
        ? diverseDoctors
        : availableDoctors.slice(0, 6);
    }
  };

  const getHealthAdvice = async (userQuery: string): Promise<string> => {
    try {
      setIsLoadingAI(true);

      // Build conversation context for better AI responses
      const context =
        conversationContext.length > 0
          ? conversationContext.slice(-3).join(" | ") // Last 3 interactions for context
          : "";

      const aiResponse = await aiHealthService.getHealthAdvice(
        userQuery,
        context
      );

      // Update conversation context
      setConversationContext((prev) =>
        [...prev, userQuery, aiResponse.message].slice(-6)
      ); // Keep last 6 entries

      return aiResponse.message;
    } catch (error) {
      console.error("Error getting AI health advice:", error);

      // Fallback to a professional response if AI fails
      return `I apologize, but I'm currently experiencing technical difficulties. For your health concerns, I recommend:

🩺 **Immediate Steps:**
• Monitor your symptoms and note any changes
• Stay hydrated and get adequate rest
• Contact your healthcare provider for evaluation
• Seek emergency care if symptoms are severe

**For non-emergency concerns:** Schedule an appointment with an appropriate specialist. Would you like me to help you find available doctors in your area?

**⚠️ Important:** This is general guidance only. Please consult with a qualified healthcare professional for personalized medical advice.`;
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: chatMessages.length + 1,
      type: "user",
      message: userInput,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);

    // Check if user is requesting doctors by specific specialty (priority check)
    const specialtyRequest = checkForSpecialtyRequest(userInput);

    if (specialtyRequest) {
      const specialtyDoctors = getAvailableDoctors().filter(
        (d: DoctorWithAvailability) => d.specialty === specialtyRequest
      );
      setFilteredDoctors(specialtyDoctors);

      setTimeout(() => {
        const specialtyResponse: ChatMessage = {
          id: chatMessages.length + 2,
          type: "ai",
          message: `Here are the available ${specialtyRequest} doctors. Please select a doctor below to book an appointment:`,
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, specialtyResponse]);
        setShowDoctorsList(true);
      }, 1000);

      setUserInput("");
      return;
    }

    // Check if user wants to book with a specific doctor by name
    const lowerInput = userInput.toLowerCase();
    if (
      (lowerInput.includes("book") || lowerInput.includes("appointment")) &&
      (lowerInput.includes("dr.") ||
        lowerInput.includes("dr ") ||
        lowerInput.includes("doctor"))
    ) {
      const availableDoctors = getAvailableDoctors();

      // Try to find doctor by name with improved matching
      const doctorFound = availableDoctors.find((doctor) => {
        const doctorNameLower = doctor.name.toLowerCase();
        const inputLower = lowerInput;

        // Extract just the name part without "Dr." prefix
        const nameWithoutTitle = doctorNameLower.replace(/^dr\.?\s*/, "");
        const [firstName, lastName] = nameWithoutTitle.split(" ");

        // Also handle input with "dr." by removing it for comparison
        const cleanInput = inputLower.replace(/dr\.?\s*/g, "");

        // Check for various name patterns in the input
        return (
          inputLower.includes(doctorNameLower) ||
          inputLower.includes(nameWithoutTitle) ||
          cleanInput.includes(nameWithoutTitle) ||
          (firstName &&
            lastName &&
            inputLower.includes(firstName) &&
            inputLower.includes(lastName)) ||
          (firstName &&
            lastName &&
            cleanInput.includes(firstName) &&
            cleanInput.includes(lastName)) ||
          // Handle variations like "sarah thompson" vs "sarah thomson"
          (firstName &&
            inputLower.includes(firstName) &&
            lastName &&
            (inputLower.includes(lastName) ||
              cleanInput.includes(lastName) ||
              // Check for similar surnames (thomson vs thompson)
              (lastName.includes("thompson") &&
                (inputLower.includes("thomson") ||
                  cleanInput.includes("thomson"))) ||
              (lastName.includes("thomson") &&
                (inputLower.includes("thompson") ||
                  cleanInput.includes("thompson")))))
        );
      });

      if (doctorFound) {
        setSelectedDoctor(doctorFound);
        setFilteredDoctors([doctorFound]);
        setShowDoctorsList(true);
        setShowBookingForm(true);

        // Extract date and time from user input for auto-filling
        const requestedDate = extractDateFromInput(lowerInput);
        const requestedTime = extractTimeFromInput(lowerInput);

        // Debug logging
        console.log("Date extraction debug:", {
          userInput: lowerInput,
          extractedDate: requestedDate,
          extractedTime: requestedTime,
        });

        // Auto-fill the booking form with extracted date/time
        if (requestedDate || requestedTime) {
          setBookingData((prev) => ({
            ...prev,
            ...(requestedDate && { selectedDate: requestedDate }),
            ...(requestedTime && { selectedTime: requestedTime }),
          }));
        }

        setTimeout(() => {
          // Clean up the doctor name to avoid "Dr. Dr." issue
          const cleanDoctorName = doctorFound.name.replace(/^dr\.?\s*/i, "");
          const bookingResponse: ChatMessage = {
            id: chatMessages.length + 2,
            type: "ai",
            message: `Perfect! I found Dr. ${cleanDoctorName}, a ${
              doctorFound.specialty
            } specialist. Please fill out the booking form below to schedule your appointment.${
              requestedDate || requestedTime
                ? " I've pre-filled your preferred date and time."
                : ""
            }`,
            timestamp: new Date(),
          };
          setChatMessages((prev) => [...prev, bookingResponse]);
        }, 1000);

        setUserInput("");
        return;
      } else {
        // Doctor not found by name
        setTimeout(() => {
          const notFoundResponse: ChatMessage = {
            id: chatMessages.length + 2,
            type: "ai",
            message: `I couldn't find a doctor with that exact name in our system. Here are all our available doctors. Please select the doctor you'd like to book with:`,
            timestamp: new Date(),
          };
          setChatMessages((prev) => [...prev, notFoundResponse]);
          setFilteredDoctors(availableDoctors);
          setShowDoctorsList(true);
        }, 1000);

        setUserInput("");
        return;
      }
    }

    // Check if user wants to book an appointment with specific date/time but no doctor specified
    if (
      (lowerInput.includes("book") ||
        lowerInput.includes("appointment") ||
        lowerInput.includes("schedule")) &&
      !lowerInput.includes("dr.") &&
      !lowerInput.includes("dr ") &&
      !lowerInput.includes("doctor") &&
      (lowerInput.includes("am") ||
        lowerInput.includes("pm") ||
        lowerInput.includes("monday") ||
        lowerInput.includes("tuesday") ||
        lowerInput.includes("wednesday") ||
        lowerInput.includes("thursday") ||
        lowerInput.includes("friday") ||
        lowerInput.includes("saturday") ||
        lowerInput.includes("sunday") ||
        /\d{1,2}:\d{2}/.test(lowerInput) ||
        lowerInput.includes("aug") ||
        lowerInput.includes("august") ||
        /\d{1,2}/.test(lowerInput))
    ) {
      const availableDoctors = getAvailableDoctors();
      setFilteredDoctors(availableDoctors);

      setTimeout(() => {
        const selectDoctorResponse: ChatMessage = {
          id: chatMessages.length + 2,
          type: "ai",
          message: `I understand you'd like to book an appointment. Please select a doctor from our available specialists below, and then you can choose your preferred date and time:`,
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, selectDoctorResponse]);
        setShowDoctorsList(true);
      }, 1000);

      setUserInput("");
      return;
    }

    // If doctors are already shown, provide continued chat support
    if (showDoctorsList) {
      // Show loading state
      const loadingMessage: ChatMessage = {
        id: chatMessages.length + 2,
        type: "ai",
        message:
          "🤔 Let me analyze your question and provide detailed guidance...",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, loadingMessage]);

      setTimeout(async () => {
        try {
          const healthAdvice = await getHealthAdvice(userInput);
          const continuedChatResponse: ChatMessage = {
            id: chatMessages.length + 2,
            type: "ai",
            message: `I understand you'd like to continue our conversation. Based on your question about "${userInput}", here's detailed health guidance:

${healthAdvice}

**💡 Additional Resources:**
This information is based on current medical research and evidence-based practices. For more comprehensive health information, consider visiting reputable sources like Mayo Clinic, Harvard Health, or WebMD.

**⚠️ Important Reminder:** This guidance is for educational purposes and should not replace professional medical advice. If your symptoms persist, worsen, or you have specific concerns, please consult with one of the specialists shown above or your primary care physician.

Is there anything specific about your health concerns you'd like me explanation further?`,
            timestamp: new Date(),
          };
          // Replace the loading message with the actual response
          setChatMessages((prev) => [
            ...prev.slice(0, -1),
            continuedChatResponse,
          ]);
        } catch (error) {
          console.error("Error getting health advice:", error);
          const errorResponse: ChatMessage = {
            id: chatMessages.length + 2,
            type: "ai",
            message:
              "I apologize, but I'm having trouble processing your request right now. Please try again or consult with one of the available doctors.",
            timestamp: new Date(),
          };
          setChatMessages((prev) => [...prev.slice(0, -1), errorResponse]);
        }
      }, 1000);
    } else {
      // Check if user wants to see doctors after symptom analysis
      const wantsToDoctors =
        userInput.toLowerCase().includes("see doctors") ||
        userInput.toLowerCase().includes("show doctors") ||
        userInput.toLowerCase().includes("available doctors") ||
        userInput.toLowerCase().includes("book appointment") ||
        userInput.toLowerCase().includes("appointment") ||
        userInput.toLowerCase().includes("1") ||
        userInput.toLowerCase().includes("option 1") ||
        userInput.toLowerCase().includes("first option") ||
        (userInput.toLowerCase().includes("doctor") &&
          !userInput.toLowerCase().includes("advice"));

      // Check if user wants health advice
      const wantsHealthAdvice =
        userInput.toLowerCase().includes("health advice") ||
        userInput.toLowerCase().includes("get advice") ||
        userInput.toLowerCase().includes("guidance") ||
        userInput.toLowerCase().includes("2") ||
        userInput.toLowerCase().includes("option 2") ||
        userInput.toLowerCase().includes("second option") ||
        userInput.toLowerCase().includes("advice first");

      if (wantsToDoctors && filteredDoctors.length > 0) {
        // User wants to see doctors - show the doctors list
        setTimeout(() => {
          const doctorsResponse: ChatMessage = {
            id: chatMessages.length + 2,
            type: "ai",
            message: `Perfect! Here are the available specialist doctors who can help with your symptoms. Please select a doctor below to book an appointment:`,
            timestamp: new Date(),
          };
          setChatMessages((prev) => [...prev, doctorsResponse]);
          setShowDoctorsList(true);
        }, 1000);
      } else if (wantsHealthAdvice) {
        // User wants health advice
        setTimeout(async () => {
          try {
            const previousSymptoms = bookingData.symptoms || userInput;
            const healthAdvice = await getHealthAdvice(previousSymptoms);

            const healthAdviceResponse: ChatMessage = {
              id: chatMessages.length + 2,
              type: "ai",
              message: `I'd be happy to provide you with health guidance! Here's detailed information:

${healthAdvice}

**💡 Additional Resources:**
This information is based on current medical research and evidence-based practices. For more comprehensive health information, consider visiting reputable sources like Mayo Clinic, Harvard Health, or WebMD.

**⚠️ Important Reminder:** This guidance is for educational purposes and should not replace professional medical advice. If your symptoms persist, worsen, or you have specific concerns, please consider booking an appointment with one of our specialist doctors.

Would you like to see the available doctors now, or do you have any other health questions?`,
              timestamp: new Date(),
            };
            setChatMessages((prev) => [...prev, healthAdviceResponse]);
          } catch (error) {
            console.error("Error getting AI health advice:", error);

            // Fallback message if AI fails
            const fallbackResponse: ChatMessage = {
              id: chatMessages.length + 2,
              type: "ai",
              message: `I'd be happy to provide you with health guidance! However, I'm currently experiencing technical difficulties with my AI service.

Here's some general health advice for your symptoms:

• Monitor your symptoms and note any changes
• Stay hydrated and get adequate rest
• Apply appropriate first aid if needed (ice for injuries, heat for muscle tension)
• Contact your healthcare provider if symptoms persist or worsen
• Seek immediate medical attention for severe or emergency symptoms

**⚠️ Important:** This is general information only. Please consult with a qualified healthcare professional for personalized medical advice.

Would you like to see the available doctors for a proper consultation?`,
              timestamp: new Date(),
            };
            setChatMessages((prev) => [...prev, fallbackResponse]);
          }
        }, 1000);
      } else {
        // Check if input is too short or nonsensical
        const isNonsensicalInput =
          userInput.trim().length <= 2 || // Very short inputs like "f", "hi", etc.
          /^[a-zA-Z]$/.test(userInput.trim()) || // Single letters
          /^[^a-zA-Z\s]*$/.test(userInput.trim()) || // Only symbols/numbers
          (/^[a-zA-Z]{1,8}$/.test(userInput.trim()) &&
            !/^(help|pain|hurt|sick|fever|cough|tired|dizzy|nausea|ache|stress|anxiety|advice|guidance|question|chat|talk|symptoms?|headache|cold|flu|doctor|appointment|book|schedule)$/i.test(
              userInput.trim()
            )) || // Random letter combinations
          userInput.trim().toLowerCase() === "test" ||
          userInput.trim().toLowerCase() === "hello" ||
          userInput.trim().toLowerCase() === "hi" ||
          userInput.trim().toLowerCase() === "hey" ||
          (/^[a-z]{3,}[a-z]*$/.test(userInput.trim().toLowerCase()) &&
            !userInput.toLowerCase().includes(" ") &&
            !/^(help|pain|hurt|sick|fever|cough|tired|dizzy|nausea|ache|stress|anxiety|advice|guidance|question|chat|talk|symptoms?|headache|cold|flu|doctor|appointment|book|schedule|chest|back|stomach|throat|breathing|allergy|rash|skin|tooth|dental|bone|joint|kidney|heart|lung|brain|eye|ear|nose|mouth|neck|shoulder|knee|hip|ankle|wrist|finger|toe)$/i.test(
              userInput.trim()
            ));

        // Check if user is asking for health advice without symptoms
        const isHealthAdviceRequest =
          userInput.toLowerCase().includes("advice") ||
          userInput.toLowerCase().includes("guidance") ||
          userInput.toLowerCase().includes("help") ||
          userInput.toLowerCase().includes("question") ||
          userInput.toLowerCase().includes("chat") ||
          userInput.toLowerCase().includes("talk") ||
          userInput.toLowerCase().includes("2") ||
          userInput.toLowerCase().includes("option 2") ||
          userInput.toLowerCase().includes("second option");

        // Check if user has provided actual symptoms
        const hasSymptoms =
          userInput.toLowerCase().includes("pain") ||
          userInput.toLowerCase().includes("hurt") ||
          userInput.toLowerCase().includes("fever") ||
          userInput.toLowerCase().includes("headache") ||
          userInput.toLowerCase().includes("cough") ||
          userInput.toLowerCase().includes("nausea") ||
          userInput.toLowerCase().includes("tired") ||
          userInput.toLowerCase().includes("dizzy") ||
          userInput.toLowerCase().includes("sick") ||
          userInput.toLowerCase().includes("ache") ||
          userInput.toLowerCase().includes("symptom") ||
          userInput.trim().length > 50; // Longer messages likely contain symptoms

        if (isNonsensicalInput) {
          // Handle unclear or nonsensical input
          setTimeout(() => {
            const clarificationResponse: ChatMessage = {
              id: chatMessages.length + 2,
              type: "ai",
              message: `I'm sorry, I don't understand what you're trying to say. Could you please clarify?

I'm here to help you with:

• **Health symptoms** you're experiencing
• **Medical questions** you have
• **Finding and booking** appointments with specialist doctors

Please describe your symptoms or health concerns in more detail, or let me know how I can assist you today.

For example, you could say:
- "I have a headache that won't go away"
- "I need help with chest pain"
- "I want to book an appointment with a cardiologist"
- "I have questions about managing stress"`,
              timestamp: new Date(),
            };
            setChatMessages((prev) => [...prev, clarificationResponse]);
          }, 1000);
        } else if (isHealthAdviceRequest && !hasSymptoms) {
          // User wants health advice but hasn't shared symptoms yet
          setTimeout(() => {
            const adviceResponse: ChatMessage = {
              id: chatMessages.length + 2,
              type: "ai",
              message: `I'd be happy to provide you with health guidance and answer your questions! 

Please share your symptoms, health concerns, or any specific questions you have. You can describe:

• **Physical symptoms** you're experiencing (pain, discomfort, unusual changes)
• **Health questions** you'd like answered
• **Wellness topics** you want to learn about
• **Preventive care** information you need

The more details you provide, the better I can assist you with personalized health guidance and information.

What would you like to discuss about your health today?`,
              timestamp: new Date(),
            };
            setChatMessages((prev) => [...prev, adviceResponse]);
          }, 1000);
        } else {
          // User has provided symptoms or detailed health concerns
          const relevantDoctors = analyzeSymptoms(userInput);
          setFilteredDoctors(relevantDoctors);

          // Show loading state
          const loadingMessage: ChatMessage = {
            id: chatMessages.length + 2,
            type: "ai",
            message:
              "🤔 Analyzing your symptoms and preparing personalized health guidance...",
            timestamp: new Date(),
          };
          setChatMessages((prev) => [...prev, loadingMessage]);

          // Automatically provide AI-powered health advice first
          setTimeout(async () => {
            try {
              // Get AI-powered health advice
              const healthAdvice = await getHealthAdvice(userInput);

              const aiResponse: ChatMessage = {
                id: chatMessages.length + 2,
                type: "ai",
                message: `${healthAdvice}

---

**Would you also like to see specialist doctors?**

I've found ${relevantDoctors.length} specialist doctors who can help with your symptoms. You can:

1. 🩺 **See available doctors** and book an appointment
2. 💬 **Continue our conversation** for more health guidance

Just let me know what you'd prefer!`,
                timestamp: new Date(),
              };

              // Replace the loading message with the actual response
              setChatMessages((prev) => [...prev.slice(0, -1), aiResponse]);
              setBookingData((prev) => ({ ...prev, symptoms: userInput }));
            } catch (error) {
              console.error("Error getting AI health advice:", error);

              // Fallback to original behavior if AI fails
              const aiResponse: ChatMessage = {
                id: chatMessages.length + 2,
                type: "ai",
                message: `Thank you for sharing your symptoms. Based on what you've described, I've found ${relevantDoctors.length} specialist doctors who can help you.

Would you like to:

1. 🩺 **See the available doctors** and book an appointment
2. 💬 **Get health advice** and guidance for your symptoms first

Please let me know which option you prefer, or feel free to ask me any health-related questions!`,
                timestamp: new Date(),
              };

              setChatMessages((prev) => [...prev.slice(0, -1), aiResponse]);
              setBookingData((prev) => ({ ...prev, symptoms: userInput }));
            }
          }, 1500);
        }
      }
    }
    setUserInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDoctorSelect = (doctor: DoctorWithAvailability) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true);

    // Auto-fill booking data if user mentioned specific time in their request
    const lastUserMessage =
      chatMessages[chatMessages.length - 1]?.message?.toLowerCase() || "";

    // Check for 9 AM request
    if (lastUserMessage.includes("9am") || lastUserMessage.includes("9 am")) {
      setBookingData((prev) => ({
        ...prev,
        selectedTime: "9:00",
      }));
    }

    // Check for August 13th request
    if (
      lastUserMessage.includes("aug 13") ||
      lastUserMessage.includes("august 13") ||
      lastUserMessage.includes("wednesday")
    ) {
      const aug13Date = new Date(2025, 7, 13); // August 13, 2025
      const dateString = aug13Date.toISOString().split("T")[0];
      setBookingData((prev) => ({
        ...prev,
        selectedDate: dateString,
      }));
    }

    // Check for August 12th request
    if (
      lastUserMessage.includes("aug 12") ||
      lastUserMessage.includes("august 12") ||
      lastUserMessage.includes("12 august") ||
      lastUserMessage.includes("tuesday")
    ) {
      const aug12Date = new Date(2025, 7, 12); // August 12, 2025
      const dateString = aug12Date.toISOString().split("T")[0];
      setBookingData((prev) => ({
        ...prev,
        selectedDate: dateString,
      }));
    }

    // Add AI message about booking
    setTimeout(() => {
      // Clean up the doctor name to avoid "Dr. Dr." issue
      const cleanDoctorName = doctor.name.replace(/^dr\.?\s*/i, "");
      const bookingMessage: ChatMessage = {
        id: chatMessages.length + 3,
        type: "ai",
        message: `Great choice! Dr. ${cleanDoctorName} is an excellent ${doctor.specialty} specialist. Please fill out the booking form below to schedule your appointment.`,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, bookingMessage]);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingData.selectedDate || !bookingData.selectedTime) {
      alert("Please select both date and time for your appointment.");
      return;
    }

    // Handle form submission here
    console.log("Consultation booking:", {
      doctor: selectedDoctor,
      booking: bookingData,
    });

    alert(
      `Appointment booked with ${selectedDoctor?.name} on ${bookingData.selectedDate} at ${bookingData.selectedTime} for ${bookingData.appointmentType}!`
    );

    // Close dialog after submission
    onClose();
    // Reset form
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
    setChatMessages([
      {
        id: 1,
        type: "ai",
        message:
          "Hello! I'm your AI health assistant. I can help you in two ways:\n\n1. 🩺 Find and book appointments with specialist doctors\n2. 💬 Provide health guidance and answer your questions\n\nPlease describe your symptoms or health concerns, and I'll assist you accordingly!",
        timestamp: new Date(),
      },
    ]);
  };

  if (!isOpen) return null;

  const renderChatStep = () => (
    <div className="h-96 flex flex-col">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {chatMessages.map((message) => (
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
                backgroundColor:
                  message.type === "user" ? "#5B73FF" : "#f3f4f6",
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
                            part
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

        {/* Inline Doctors List */}
        {showDoctorsList && filteredDoctors.length > 0 && (
          <div className="space-y-3">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Available Doctors
              </h3>
            </div>
            <div className="grid gap-3">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-all duration-300 cursor-pointer hover:shadow-md"
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium">
                        {doctor.specialty}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600 ml-1">
                            {doctor.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {doctor.experience}
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          ${doctor.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inline Booking Form */}
        {showBookingForm && selectedDoctor && (
          <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Book Appointment
              </h3>
            </div>

            {/* Doctor Info */}
            <div
              className="flex items-center gap-4 p-4 rounded-2xl"
              style={{ backgroundColor: "rgba(91, 115, 255, 0.05)" }}
            >
              <img
                src={selectedDoctor?.image}
                alt={selectedDoctor?.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <div className="font-semibold" style={{ color: "#5B73FF" }}>
                  {selectedDoctor?.name}
                </div>
                <div className="text-sm" style={{ color: "#6b7280" }}>
                  {selectedDoctor?.specialty}
                </div>
              </div>
            </div>

            {/* Appointment Type */}
            <div>
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: "#6b7280" }}
              >
                Appointment Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["consultation", "follow-up", "check-up", "urgent"].map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() =>
                        setBookingData((prev) => ({
                          ...prev,
                          appointmentType: type,
                        }))
                      }
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 capitalize ${
                        bookingData.appointmentType === type ? "shadow-md" : ""
                      }`}
                      style={{
                        backgroundColor:
                          bookingData.appointmentType === type
                            ? "#5B73FF"
                            : "rgba(91, 115, 255, 0.1)",
                        color:
                          bookingData.appointmentType === type
                            ? "white"
                            : "#5B73FF",
                      }}
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: "#6b7280" }}
              >
                Select Date
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {generateAvailableDates().map((date) => (
                  <button
                    key={date.value}
                    onClick={() =>
                      setBookingData((prev) => ({
                        ...prev,
                        selectedDate: date.value,
                      }))
                    }
                    className={`p-3 rounded-xl text-xs font-medium transition-all duration-300 ${
                      bookingData.selectedDate === date.value ? "shadow-md" : ""
                    }`}
                    style={{
                      backgroundColor:
                        bookingData.selectedDate === date.value
                          ? "#5B73FF"
                          : "rgba(91, 115, 255, 0.1)",
                      color:
                        bookingData.selectedDate === date.value
                          ? "white"
                          : "#5B73FF",
                    }}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: "#6b7280" }}
              >
                Select Time
              </label>
              <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                {generateTimeSlots().map((slot) => (
                  <button
                    key={slot.value}
                    onClick={() =>
                      setBookingData((prev) => ({
                        ...prev,
                        selectedTime: slot.value,
                      }))
                    }
                    className={`p-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                      bookingData.selectedTime === slot.value ? "shadow-md" : ""
                    }`}
                    style={{
                      backgroundColor:
                        bookingData.selectedTime === slot.value
                          ? "#5B73FF"
                          : "rgba(91, 115, 255, 0.1)",
                      color:
                        bookingData.selectedTime === slot.value
                          ? "white"
                          : "#5B73FF",
                    }}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4
                className="text-sm font-semibold"
                style={{ color: "#6b7280" }}
              >
                Contact Information
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={bookingData.fullName}
                    onChange={(e) =>
                      setBookingData((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border transition-colors"
                    style={{ borderColor: "rgba(229, 231, 235, 0.5)" }}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={bookingData.email}
                    onChange={(e) =>
                      setBookingData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border transition-colors"
                    style={{ borderColor: "rgba(229, 231, 235, 0.5)" }}
                  />
                </div>
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={bookingData.phone}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl border transition-colors"
                  style={{ borderColor: "rgba(229, 231, 235, 0.5)" }}
                />
              </div>
            </div>

            {/* Booking Summary */}
            {bookingData.selectedDate && bookingData.selectedTime && (
              <div
                className="p-4 rounded-2xl"
                style={{ backgroundColor: "rgba(0, 176, 116, 0.1)" }}
              >
                <h4 className="font-semibold mb-2" style={{ color: "#00B074" }}>
                  Appointment Summary
                </h4>
                <div className="text-sm space-y-1" style={{ color: "#6b7280" }}>
                  <div>
                    Date:{" "}
                    {
                      generateAvailableDates().find(
                        (d) => d.value === bookingData.selectedDate
                      )?.label
                    }
                  </div>
                  <div>
                    Time:{" "}
                    {
                      generateTimeSlots().find(
                        (t) => t.value === bookingData.selectedTime
                      )?.label
                    }
                  </div>
                  <div>Type: {bookingData.appointmentType}</div>
                  <div>Fee: ${selectedDoctor?.price}</div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="w-full py-3 px-4 rounded-2xl font-semibold transition-all duration-300 text-white"
                style={{ backgroundColor: "#5B73FF" }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe your symptoms or health concerns..."
          className="flex-1 px-4 py-3 rounded-xl border border-ds-gray/30 focus:border-ds-primary-blue focus:outline-none transition-colors"
        />
        <button
          onClick={handleSendMessage}
          className="px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300"
          style={{ backgroundColor: "#5B73FF" }}
        >
          Send
        </button>
      </div>
    </div>
  );

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

          {/* Content based on current step */}
          {renderChatStep()}
        </div>
      </div>
    </div>
  );
}
