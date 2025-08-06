import { doctors, type Doctor } from "../data/doctors";

export interface DoctorWithAvailability extends Doctor {
  availability: string;
}

// Specialty patterns for detection
export const SPECIALTY_PATTERNS = [
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

// Helper function to check if user is requesting doctors by specialty
export const checkForSpecialtyRequest = (input: string): string | null => {
  const lowerInput = input.toLowerCase();

  if (
    lowerInput.includes("show") ||
    lowerInput.includes("see") ||
    lowerInput.includes("find") ||
    lowerInput.includes("get")
  ) {
    for (const { pattern, specialty } of SPECIALTY_PATTERNS) {
      if (pattern.test(lowerInput)) {
        return specialty;
      }
    }
  }

  return null;
};

// Helper function to extract date from user input
export const extractDateFromInput = (input: string): string | null => {
  const lowerInput = input.toLowerCase();
  const currentYear = new Date().getFullYear();

  const datePatterns = [
    /(?:tuesday|monday|wednesday|thursday|friday|saturday|sunday)?\s*(\d{1,2})\s*(?:august|aug)/,
    /(?:august|aug)\s*(\d{1,2})/,
    /(\d{1,2})[/-]0?8/,
  ];

  for (const pattern of datePatterns) {
    const match = lowerInput.match(pattern);
    if (match) {
      const day = parseInt(match[1]);
      if (day >= 1 && day <= 31) {
        const dateString = `${currentYear}-08-${day
          .toString()
          .padStart(2, "0")}`;
        return dateString;
      }
    }
  }

  return null;
};

// Helper function to extract time from user input
export const extractTimeFromInput = (input: string): string | null => {
  const lowerInput = input.toLowerCase();

  const timePatterns = [
    /(\d{1,2})(?::(\d{2}))?\s*am/,
    /(\d{1,2})(?::(\d{2}))?\s*pm/,
    /(\d{1,2}):(\d{2})/,
  ];

  for (const pattern of timePatterns) {
    const match = lowerInput.match(pattern);
    if (match) {
      const hour = parseInt(match[1]);
      const minute = match[2] ? parseInt(match[2]) : 0;

      if (lowerInput.includes("pm") && hour !== 12) {
        return `${hour + 12}:${minute.toString().padStart(2, "0")}`;
      } else if (lowerInput.includes("am") && hour === 12) {
        return `0:${minute.toString().padStart(2, "0")}`;
      } else {
        return `${hour}:${minute.toString().padStart(2, "0")}`;
      }
    }
  }

  return null;
};

// Helper function to get available doctors
export const getAvailableDoctors = (): DoctorWithAvailability[] => {
  const availabilityOptions = [
    "Available today",
    "Available tomorrow",
    "Available in 2 days",
    "Available next week",
  ];

  return doctors.map((doctor, index) => ({
    ...doctor,
    availability: availabilityOptions[index % availabilityOptions.length],
  }));
};

// Helper function to find doctor by name with fuzzy matching
export const findDoctorByName = (
  input: string,
  availableDoctors: DoctorWithAvailability[]
): DoctorWithAvailability | null => {
  const lowerInput = input.toLowerCase();

  return (
    availableDoctors.find((doctor) => {
      const doctorNameLower = doctor.name.toLowerCase();
      const nameWithoutTitle = doctorNameLower.replace(/^dr\.?\s*/, "");
      const [firstName, lastName] = nameWithoutTitle.split(" ");
      const cleanInput = lowerInput.replace(/dr\.?\s*/g, "");

      return (
        lowerInput.includes(doctorNameLower) ||
        lowerInput.includes(nameWithoutTitle) ||
        cleanInput.includes(nameWithoutTitle) ||
        (firstName &&
          lastName &&
          lowerInput.includes(firstName) &&
          lowerInput.includes(lastName)) ||
        (firstName &&
          lastName &&
          cleanInput.includes(firstName) &&
          cleanInput.includes(lastName)) ||
        // Handle variations like "sarah thompson" vs "sarah thomson"
        (firstName &&
          lowerInput.includes(firstName) &&
          lastName &&
          (lowerInput.includes(lastName) ||
            cleanInput.includes(lastName) ||
            (lastName.includes("thompson") &&
              (lowerInput.includes("thomson") ||
                cleanInput.includes("thomson"))) ||
            (lastName.includes("thomson") &&
              (lowerInput.includes("thompson") ||
                cleanInput.includes("thompson")))))
      );
    }) || null
  );
};

// Generate available dates (next 14 days, excluding weekends for some specialties)
export const generateAvailableDates = (
  selectedDoctor?: DoctorWithAvailability
) => {
  const dates = [];
  const today = new Date();

  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    if (
      isWeekend &&
      selectedDoctor &&
      ["Cardiology", "Neurology"].includes(selectedDoctor.specialty)
    ) {
      continue;
    }

    const isAug13 = date.getMonth() === 7 && date.getDate() === 13;
    const isAug12 = date.getMonth() === 7 && date.getDate() === 12;
    const isRequestedDate = isAug13 || isAug12;

    dates.push({
      value: date.toISOString().split("T")[0],
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      isRequested: isRequestedDate,
    });
  }
  return dates;
};

// Generate available time slots
export const generateTimeSlots = (
  selectedDoctor?: DoctorWithAvailability
): { value: string; label: string }[] => {
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
