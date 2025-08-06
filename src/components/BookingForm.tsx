import type { DoctorWithAvailability } from "../utils/consultationUtils";
import {
  generateAvailableDates,
  generateTimeSlots,
} from "../utils/consultationUtils";

interface BookingData {
  selectedDate: string;
  selectedTime: string;
  appointmentType: string;
  fullName: string;
  email: string;
  phone: string;
  symptoms: string;
}

interface BookingFormProps {
  selectedDoctor: DoctorWithAvailability;
  bookingData: BookingData;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function BookingForm({
  selectedDoctor,
  bookingData,
  setBookingData,
  onSubmit,
}: BookingFormProps) {
  const availableDates = generateAvailableDates(selectedDoctor);
  const timeSlots = generateTimeSlots(selectedDoctor);

  return (
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
          {["consultation", "follow-up", "check-up", "urgent"].map((type) => (
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
                  bookingData.appointmentType === type ? "white" : "#5B73FF",
              }}
            >
              {type}
            </button>
          ))}
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
          {availableDates.map((date) => (
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
                  bookingData.selectedDate === date.value ? "white" : "#5B73FF",
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
          {timeSlots.map((slot) => (
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
                  bookingData.selectedTime === slot.value ? "white" : "#5B73FF",
              }}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold" style={{ color: "#6b7280" }}>
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
                availableDates.find((d) => d.value === bookingData.selectedDate)
                  ?.label
              }
            </div>
            <div>
              Time:{" "}
              {
                timeSlots.find((t) => t.value === bookingData.selectedTime)
                  ?.label
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
          onClick={onSubmit}
          className="w-full py-3 px-4 rounded-2xl font-semibold transition-all duration-300 text-white"
          style={{ backgroundColor: "#5B73FF" }}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
