import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { doctors } from "../data/doctors";
import type { Doctor } from "../data/doctors";

export default function DoctorDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("consultation");
  const [showBookingForm, setShowBookingForm] = useState(false);

  const doctor = doctors.find((d) => d.id === Number(id)) as Doctor;

  if (!doctor) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-ds-dark-gray mb-4">
          Doctor Not Found
        </h1>
        <button
          onClick={() => navigate("/doctors")}
          className="px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
          style={{ backgroundColor: "#5B73FF", color: "white" }}
        >
          Back to Doctors
        </button>
      </div>
    );
  }

  // Generate available dates (next 14 days, excluding weekends for some specialties)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip weekends for certain specialties
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      if (isWeekend && ["Cardiology", "Neurology"].includes(doctor.specialty)) {
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
    const startHour = doctor.specialty === "Dentistry" ? 8 : 9;
    const endHour = doctor.specialty === "Cardiology" ? 18 : 17;

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

  const availableDates = generateAvailableDates();
  const timeSlots = generateTimeSlots();

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time for your appointment.");
      return;
    }

    // Here you would typically send the appointment data to your backend
    alert(
      `Appointment booked with ${doctor.name} on ${selectedDate} at ${selectedTime} for ${appointmentType}!`
    );
    setShowBookingForm(false);
    setSelectedDate("");
    setSelectedTime("");
  };

  const doctorDetails = {
    education: [
      "MD from Harvard Medical School",
      "Residency at Johns Hopkins Hospital",
      "Fellowship in " + doctor.specialty,
    ],
    certifications: [
      "Board Certified in " + doctor.specialty,
      "American Medical Association Member",
      "Licensed in Multiple States",
    ],
    languages: ["English", "Spanish", "French"],
    insuranceAccepted: [
      "Blue Cross Blue Shield",
      "Aetna",
      "Cigna",
      "Medicare",
      "Medicaid",
      "UnitedHealth",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ds-light-gray to-ds-bg-highlight">
      {/* Back Button */}
      <div className="container mx-auto px-6 pt-8">
        <button
          onClick={() => navigate("/doctors")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 mb-6"
          style={{
            color: "#5B73FF",
            backgroundColor: "rgba(91, 115, 255, 0.1)",
          }}
        >
          ← Back to Doctors
        </button>
      </div>

      {/* Doctor Profile Header */}
      <div className="container mx-auto px-6 pb-8">
        <div className="bg-card-gradient rounded-3xl shadow-modern border border-ds-gray/20 overflow-hidden">
          <div className="relative p-8">
            {/* Background decoration */}
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-20 translate-x-20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(91, 115, 255, 0.1) 0%, rgba(68, 92, 224, 0.05) 100%)",
              }}
            ></div>

            <div className="relative z-10 grid lg:grid-cols-3 gap-8">
              {/* Doctor Image and Basic Info */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-48 h-48 rounded-3xl object-cover shadow-modern ring-4 ring-white mx-auto"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.style.display = "flex";
                        }
                      }}
                    />
                    <div
                      className="hidden w-48 h-48 rounded-3xl items-center justify-center text-6xl mx-auto shadow-modern"
                      style={{ backgroundColor: "rgba(91, 115, 255, 0.1)" }}
                    >
                      👨‍⚕️
                    </div>

                    {/* Status Badge */}
                    <div
                      className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-semibold shadow-modern"
                      style={{ backgroundColor: "#00B074", color: "white" }}
                    >
                      ✓ Available
                    </div>
                  </div>

                  <h1
                    className="text-3xl font-bold mb-2"
                    style={{ color: "#5B73FF" }}
                  >
                    {doctor.name}
                  </h1>
                  <p className="text-xl text-ds-text-body mb-4 font-medium">
                    {doctor.specialty}
                  </p>

                  {/* Rating and Experience */}
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-yellow-400 text-lg">⭐</span>
                        <span className="font-bold text-lg">
                          {doctor.rating}
                        </span>
                      </div>
                      <div className="text-xs text-ds-text-body">Rating</div>
                    </div>
                    <div className="w-px h-8 bg-ds-gray/30"></div>
                    <div className="text-center">
                      <div
                        className="font-bold text-lg"
                        style={{ color: "#5B73FF" }}
                      >
                        {doctor.experience}
                      </div>
                      <div className="text-xs text-ds-text-body">Years Exp</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <span
                      className="text-3xl font-bold"
                      style={{ color: "#00B074" }}
                    >
                      ${doctor.price}
                    </span>
                    <span className="text-ds-text-body"> / consultation</span>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowBookingForm(true)}
                      className="w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-modern hover:shadow-modern-hover text-white"
                      style={{ backgroundColor: "#5B73FF" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#445CE0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#5B73FF";
                      }}
                    >
                      📅 Book Appointment
                    </button>
                    <button
                      className="w-full py-3 px-6 rounded-xl font-medium transition-all duration-300"
                      style={{
                        color: "#5B73FF",
                        backgroundColor: "rgba(91, 115, 255, 0.1)",
                      }}
                    >
                      💬 Send Message
                    </button>
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* About Section */}
                <div className="bg-white/70 p-6 rounded-2xl border border-ds-gray/20">
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "#5B73FF" }}
                  >
                    About Dr. {doctor.name.split(" ")[1]}
                  </h3>
                  <p className="text-ds-text-body leading-relaxed mb-4">
                    Dr. {doctor.name.split(" ")[1]} is a highly experienced{" "}
                    {doctor.specialty.toLowerCase()} specialist with{" "}
                    {doctor.experience} years of dedicated practice. Known for
                    providing compassionate, evidence-based care, Dr.{" "}
                    {doctor.name.split(" ")[1]} stays current with the latest
                    medical advances and treatment protocols.
                  </p>
                  <p className="text-ds-text-body leading-relaxed">
                    Patients appreciate the thorough approach to diagnosis and
                    treatment, combined with clear communication about medical
                    conditions and treatment options. Dr.{" "}
                    {doctor.name.split(" ")[1]}
                    believes in empowering patients through education and shared
                    decision-making.
                  </p>
                </div>

                {/* Education & Certifications */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/70 p-6 rounded-2xl border border-ds-gray/20">
                    <h4
                      className="text-lg font-bold mb-4"
                      style={{ color: "#5B73FF" }}
                    >
                      🎓 Education
                    </h4>
                    <ul className="space-y-2">
                      {doctorDetails.education.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-ds-text-body"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-2"
                            style={{ backgroundColor: "#5B73FF" }}
                          ></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/70 p-6 rounded-2xl border border-ds-gray/20">
                    <h4
                      className="text-lg font-bold mb-4"
                      style={{ color: "#5B73FF" }}
                    >
                      🏆 Certifications
                    </h4>
                    <ul className="space-y-2">
                      {doctorDetails.certifications.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-ds-text-body"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-2"
                            style={{ backgroundColor: "#00B074" }}
                          ></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Languages & Insurance */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/70 p-6 rounded-2xl border border-ds-gray/20">
                    <h4
                      className="text-lg font-bold mb-4"
                      style={{ color: "#5B73FF" }}
                    >
                      🌍 Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {doctorDetails.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: "rgba(91, 115, 255, 0.1)",
                            color: "#5B73FF",
                          }}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/70 p-6 rounded-2xl border border-ds-gray/20">
                    <h4
                      className="text-lg font-bold mb-4"
                      style={{ color: "#5B73FF" }}
                    >
                      🏥 Insurance Accepted
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-ds-text-body">
                      {doctorDetails.insuranceAccepted
                        .slice(0, 4)
                        .map((insurance, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: "#00B074" }}
                            ></div>
                            <span>{insurance}</span>
                          </div>
                        ))}
                    </div>
                    <div className="mt-2 text-xs" style={{ color: "#5B73FF" }}>
                      +{doctorDetails.insuranceAccepted.length - 4} more...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-modern max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: "#5B73FF" }}
                  >
                    Book Appointment
                  </h3>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                    style={{
                      backgroundColor: "rgba(91, 115, 255, 0.1)",
                      color: "#5B73FF",
                    }}
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Doctor Info */}
                  <div
                    className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{ backgroundColor: "rgba(91, 115, 255, 0.05)" }}
                  >
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <div
                        className="font-semibold"
                        style={{ color: "#5B73FF" }}
                      >
                        {doctor.name}
                      </div>
                      <div className="text-sm text-ds-text-body">
                        {doctor.specialty}
                      </div>
                    </div>
                  </div>

                  {/* Appointment Type */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-ds-text-body">
                      Appointment Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["consultation", "follow-up", "check-up", "urgent"].map(
                        (type) => (
                          <button
                            key={type}
                            onClick={() => setAppointmentType(type)}
                            className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 capitalize ${
                              appointmentType === type ? "shadow-modern" : ""
                            }`}
                            style={{
                              backgroundColor:
                                appointmentType === type
                                  ? "#5B73FF"
                                  : "rgba(91, 115, 255, 0.1)",
                              color:
                                appointmentType === type ? "white" : "#5B73FF",
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
                    <label className="block text-sm font-semibold mb-3 text-ds-text-body">
                      Select Date
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {availableDates.map((date) => (
                        <button
                          key={date.value}
                          onClick={() => setSelectedDate(date.value)}
                          className={`p-3 rounded-xl text-xs font-medium transition-all duration-300 ${
                            selectedDate === date.value ? "shadow-modern" : ""
                          }`}
                          style={{
                            backgroundColor:
                              selectedDate === date.value
                                ? "#5B73FF"
                                : "rgba(91, 115, 255, 0.1)",
                            color:
                              selectedDate === date.value ? "white" : "#5B73FF",
                          }}
                        >
                          {date.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-ds-text-body">
                      Select Time
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.value}
                          onClick={() => setSelectedTime(slot.value)}
                          className={`p-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                            selectedTime === slot.value ? "shadow-modern" : ""
                          }`}
                          style={{
                            backgroundColor:
                              selectedTime === slot.value
                                ? "#5B73FF"
                                : "rgba(91, 115, 255, 0.1)",
                            color:
                              selectedTime === slot.value ? "white" : "#5B73FF",
                          }}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Booking Summary */}
                  {selectedDate && selectedTime && (
                    <div
                      className="p-4 rounded-2xl"
                      style={{ backgroundColor: "rgba(0, 176, 116, 0.1)" }}
                    >
                      <h4
                        className="font-semibold mb-2"
                        style={{ color: "#00B074" }}
                      >
                        Appointment Summary
                      </h4>
                      <div className="text-sm text-ds-text-body space-y-1">
                        <div>
                          Date:{" "}
                          {
                            availableDates.find((d) => d.value === selectedDate)
                              ?.label
                          }
                        </div>
                        <div>
                          Time:{" "}
                          {
                            timeSlots.find((t) => t.value === selectedTime)
                              ?.label
                          }
                        </div>
                        <div>Type: {appointmentType}</div>
                        <div>Fee: ${doctor.price}</div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowBookingForm(false)}
                      className="flex-1 py-3 px-4 rounded-2xl font-medium transition-all duration-300"
                      style={{
                        backgroundColor: "rgba(107, 114, 128, 0.1)",
                        color: "#6B7280",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBookAppointment}
                      className="flex-1 py-3 px-4 rounded-2xl font-semibold transition-all duration-300 shadow-modern text-white"
                      style={{ backgroundColor: "#5B73FF" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#445CE0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#5B73FF";
                      }}
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
