import { useState } from "react";
import { doctors, type Doctor } from "../data/doctors";

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

      dates.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
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
  const getAvailableDoctors = (): DoctorWithAvailability[] => {
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

  const getHealthAdvice = (userQuery: string): string => {
    const queryLower = userQuery.toLowerCase();

    // Analyze specific symptoms and provide targeted advice
    if (
      queryLower.includes("chest pain") ||
      queryLower.includes("heart pain")
    ) {
      return `🫀 **Chest Pain Assessment & Guidance**

**Your Symptoms:** Chest pain can have various causes, from muscle strain to cardiac issues.

**Immediate Actions:**
• Stop any physical activity and rest
• Sit upright or in a comfortable position
• Loosen tight clothing around chest/neck
• Take slow, deep breaths
• If you have prescribed nitroglycerin, use as directed

**When to Seek Emergency Care (Call 911):**
• Crushing, squeezing, or pressure-like chest pain
• Pain radiating to arm, jaw, neck, or back
• Shortness of breath or difficulty breathing
• Nausea, sweating, or dizziness with chest pain
• Pain lasting more than 5 minutes

**Possible Non-Emergency Causes:**
• Muscle strain from exercise or lifting
• Acid reflux or heartburn
• Anxiety or stress
• Costochondritis (chest wall inflammation)

**Self-Care for Minor Chest Pain:**
• Apply heat or cold to the area
• Over-the-counter anti-inflammatory medication
• Gentle stretching
• Avoid triggers like spicy foods if heartburn-related

**Follow-up Needed:** Any chest pain should be evaluated by a healthcare provider to rule out serious conditions.`;
    } else if (
      queryLower.includes("headache") &&
      (queryLower.includes("severe") || queryLower.includes("worst"))
    ) {
      return `🤕 **Severe Headache Management**

**Your Symptoms:** Severe headaches require immediate attention and proper assessment.

**Red Flag Symptoms - Seek Emergency Care If:**
• "Worst headache of your life"
• Sudden onset of severe headache
• Headache with fever and stiff neck
• Headache after head injury
• Vision changes or confusion
• Weakness or numbness

**Immediate Relief for Severe Headache:**
• Find a dark, quiet room
• Apply cold compress to forehead/temples
• Apply warm compress to neck/shoulders
• Stay hydrated - drink water slowly
• Try to sleep if possible

**Medication Approach:**
• Take pain relievers as directed (don't exceed recommended dose)
• Avoid mixing different pain medications
• Keep a headache diary to track triggers

**Common Severe Headache Triggers:**
• Dehydration or skipped meals
• Stress or lack of sleep
• Weather changes
• Certain foods (aged cheese, wine, chocolate)
• Hormonal changes

**Professional Care Needed:** Severe or recurring headaches should be evaluated to determine the underlying cause and develop an appropriate treatment plan.`;
    } else if (
      queryLower.includes("back pain") ||
      queryLower.includes("lower back")
    ) {
      return `🦴 **Back Pain Relief & Management**

**Your Symptoms:** Back pain is very common and can often be managed with proper care.

**Immediate Relief Strategies:**
• Rest in a comfortable position (lying on your side with knees bent)
• Apply ice for first 24-48 hours if injury-related
• Switch to heat after initial inflammation subsides
• Gentle movement - avoid bed rest for extended periods
• Over-the-counter anti-inflammatory medication

**Safe Movement Tips:**
• Get up slowly and avoid sudden movements
• Use proper lifting technique (bend knees, not back)
• Sleep with pillow between knees if side sleeping
• Avoid activities that worsen the pain

**Gentle Exercises (when pain allows):**
• Knee-to-chest stretches
• Pelvic tilts
• Cat-cow stretches
• Walking (start with short distances)

**Red Flags - Seek Immediate Care:**
• Severe pain after injury or fall
• Numbness or tingling in legs
• Loss of bladder/bowel control
• Weakness in legs
• Fever with back pain

**Prevention Tips:**
• Maintain good posture
• Strengthen core muscles
• Use ergonomic workspace setup
• Regular gentle exercise
• Proper lifting techniques

**Timeline:** Most back pain improves within a few days to weeks with proper care.`;
    } else if (queryLower.includes("fever") && queryLower.includes("high")) {
      return `🌡️ **High Fever Management**

**Your Symptoms:** High fever requires careful monitoring and appropriate action.

**Temperature Guidelines:**
• Low-grade: 99-101°F (37.2-38.3°C)
• Moderate: 101-103°F (38.3-39.4°C)
• High: Above 103°F (39.4°C)

**Immediate Actions for High Fever:**
• Take temperature every 2-3 hours
• Increase fluid intake significantly
• Remove excess clothing/blankets
• Take lukewarm (not cold) bath or shower
• Use fever-reducing medication as directed

**Cooling Techniques:**
• Place cool, damp washcloths on forehead
• Use fan to circulate air
• Stay in cool environment
• Avoid alcohol-based cooling (can be dangerous)

**Seek Emergency Care If:**
• Temperature above 103°F (39.4°C)
• Difficulty breathing or chest pain
• Severe headache or stiff neck
• Persistent vomiting
• Signs of dehydration
• Confusion or difficulty staying awake

**Hydration is Critical:**
• Water, clear broths, electrolyte solutions
• Small, frequent sips if nauseous
• Monitor urine output (should be pale yellow)

**When to Call Doctor:**
• Fever persists more than 3 days
• Other concerning symptoms develop
• You have underlying health conditions

**Rest and Recovery:** Your body needs energy to fight infection - prioritize rest and sleep.`;
    } else if (
      queryLower.includes("cough") &&
      (queryLower.includes("blood") || queryLower.includes("persistent"))
    ) {
      return `🫁 **Concerning Cough Assessment**

**Your Symptoms:** A persistent cough or cough with blood requires medical evaluation.

**Seek Immediate Medical Care If:**
• Coughing up blood (any amount)
• Severe difficulty breathing
• Chest pain with coughing
• High fever with persistent cough
• Cough preventing sleep for multiple nights

**For Persistent Cough Management:**
• Stay well-hydrated (thins mucus)
• Use humidifier or breathe steam from shower
• Honey (1-2 teaspoons) for throat soothing
• Elevate head while sleeping
• Avoid irritants (smoke, strong odors)

**Types of Concerning Coughs:**
• Dry, persistent cough lasting >3 weeks
• Productive cough with thick, colored mucus
• Whooping or barking cough
• Cough that worsens over time

**Track Your Symptoms:**
• Duration and timing of cough
• What triggers or relieves it
• Any associated symptoms (fever, shortness of breath)
• Medications or treatments tried

**Avoid These:**
• Smoking or secondhand smoke
• Cold air exposure
• Talking excessively
• Throat clearing (can worsen irritation)

**Professional Evaluation Needed:** Persistent or concerning coughs require proper diagnosis to identify underlying causes and appropriate treatment.`;
    } else if (
      queryLower.includes("shortness of breath") ||
      queryLower.includes("breathing")
    ) {
      return `🫁 **Breathing Difficulty Management**

**Your Symptoms:** Breathing problems can range from mild to serious and need proper assessment.

**Seek Emergency Care Immediately If:**
• Severe difficulty breathing or gasping
• Blue lips, fingernails, or face
• Chest pain with breathing difficulty
• Cannot speak in full sentences due to breathlessness
• Sudden onset of severe breathing problems

**Immediate Comfort Measures:**
• Sit upright or lean slightly forward
• Loosen tight clothing around neck/chest
• Use pursed-lip breathing (inhale through nose, exhale slowly through pursed lips)
• Stay calm and try to slow your breathing
• Ensure good air circulation

**Breathing Techniques:**
• 4-7-8 breathing: Inhale 4 counts, hold 7, exhale 8
• Diaphragmatic breathing: Hand on chest, hand on belly, breathe so belly moves more
• Box breathing: Inhale 4, hold 4, exhale 4, hold 4

**Common Causes to Consider:**
• Asthma or allergies
• Anxiety or panic attacks
• Physical exertion beyond fitness level
• Environmental irritants
• Respiratory infections

**When to Call Healthcare Provider:**
• Gradual worsening of breathing over days
• Breathing problems with daily activities
• Wheezing or unusual breathing sounds
• Associated symptoms like fatigue or swelling

**Avoid:**
• Lying flat if it worsens breathing
• Strenuous activity until evaluated
• Known triggers or allergens

**Important:** Breathing difficulties should always be evaluated by a healthcare professional to determine the cause and appropriate treatment.`;
    } else if (
      queryLower.includes("nausea") ||
      queryLower.includes("vomiting")
    ) {
      return `🤢 **Nausea & Vomiting Relief**

**Your Symptoms:** Nausea and vomiting can be caused by various factors and usually improve with proper care.

**Immediate Relief Strategies:**
• Sip clear fluids slowly (water, clear broths, electrolyte solutions)
• Try small ice chips or popsicles
• Ginger tea or ginger ale (real ginger)
• Rest in a comfortable position
• Fresh air or cool cloth on forehead

**BRAT Diet When Ready to Eat:**
• Bananas, Rice, Applesauce, Toast
• Start with small amounts
• Gradually add bland foods
• Avoid dairy, fatty, or spicy foods initially

**Hydration Priority:**
• Small, frequent sips every 15-20 minutes
• Clear fluids: water, herbal tea, clear broths
• Electrolyte replacement if vomiting frequently
• Avoid large amounts at once

**Seek Medical Care If:**
• Unable to keep fluids down for 24 hours
• Signs of dehydration (dark urine, dizziness, dry mouth)
• Severe abdominal pain
• Blood in vomit
• High fever with vomiting
• Severe headache

**Natural Remedies:**
• Ginger (tea, capsules, or fresh)
• Peppermint tea or aromatherapy
• Acupressure point P6 (wrist)
• Small, frequent meals when appetite returns

**Rest and Recovery:**
• Avoid strong odors
• Stay in well-ventilated areas
• Get adequate rest
• Return to normal diet gradually

**Prevention:** Identify and avoid triggers when possible (certain foods, stress, motion).`;
    } else if (queryLower.includes("pain") || queryLower.includes("hurt")) {
      // For general pain, provide location-specific advice
      if (queryLower.includes("stomach") || queryLower.includes("abdominal")) {
        return `🩻 **Abdominal Pain Assessment**

**Your Symptoms:** Stomach/abdominal pain can have many causes requiring different approaches.

**Immediate Care:**
• Avoid eating until pain subsides
• Sip clear fluids slowly
• Rest in comfortable position
• Apply gentle heat to area (heating pad on low)

**Red Flags - Seek Emergency Care:**
• Severe, sudden abdominal pain
• Pain with fever and vomiting
• Rigid, hard abdomen
• Blood in stool or vomit
• Signs of dehydration

**Common Causes & Self-Care:**
• **Indigestion:** Small sips of water, avoid fatty foods
• **Gas:** Gentle movement, avoid gas-producing foods
• **Muscle strain:** Rest, gentle stretching
• **Menstrual cramps:** Heat, gentle exercise, adequate rest

**When to Call Healthcare Provider:**
• Pain persists beyond 24-48 hours
• Worsening pain over time
• Unable to keep fluids down
• Concerning associated symptoms`;
      } else if (
        queryLower.includes("joint") ||
        queryLower.includes("arthritis")
      ) {
        return `🦴 **Joint Pain Management**

**Your Symptoms:** Joint pain can significantly impact daily activities but often responds well to proper care.

**Immediate Relief:**
• Rest the affected joint
• Apply ice for acute pain/swelling (15-20 minutes)
• Apply heat for stiffness (warm bath, heating pad)
• Gentle range-of-motion exercises
• Over-the-counter anti-inflammatory medication

**Daily Management:**
• Low-impact exercise (swimming, walking)
• Maintain healthy weight
• Use ergonomic tools and supports
• Balance activity with rest periods

**Natural Anti-Inflammatory Approaches:**
• Turmeric and ginger supplements
• Omega-3 fatty acids (fish, flax seeds)
• Tart cherry juice
• Green tea
• Anti-inflammatory diet

**Warning Signs:**
• Sudden severe joint pain
• Joint deformity or inability to use
• Signs of infection (redness, warmth, fever)
• Severe morning stiffness lasting hours

**Long-term Care:**
• Regular gentle exercise
• Physical therapy exercises
• Stress management
• Adequate sleep for healing`;
      } else {
        return `⚡ **General Pain Relief Guide**

**Your Symptoms:** Pain signals that something needs attention - let's address it properly.

**Immediate Pain Relief:**
• Rest the affected area
• Ice for acute injuries (first 24-48 hours)
• Heat for muscle tension and chronic pain
• Over-the-counter pain relievers as directed
• Gentle movement when possible

**Pain Assessment:**
• Rate your pain 1-10 to track changes
• Note what makes it better or worse
• Track timing and duration
• Identify any triggering activities

**Natural Pain Management:**
• Deep breathing and relaxation
• Gentle stretching or yoga
• Meditation or mindfulness
• Adequate sleep for healing
• Stay hydrated

**Seek Medical Care If:**
• Severe pain (7+ out of 10)
• Pain persists beyond expected healing time
• Signs of infection or serious injury
• Pain interferes with daily activities
• New or unusual pain patterns

**Recovery Support:**
• Gradual return to activities
• Listen to your body's signals
• Maintain good nutrition for healing
• Consider physical therapy if needed`;
      }
    } else if (
      queryLower.includes("anxiety") ||
      queryLower.includes("stress") ||
      queryLower.includes("panic")
    ) {
      return `🧘 **Anxiety & Stress Response Plan**

**Your Symptoms:** Anxiety and stress are your body's response to perceived threats - you can learn to manage them effectively.

**Immediate Calming Techniques:**
• 4-7-8 Breathing: Inhale 4, hold 7, exhale 8 (repeat 4 times)
• 5-4-3-2-1 Grounding: Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste
• Progressive muscle relaxation
• Cold water on wrists/face
• Step outside for fresh air

**Physical Symptoms Management:**
• Racing heart: Slow, deep breathing
• Muscle tension: Gentle stretching
• Nausea: Sip water slowly, try ginger
• Dizziness: Sit down, breathe slowly
• Sweating: Cool environment, breathe deeply

**Daily Anxiety Reduction:**
• Regular exercise (even 10-minute walks)
• Limit caffeine, especially afternoon
• Maintain consistent sleep schedule
• Practice mindfulness or meditation
• Stay connected with supportive people

**Emergency Strategies for Panic:**
• Remind yourself: "This will pass"
• Focus on slow, controlled breathing
• Use a calm, soothing voice (internal or external)
• Find a safe, quiet space
• Call a trusted friend or family member

**Seek Professional Help If:**
• Anxiety interferes with daily life
• Physical symptoms are severe
• You avoid activities due to anxiety
• Sleep is significantly disrupted
• You have thoughts of self-harm

**Long-term Management:**
• Identify your triggers
• Develop coping strategies
• Consider therapy or counseling
• Build stress resilience through self-care`;
    } else if (
      queryLower.includes("insomnia") ||
      queryLower.includes("can't sleep") ||
      queryLower.includes("sleep trouble")
    ) {
      return `😴 **Sleep Difficulty Solutions**

**Your Symptoms:** Sleep problems are common and usually improve with the right approach.

**Tonight's Sleep Strategy:**
• Stop screen use 1 hour before bed
• Keep room cool (60-67°F), dark, and quiet
• Try progressive muscle relaxation
• Use deep breathing exercises
• If not asleep in 20 minutes, get up and do quiet activity until sleepy

**Common Sleep Disruptors & Solutions:**
• **Racing thoughts:** Write worries down, practice meditation
• **Physical discomfort:** Check pillow/mattress, try different position
• **Caffeine effects:** Avoid after 2 PM, try herbal tea instead
• **Stress/anxiety:** Use relaxation techniques, gentle stretching

**Sleep Hygiene Reset:**
• Same bedtime and wake time daily (even weekends)
• Morning sunlight exposure
• Regular exercise (but not 3 hours before bed)
• Limit naps to 20-30 minutes before 3 PM
• Create calming bedtime routine

**Natural Sleep Aids:**
• Chamomile tea 30 minutes before bed
• Magnesium supplement (consult healthcare provider first)
• Lavender aromatherapy
• White noise or nature sounds
• Warm bath before bed

**When to Seek Help:**
• Insomnia lasting more than 1 month
• Daytime fatigue affecting work/relationships
• Snoring with breathing interruptions
• Frequent night wakings
• Early morning awakening with inability to return to sleep

**Avoid These Sleep Saboteurs:**
• Large meals 3 hours before bed
• Alcohol (disrupts sleep quality)
• Intense exercise before bedtime
• Using bed for activities other than sleep`;
    } else if (
      queryLower.includes("tired") ||
      queryLower.includes("fatigue") ||
      queryLower.includes("exhausted")
    ) {
      return `😴 **Fatigue & Energy Recovery Plan**

**Your Symptoms:** Persistent fatigue can have many causes - let's address the most common ones.

**Energy Assessment:**
• Rate your energy 1-10 throughout the day
• Note when you feel most/least energetic
• Track sleep quality and duration
• Consider recent life changes or stressors

**Immediate Energy Boosters:**
• Take a 10-15 minute walk outside
• Drink a large glass of water
• Have a healthy snack with protein
• Do 5 minutes of deep breathing
• Get 10-15 minutes of sunlight

**Common Fatigue Causes & Solutions:**
• **Dehydration:** Aim for 8-10 glasses of water daily
• **Poor sleep:** Address sleep hygiene issues
• **Nutrient deficiency:** Eat balanced meals with iron, B12, vitamin D
• **Stress:** Practice stress management techniques
• **Sedentary lifestyle:** Add gentle movement throughout day

**Energy-Supporting Nutrition:**
• Complex carbohydrates for steady energy
• Lean proteins at each meal
• Iron-rich foods (leafy greens, lean meats)
• Limit sugar crashes with balanced meals
• Consider B-vitamin complex

**Red Flags - See Healthcare Provider:**
• Sudden, severe fatigue
• Fatigue lasting weeks despite good sleep
• Weakness or difficulty with daily tasks
• Fatigue with fever, weight loss, or other symptoms
• Depression or mood changes with fatigue

**Gradual Energy Building:**
• Start with 5-10 minutes of activity daily
• Gradually increase as energy improves
• Balance activity with adequate rest
• Prioritize sleep quality over quantity`;
    } else {
      return `🌟 **Personalized Health Guidance**

**Based on Your Concerns:** Every symptom is your body's way of communicating - let's listen and respond appropriately.

**General Assessment Steps:**
• Note when symptoms started and any triggers
• Rate severity on a scale of 1-10
• Track what makes symptoms better or worse
• Consider any recent changes in diet, exercise, stress, or medications

**Universal Health Support:**
• **Hydration:** 8-10 glasses of water daily
• **Rest:** Allow your body time to heal
• **Nutrition:** Focus on whole foods to support recovery
• **Gentle movement:** As tolerated, avoid complete rest unless necessary
• **Stress reduction:** Use relaxation techniques

**When to Seek Professional Care:**
• Symptoms worsen despite self-care
• New or unusual symptoms develop
• Symptoms interfere with daily activities
• You're concerned about any changes in your health
• Symptoms persist beyond expected timeline

**Self-Advocacy Tips:**
• Keep a symptom diary
• Prepare questions before appointments
• Don't hesitate to seek second opinions
• Trust your instincts about your body
• Ask for clarification if you don't understand

**Support Resources:**
• Trusted healthcare providers
• Reputable health websites (Mayo Clinic, WebMD)
• Support groups for specific conditions
• Mental health resources if needed

**Remember:** You know your body best - if something feels wrong, it's always appropriate to seek professional medical advice.`;
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: chatMessages.length + 1,
      type: "user",
      message: userInput,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);

    // If doctors are already shown, provide continued chat support
    if (showDoctorsList) {
      setTimeout(() => {
        const continuedChatResponse: ChatMessage = {
          id: chatMessages.length + 2,
          type: "ai",
          message: `I understand you'd like to continue our conversation. Based on your question about "${userInput}", here's detailed health guidance:

${getHealthAdvice(userInput)}

**💡 Additional Resources:**
This information is based on current medical research and evidence-based practices. For more comprehensive health information, consider visiting reputable sources like Mayo Clinic, Harvard Health, or WebMD.

**⚠️ Important Reminder:** This guidance is for educational purposes and should not replace professional medical advice. If your symptoms persist, worsen, or you have specific concerns, please consult with one of the specialists shown above or your primary care physician.

Is there anything specific about your health concerns you'd like me to explain further?`,
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, continuedChatResponse]);
      }, 1000);
    } else {
      // Initial symptom analysis and doctor filtering
      const relevantDoctors = analyzeSymptoms(userInput);
      setFilteredDoctors(relevantDoctors);

      // Generate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: chatMessages.length + 2,
          type: "ai",
          message: `Thank you for sharing your symptoms. Based on what you've described, I've found ${relevantDoctors.length} doctors who can help you. 

Would you like to:
1. Book an appointment with one of these specialists (shown below)
2. Continue chatting for health advice and guidance

Please select a doctor below if you'd like to book an appointment, or feel free to ask me any health-related questions!`,
          timestamp: new Date(),
        };

        setChatMessages((prev) => [...prev, aiResponse]);
        setBookingData((prev) => ({ ...prev, symptoms: userInput }));
        setShowDoctorsList(true);
      }, 1000);
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

    // Add AI message about booking
    setTimeout(() => {
      const bookingMessage: ChatMessage = {
        id: chatMessages.length + 3,
        type: "ai",
        message: `Great choice! Dr. ${doctor.name} is an excellent ${doctor.specialty} specialist. Please fill out the booking form below to schedule your appointment.`,
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
