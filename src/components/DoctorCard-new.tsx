import { Link } from "react-router-dom";
import type { Doctor } from "../data/doctors";
import StatusBadge from "./StatusBadge";

type Props = { doctor: Doctor };

export default function DoctorCard({ doctor }: Props) {
  // Simulate availability status
  const isAvailable = doctor.id % 3 !== 0; // 2/3 of doctors are available

  return (
    <div
      className="group relative bg-card-gradient p-6 rounded-3xl shadow-modern hover:shadow-modern-hover transition-all duration-500 border border-ds-gray/20 text-center overflow-hidden"
      style={{ borderColor: "rgba(229, 231, 235, 0.2)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(91, 115, 255, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(229, 231, 235, 0.2)";
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(91, 115, 255, 0.1) 0%, rgba(68, 92, 224, 0.1) 100%)",
        }}
      ></div>

      <div className="relative z-10">
        <div className="relative mb-6">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-24 h-24 rounded-2xl mx-auto object-cover shadow-modern ring-4 ring-ds-white transition-all duration-300"
            style={
              {
                "--ring-color": "rgba(255, 255, 255, 1)",
              } as React.CSSProperties
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.setProperty(
                "--tw-ring-color",
                "rgba(91, 115, 255, 0.2)"
              );
              e.currentTarget.classList.add("ring-4");
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty(
                "--tw-ring-color",
                "rgba(255, 255, 255, 1)"
              );
            }}
          />
          <div
            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#00B074" }}
          >
            <div className="w-3 h-3 bg-ds-white rounded-full"></div>
          </div>
        </div>

        <h3
          className="text-xl font-bold text-ds-dark-gray mb-2 transition-colors"
          style={{ color: "#5B73FF" }}
        >
          {doctor.name}
        </h3>
        <p className="text-ds-text-body mb-3 font-medium">{doctor.specialty}</p>

        <div className="flex items-center justify-center gap-4 mb-4 text-sm text-ds-text-body">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">⭐</span>
            <span className="font-semibold">{doctor.rating}</span>
          </div>
          <div className="w-1 h-1 bg-ds-gray rounded-full"></div>
          <div>{doctor.experience} yrs exp</div>
        </div>

        <div className="flex justify-center mb-4">
          <StatusBadge status={isAvailable ? "approved" : "pending"}>
            {isAvailable ? "Available" : "Busy"}
          </StatusBadge>
        </div>

        <div className="mb-6">
          <span className="text-2xl font-bold" style={{ color: "#5B73FF" }}>
            ${doctor.price}
          </span>
          <span className="text-ds-text-body text-sm"> / session</span>
        </div>

        <Link
          to={`/doctor/${doctor.id}`}
          className="group/btn relative w-full inline-block py-3 px-6 rounded-2xl transition-all duration-300 shadow-ds-button hover:shadow-modern font-semibold overflow-hidden text-center"
          style={{
            backgroundColor: "#5B73FF",
            color: "white",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#445CE0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#5B73FF";
          }}
        >
          <span className="relative z-10">Book Appointment</span>
          <div
            className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(90deg, #445CE0 0%, #3346B3 100%)",
            }}
          ></div>
        </Link>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        style={{
          background: "linear-gradient(90deg, #5B73FF 0%, #445CE0 100%)",
        }}
      ></div>
    </div>
  );
}
