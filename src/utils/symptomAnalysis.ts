import type { DoctorWithAvailability } from "./consultationUtils";
import { getAvailableDoctors } from "./consultationUtils";

// Symptom analysis logic separated from main component
export const analyzeSymptoms = (symptoms: string): DoctorWithAvailability[] => {
  const symptomsLower = symptoms.toLowerCase();
  const availableDoctors = getAvailableDoctors();

  // Cardiology keywords
  const cardiologyKeywords = [
    "chest pain",
    "heart",
    "cardiac",
    "cardio",
    "blood pressure",
    "hypertension",
    "palpitations",
    "arrhythmia",
    "cardiovascular",
    "cholesterol",
    "coronary",
    "angina",
    "cardiologist",
  ];

  // Dermatology keywords
  const dermatologyKeywords = [
    "skin",
    "rash",
    "acne",
    "dermatology",
    "dermatologist",
    "eczema",
    "psoriasis",
    "mole",
    "pigmentation",
    "dermatitis",
    "allergy",
    "itching",
    "hives",
    "wrinkles",
    "aging",
    "spots",
  ];

  // Neurology keywords
  const neurologyKeywords = [
    "headache",
    "neurological",
    "migraine",
    "neurology",
    "neurologist",
    "seizure",
    "epilepsy",
    "stroke",
    "paralysis",
    "numbness",
    "tingling",
    "memory loss",
    "confusion",
    "dizziness",
    "vertigo",
    "tremor",
    "parkinson",
    "alzheimer",
  ];

  // Pediatrics keywords
  const pediatricsKeywords = [
    "child",
    "kid",
    "pediatric",
    "pediatrics",
    "pediatrician",
    "baby",
    "infant",
    "toddler",
    "adolescent",
    "teenager",
    "vaccination",
    "vaccine",
    "growth",
    "development",
    "fever in child",
  ];

  // Dentistry keywords
  const dentistryKeywords = [
    "tooth",
    "dental",
    "teeth",
    "dentist",
    "dentistry",
    "cavity",
    "gum",
    "oral",
    "toothache",
    "tooth ache",
    "tooth pain",
    "bleeding gums",
    "gingivitis",
    "periodontitis",
    "crown",
    "filling",
    "extraction",
    "root canal",
    "braces",
    "orthodontic",
    "jaw pain",
    "bad breath",
    "mouth",
  ];

  // Orthopedics keywords
  const orthopedicsKeywords = [
    "bone",
    "joint",
    "fracture",
    "orthopedic",
    "orthopedics",
    "orthopedist",
    "arthritis",
    "back pain",
    "neck pain",
    "shoulder pain",
    "knee pain",
    "hip pain",
    "ankle pain",
    "spine",
    "spinal",
    "ligament",
    "tendon",
    "muscle strain",
    "sports injury",
    "broken bone",
  ];

  // Nephrology keywords
  const nephrologyKeywords = [
    "kidney",
    "urine",
    "nephrology",
    "nephrologist",
    "urinary",
    "bladder",
    "dialysis",
    "kidney stones",
    "blood in urine",
    "frequent urination",
    "kidney disease",
    "renal",
    "proteinuria",
    "creatinine",
    "hypertension kidney",
  ];

  // Pulmonology keywords
  const pulmonologyKeywords = [
    "lung",
    "breathing",
    "cough",
    "pulmonology",
    "pulmonologist",
    "asthma",
    "bronchitis",
    "pneumonia",
    "shortness of breath",
    "wheezing",
    "chest congestion",
    "respiratory",
    "copd",
    "tuberculosis",
    "sleep apnea",
    "oxygen",
    "airways",
  ];

  // Gynecology keywords
  const gynecologyKeywords = [
    "women",
    "pregnancy",
    "menstrual",
    "gynecology",
    "gynecologist",
    "period",
    "menstruation",
    "pcos",
    "endometriosis",
    "ovarian",
    "uterine",
    "cervical",
    "pap smear",
    "contraception",
    "fertility",
    "menopause",
    "vaginal",
    "breast",
    "prenatal",
    "postpartum",
  ];

  // Check each specialty
  if (cardiologyKeywords.some((keyword) => symptomsLower.includes(keyword))) {
    return availableDoctors.filter((d) => d.specialty === "Cardiology");
  }

  if (dermatologyKeywords.some((keyword) => symptomsLower.includes(keyword))) {
    return availableDoctors.filter((d) => d.specialty === "Dermatology");
  }

  if (neurologyKeywords.some((keyword) => symptomsLower.includes(keyword))) {
    return availableDoctors.filter((d) => d.specialty === "Neurology");
  }

  if (pediatricsKeywords.some((keyword) => symptomsLower.includes(keyword))) {
    return availableDoctors.filter((d) => d.specialty === "Pediatrics");
  }

  if (dentistryKeywords.some((keyword) => symptomsLower.includes(keyword))) {
    return availableDoctors.filter((d) => d.specialty === "Dentistry");
  }

  if (orthopedicsKeywords.some((keyword) => symptomsLower.includes(keyword))) {
    return availableDoctors.filter((d) => d.specialty === "Orthopedics");
  }

  if (nephrologyKeywords.some((keyword) => symptomsLower.includes(keyword))) {
    return availableDoctors.filter((d) => d.specialty === "Nephrology");
  }

  if (pulmonologyKeywords.some((keyword) => symptomsLower.includes(keyword))) {
    return availableDoctors.filter((d) => d.specialty === "Pulmonology");
  }

  if (gynecologyKeywords.some((keyword) => symptomsLower.includes(keyword))) {
    return availableDoctors.filter((d) => d.specialty === "Gynecology");
  }

  // Default: return diverse mix of specialists
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
};
