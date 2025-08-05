import { Link } from "react-router-dom";

const services = [
  {
    name: "Cardiology",
    icon: "❤️",
    description:
      "Comprehensive heart and cardiovascular care with state-of-the-art diagnostic equipment and expert cardiologists.",
    features: [
      "ECG & Stress Testing",
      "Cardiac Catheterization",
      "Heart Surgery",
      "Preventive Cardiology",
    ],
    availability: "24/7 Emergency Care",
    price: "From $150",
    specialists: 12,
    rating: 4.9,
  },
  {
    name: "Neurology",
    icon: "🧠",
    description:
      "Advanced neurological care for brain, spine, and nervous system disorders with cutting-edge treatment options.",
    features: [
      "MRI & CT Scans",
      "Neurological Surgery",
      "Stroke Care",
      "Epilepsy Treatment",
    ],
    availability: "Mon-Fri 8AM-6PM",
    price: "From $200",
    specialists: 8,
    rating: 4.8,
  },
  {
    name: "Dermatology",
    icon: "🌸",
    description:
      "Expert skin care services from medical dermatology to cosmetic procedures for all skin types and conditions.",
    features: [
      "Skin Cancer Screening",
      "Acne Treatment",
      "Cosmetic Procedures",
      "Dermatologic Surgery",
    ],
    availability: "Mon-Sat 9AM-5PM",
    price: "From $120",
    specialists: 6,
    rating: 4.7,
  },
  {
    name: "Dentistry",
    icon: "🦷",
    description:
      "Complete dental care services from routine cleanings to advanced oral surgery with modern dental technology.",
    features: [
      "Preventive Care",
      "Oral Surgery",
      "Orthodontics",
      "Cosmetic Dentistry",
    ],
    availability: "Mon-Fri 8AM-7PM",
    price: "From $100",
    specialists: 10,
    rating: 4.9,
  },
  {
    name: "Nephrology",
    icon: "🫘",
    description:
      "Specialized kidney care and treatment for chronic kidney disease, dialysis, and kidney transplantation.",
    features: [
      "Dialysis Services",
      "Kidney Transplant",
      "Hypertension Management",
      "Chronic Kidney Disease",
    ],
    availability: "Mon-Fri 7AM-6PM",
    price: "From $180",
    specialists: 5,
    rating: 4.8,
  },
  {
    name: "Pulmonology",
    icon: "🫁",
    description:
      "Respiratory and lung care specialists treating asthma, COPD, lung cancer, and other pulmonary conditions.",
    features: [
      "Lung Function Tests",
      "Bronchoscopy",
      "Sleep Studies",
      "Respiratory Therapy",
    ],
    availability: "Mon-Fri 8AM-5PM",
    price: "From $160",
    specialists: 7,
    rating: 4.6,
  },
  {
    name: "Gynecology",
    icon: "👩‍⚕️",
    description:
      "Comprehensive women's health services including reproductive health, pregnancy care, and gynecological surgery.",
    features: [
      "Annual Exams",
      "Pregnancy Care",
      "Fertility Treatment",
      "Gynecologic Surgery",
    ],
    availability: "Mon-Sat 8AM-6PM",
    price: "From $140",
    specialists: 9,
    rating: 4.9,
  },
  {
    name: "Orthopedics",
    icon: "🦴",
    description:
      "Musculoskeletal care for bones, joints, muscles, and ligaments with both surgical and non-surgical treatments.",
    features: [
      "Joint Replacement",
      "Sports Medicine",
      "Fracture Care",
      "Physical Therapy",
    ],
    availability: "Mon-Fri 7AM-7PM",
    price: "From $170",
    specialists: 11,
    rating: 4.8,
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ds-light-gray to-ds-bg-highlight">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              backgroundColor: "rgba(91, 115, 255, 0.1)",
              color: "#5B73FF",
            }}
          >
            <span className="text-sm font-semibold">
              🏥 World-Class Medical Care
            </span>
          </div>
          <h1
            className="text-5xl font-bold mb-6"
            style={{
              background: "linear-gradient(135deg, #2D3748 0%, #4A5568 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Medical Services
          </h1>
          <p className="text-xl text-ds-text-body leading-relaxed">
            Experience exceptional healthcare with our comprehensive range of
            medical specialties. Our expert physicians use cutting-edge
            technology to deliver personalized, compassionate care.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Medical Specialties", value: "8+", icon: "🏥" },
            { label: "Expert Doctors", value: "68+", icon: "👨‍⚕️" },
            { label: "Patients Served", value: "15K+", icon: "❤️" },
            { label: "Success Rate", value: "98%", icon: "✅" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card-gradient p-6 rounded-2xl shadow-modern border border-ds-gray/20 text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: "#5B73FF" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-ds-text-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.name}
              className="group relative bg-card-gradient p-8 rounded-3xl shadow-modern hover:shadow-modern-hover transition-all duration-500 border border-ds-gray/20 overflow-hidden animate-fade-in"
              style={{
                animationDelay: `${index * 150}ms`,
                borderColor: "rgba(229, 231, 235, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(91, 115, 255, 0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(229, 231, 235, 0.2)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Background decoration */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(91, 115, 255, 0.05) 0%, rgba(68, 92, 224, 0.05) 100%)",
                }}
              ></div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-modern group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, #5B73FF 0%, #445CE0 100%)",
                    }}
                  >
                    <span className="filter drop-shadow-sm">
                      {service.icon}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">⭐</span>
                    <span className="text-sm font-semibold text-ds-text-body">
                      {service.rating}
                    </span>
                  </div>
                </div>

                {/* Title and Price */}
                <div className="mb-4">
                  <h2
                    className="text-xl font-bold mb-2 transition-colors"
                    style={{ color: "#5B73FF" }}
                  >
                    {service.name}
                  </h2>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-lg font-bold"
                      style={{ color: "#00B074" }}
                    >
                      {service.price}
                    </span>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(91, 115, 255, 0.1)",
                        color: "#5B73FF",
                      }}
                    >
                      {service.specialists} specialists
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-ds-text-body leading-relaxed mb-4 line-clamp-3">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-ds-text-body uppercase tracking-wide mb-2">
                    Key Services
                  </h4>
                  <div className="space-y-2">
                    {service.features.slice(0, 2).map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-ds-text-body"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: "#5B73FF" }}
                        ></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 2 && (
                      <div className="text-xs" style={{ color: "#5B73FF" }}>
                        +{service.features.length - 2} more services
                      </div>
                    )}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-xs text-ds-text-body">
                    <span className="text-green-500">🕒</span>
                    <span>{service.availability}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link
                    to={`/doctors?specialty=${encodeURIComponent(
                      service.name
                    )}`}
                    className="block w-full text-white py-3 px-4 rounded-2xl transition-all duration-300 shadow-modern hover:shadow-modern-hover font-semibold text-sm text-center"
                    style={{
                      backgroundColor: "#5B73FF",
                      textDecoration: "none",
                      color: "#ffffff"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#445CE0";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#5B73FF";
                    }}
                  >
                    Book Appointment
                  </Link>
                  <button
                    className="w-full text-sm font-medium py-2 px-4 rounded-xl transition-colors duration-300"
                    style={{
                      color: "#5B73FF",
                      backgroundColor: "rgba(91, 115, 255, 0.1)",
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, #5B73FF 0%, #445CE0 100%)",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div
        className="bg-gradient-to-r from-ds-primary-blue to-ds-blue-hover"
        style={{
          background: "linear-gradient(135deg, #5B73FF 0%, #445CE0 100%)",
        }}
      >
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help Choosing the Right Service?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Our AI-powered healthcare assistant and support coordinators are
            available 24/7 to help you find the right specialist and schedule
            your appointment at your convenience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="bg-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-modern hover:shadow-modern-hover"
              style={{ color: "#5B73FF" }}
            >
              🤖 Ask AI Health Assistant
            </button>
            <button
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#5B73FF";
                e.currentTarget.style.backgroundColor = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "white";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              💬 Live Chat Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
