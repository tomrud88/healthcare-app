import { useEffect, useMemo } from "react";
import { useLocation, useSearchParams, Link } from "react-router-dom";
import { doctors } from "../data/doctors";
import DoctorCard from "../components/DoctorCard";

export default function Doctors() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const specialty = searchParams.get("specialty");

  const filteredDoctors = useMemo(() => {
    if (!specialty) return doctors;
    return doctors.filter(
      (doctor) => doctor.specialty.toLowerCase() === specialty.toLowerCase()
    );
  }, [specialty]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const title = specialty ? `${specialty} Specialists` : "Meet Our Doctors";

  const subtitle = specialty
    ? `Expert ${specialty.toLowerCase()} doctors ready to provide you with exceptional care`
    : "Our experienced healthcare professionals ready to serve you";

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-ds-dark-gray mb-2">{title}</h1>
        {specialty && (
          <div className="flex items-center justify-center gap-4 mb-4">
            <span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: "rgba(91, 115, 255, 0.1)",
                color: "#5B73FF",
              }}
            >
              {specialty} • {filteredDoctors.length} doctors available
            </span>
            <Link
              to="/doctors"
              className="text-sm text-ds-text-body hover:text-ds-dark-gray transition-colors"
            >
              View All Doctors
            </Link>
          </div>
        )}
        <p className="text-ds-text-body">{subtitle}</p>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-ds-text-body mb-4">
            No doctors found for {specialty} specialty.
          </p>
          <Link
            to="/doctors"
            className="px-6 py-2 rounded-xl font-medium transition-colors inline-block"
            style={{
              backgroundColor: "rgba(91, 115, 255, 0.1)",
              color: "#5B73FF",
              textDecoration: "none",
            }}
          >
            View All Doctors
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
