import { Link } from "react-router-dom";
import { useState } from "react";
import { doctors } from "../data/doctors";
import DoctorCard from "../components/DoctorCard";
import PersonalizedContentDemo from "../components/PersonalizedContentDemo";
import ConsultationDialog from "../components/ConsultationDialog";

export default function Landing() {
  const bestDoctors = doctors.slice(0, 4);
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] =
    useState(false);

  const handleStartConsultation = () => {
    setIsConsultationDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsConsultationDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-ds-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-ds-hero"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <div
                className="inline-flex items-center gap-2 bg-ds-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-modern"
                style={{ color: "#5B73FF" }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#00B074" }}
                ></span>
                Now Available - Next Generation Healthcare
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-ds-dark-gray mb-6 leading-tight">
                Complete Healthcare
                <span className="block" style={{ color: "#5B73FF" }}>
                  Management
                </span>
                at Your Fingertips
              </h1>
              <p className="text-xl text-ds-text-body max-w-3xl lg:max-w-none mx-auto lg:mx-0 mb-8 leading-relaxed">
                Experience the future of healthcare with NextGen Doctor. From
                real-time scheduling and digital check-ins to personalized
                health education and AI-powered test result summaries.
              </p>
              <div className="flex justify-center lg:justify-start mb-12">
                <button
                  onClick={handleStartConsultation}
                  className="group relative px-8 py-4 rounded-2xl transition-all duration-300 shadow-modern hover:shadow-modern-hover font-semibold text-white"
                  style={{ backgroundColor: "#5B73FF" }}
                >
                  <span className="relative z-10">Start Consultation</span>
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(90deg, #5B73FF 0%, #3346B3 100%)",
                    }}
                  ></div>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: "#5B73FF" }}
                  >
                    10k+
                  </div>
                  <div className="text-ds-text-body text-sm">
                    Happy Patients
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: "#5B73FF" }}
                  >
                    500+
                  </div>
                  <div className="text-ds-text-body text-sm">
                    Expert Doctors
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: "#5B73FF" }}
                  >
                    24/7
                  </div>
                  <div className="text-ds-text-body text-sm">Support</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Background decorative elements */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-ds-primary-blue/20 to-ds-blue-hover/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-ds-success-green/20 to-ds-primary-blue/10 rounded-full blur-2xl"></div>

                {/* Main image container */}
                <div className="relative bg-card-gradient p-6 rounded-3xl shadow-modern-hover border border-ds-gray/20 backdrop-blur-sm">
                  <img
                    src="/images/tablet_doctor.png"
                    alt="NextGen Doctor - AI-Enhanced Healthcare Professional"
                    className="w-180 h-auto rounded-2xl shadow-modern"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = "flex";
                      }
                    }}
                  />

                  {/* Fallback placeholder */}
                  <div
                    className="hidden w-80 h-96 rounded-2xl items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(91, 115, 255, 0.2) 0%, rgba(68, 92, 224, 0.3) 100%)",
                      color: "#5B73FF",
                    }}
                  >
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">👩‍⚕️</div>
                      <div className="text-xl font-semibold">
                        NextGen Doctor
                      </div>
                      <div className="text-sm opacity-75 mt-2">
                        AI-Enhanced Healthcare
                      </div>
                    </div>
                  </div>

                  {/* Floating badges */}
                  <div
                    className="absolute -top-4 -right-4 text-ds-white px-4 py-2 rounded-2xl text-sm font-semibold shadow-modern animate-float"
                    style={{ backgroundColor: "#00B074" }}
                  >
                    ✓ AI-Powered
                  </div>
                  <div
                    className="absolute -bottom-4 -left-4 text-ds-white px-4 py-2 rounded-2xl text-sm font-semibold shadow-modern animate-float"
                    style={{ animationDelay: "1s", backgroundColor: "#5B73FF" }}
                  >
                    🔬 Advanced Care
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-ds-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-ds-dark-gray mb-4">
              Revolutionary Healthcare Features
            </h2>
            <p className="text-lg text-ds-text-body">
              Discover how our advanced technology transforms your healthcare
              experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Real-time Scheduling",
                description:
                  "Book appointments based on your preferred location and specific medical services with instant availability updates.",
                icon: "📅",
                color: "from-blue-500 to-purple-600",
              },
              {
                title: "Pre-Visit Reminders",
                description:
                  "Receive personalized appointment reminders with preparation instructions tailored to your visit type.",
                icon: "🔔",
                color: "from-green-500 to-teal-600",
              },
              {
                title: "Real-time Communication",
                description:
                  "Connect instantly with healthcare providers through secure messaging and video consultations.",
                icon: "💬",
                color: "from-purple-500 to-pink-600",
              },
              {
                title: "Digital Check-in",
                description:
                  "Skip the waiting room lines - scan QR codes or enter details through our dedicated web application.",
                icon: "📱",
                color: "from-orange-500 to-red-600",
              },
              {
                title: "Personalized Health Education",
                description:
                  "Access customized health materials and follow-up content based on your specific medical conditions.",
                icon: "📚",
                color: "from-indigo-500 to-blue-600",
              },
              {
                title: "E-Prescribing",
                description:
                  "Receive digital prescriptions sent directly to your preferred pharmacy with automatic refill reminders.",
                icon: "💊",
                color: "from-cyan-500 to-blue-600",
              },
              {
                title: "Test Results & Images",
                description:
                  "View your lab results and medical images with AI-powered summaries that explain complex terminology clearly.",
                icon: "🔬",
                color: "from-violet-500 to-purple-600",
              },
              {
                title: "Find Nearby Doctors",
                description:
                  "Locate trusted healthcare providers in your area with detailed profiles and patient reviews.",
                icon: "🏥",
                color: "from-emerald-500 to-green-600",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-card-gradient p-8 rounded-2xl shadow-modern hover:shadow-modern-hover transition-all duration-500 border border-ds-gray/20 animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  borderColor: `${
                    index % 2 === 0
                      ? "rgba(91, 115, 255, 0.3)"
                      : "rgba(229, 231, 235, 0.2)"
                  }`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(91, 115, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(229, 231, 235, 0.2)";
                }}
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 bg-feature-gradient rounded-2xl flex items-center justify-center text-3xl shadow-inner-glow group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3
                    className="text-xl font-bold text-ds-dark-gray mb-4 transition-colors"
                    style={{ color: "#5B73FF" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-ds-text-body leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect gradient overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(91, 115, 255, 0.05) 0%, rgba(68, 92, 224, 0.05) 100%)",
                  }}
                ></div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{
                    background:
                      "linear-gradient(90deg, #5B73FF 0%, #445CE0 100%)",
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Health Education */}
      <section className="py-20 bg-gradient-to-br from-ds-light-gray to-ds-bg-highlight">
        <div className="container mx-auto px-6">
          <PersonalizedContentDemo />
        </div>
      </section>

      {/* AI-Powered Test Results Demo */}
      <section className="py-20 bg-ds-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-ds-dark-gray">
            AI-Powered Test Results Summary
          </h2>
          <p className="text-center text-ds-text-body mb-12 max-w-2xl mx-auto">
            Complex medical data made simple with artificial intelligence
          </p>
          <div className="max-w-6xl mx-auto bg-card-gradient rounded-3xl shadow-modern-hover border border-ds-gray/20 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: "#5B73FF" }}
                  >
                    📋
                  </div>
                  <h3 className="text-2xl font-bold text-ds-dark-gray">
                    Medical Report
                  </h3>
                </div>
                <div className="bg-ds-light-gray/50 p-6 rounded-2xl border border-ds-gray/20">
                  <div className="space-y-4 text-ds-text-body">
                    <div className="flex justify-between items-center p-3 bg-ds-white rounded-xl">
                      <span className="font-medium">Hemoglobin A1C:</span>
                      <span className="font-bold text-ds-warning-orange">
                        7.2%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-ds-white rounded-xl">
                      <span className="font-medium">Fasting Glucose:</span>
                      <span className="font-bold text-ds-warning-orange">
                        145 mg/dL
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-ds-white rounded-xl">
                      <span className="font-medium">Total Cholesterol:</span>
                      <span className="font-bold text-ds-warning-orange">
                        210 mg/dL
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-ds-white rounded-xl">
                      <span className="font-medium">Blood Pressure:</span>
                      <span className="font-bold text-ds-warning-orange">
                        135/85 mmHg
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{
                      background:
                        "linear-gradient(90deg, #5B73FF 0%, #445CE0 100%)",
                    }}
                  >
                    🤖
                  </div>
                  <h3 className="text-2xl font-bold text-ds-dark-gray">
                    AI Summary
                  </h3>
                </div>
                <div
                  className="bg-feature-gradient p-6 rounded-2xl border"
                  style={{ borderColor: "rgba(91, 115, 255, 0.2)" }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-ds-white/70 rounded-xl">
                      <div className="text-2xl">📊</div>
                      <div>
                        <p className="font-semibold text-ds-dark-gray mb-1">
                          What this means:
                        </p>
                        <p className="text-ds-text-body">
                          Your blood sugar levels are slightly elevated,
                          indicating pre-diabetes.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-ds-white/70 rounded-xl">
                      <div className="text-2xl">💡</div>
                      <div>
                        <p className="font-semibold text-ds-dark-gray mb-1">
                          Next steps:
                        </p>
                        <p className="text-ds-text-body">
                          Consider dietary changes and regular exercise to
                          manage glucose levels.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-ds-white/70 rounded-xl">
                      <div className="text-2xl">👨‍⚕️</div>
                      <div>
                        <p className="font-semibold text-ds-dark-gray mb-1">
                          Follow-up:
                        </p>
                        <p className="text-ds-text-body">
                          Schedule a consultation with your doctor to discuss a
                          management plan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Doctors */}
      <section className="py-20 bg-gradient-to-br from-ds-bg-highlight to-ds-light-gray">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-ds-dark-gray mb-4">
              Our Top Rated Doctors
            </h2>
            <p className="text-lg text-ds-text-body">
              Meet our exceptional healthcare professionals ready to serve you
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestDoctors.map((doc, index) => (
              <div
                key={doc.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DoctorCard doctor={doc} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/doctors"
              className="inline-block px-8 py-4 rounded-2xl transition-all duration-300 shadow-modern hover:shadow-modern-hover font-semibold"
              style={{
                backgroundColor: "#5B73FF",
                color: "#ffffff",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#445CE0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#5B73FF")
              }
            >
              View All Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Consultation Dialog */}
      <ConsultationDialog
        isOpen={isConsultationDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
}
