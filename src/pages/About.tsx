export default function About() {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      image: "/images/doctor-female-1.webp",
      bio: "Leading healthcare innovation with 15+ years in digital health solutions.",
      specialties: ["Digital Health", "AI in Medicine", "Patient Care"],
      achievements: "Published 50+ medical research papers",
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Head of Technology",
      image: "/images/doctor-male-2.webp",
      bio: "Pioneering AI-driven healthcare platforms and telemedicine solutions.",
      specialties: ["Healthcare AI", "Telemedicine", "Medical Software"],
      achievements: "Led development of 3 major health platforms",
    },
    {
      name: "Dr. Emily Johnson",
      role: "Director of Patient Experience",
      image: "/images/doctor-female-2.webp",
      bio: "Ensuring exceptional patient care through innovative digital experiences.",
      specialties: ["Patient Care", "Healthcare UX", "Quality Assurance"],
      achievements: "Improved patient satisfaction by 40%",
    },
    {
      name: "Dr. David Kim",
      role: "Research & Development Lead",
      image: "/images/doctor-male-3.webp",
      bio: "Advancing medical research through cutting-edge technology and AI.",
      specialties: ["Medical Research", "Clinical Trials", "Data Analytics"],
      achievements: "Led 25+ clinical research studies",
    },
  ];

  const values = [
    {
      icon: "🏥",
      title: "Excellence in Care",
      description:
        "We maintain the highest standards of medical care through continuous improvement and innovation.",
      color: "#5B73FF",
    },
    {
      icon: "🤝",
      title: "Patient-Centered",
      description:
        "Every decision we make prioritizes patient comfort, accessibility, and positive outcomes.",
      color: "#00B074",
    },
    {
      icon: "🔬",
      title: "Innovation First",
      description:
        "We leverage cutting-edge technology and AI to revolutionize healthcare delivery.",
      color: "#FF6B6B",
    },
    {
      icon: "🌍",
      title: "Global Impact",
      description:
        "Making quality healthcare accessible to communities worldwide through digital solutions.",
      color: "#4ECDC4",
    },
  ];

  const achievements = [
    { number: "500K+", label: "Patients Served", icon: "👥" },
    { number: "50+", label: "Partner Hospitals", icon: "🏥" },
    { number: "98%", label: "Patient Satisfaction", icon: "⭐" },
    { number: "24/7", label: "Support Available", icon: "🕐" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ds-light-gray to-ds-bg-highlight">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-16 pb-12">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              backgroundColor: "rgba(91, 115, 255, 0.1)",
              color: "#5B73FF",
            }}
          >
            <span className="text-sm font-semibold">
              🚀 Revolutionizing Healthcare
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
            About NextGen Doctor
          </h1>
          <p className="text-xl text-ds-text-body leading-relaxed mb-8">
            We're transforming healthcare through innovative technology,
            AI-powered solutions, and a patient-first approach that makes
            quality medical care accessible to everyone.
          </p>

          {/* Mission Statement */}
          <div className="bg-card-gradient p-8 rounded-3xl shadow-modern border border-ds-gray/20 mb-12">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#5B73FF" }}
            >
              Our Mission
            </h2>
            <p className="text-lg text-ds-text-body leading-relaxed">
              To democratize healthcare by connecting patients with trusted
              medical professionals through cutting-edge technology, AI-enhanced
              diagnostics, and personalized care that adapts to each
              individual's unique health journey.
            </p>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.label}
              className="bg-card-gradient p-6 rounded-2xl shadow-modern border border-ds-gray/20 text-center animate-fade-in hover:shadow-modern-hover transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl mb-3">{achievement.icon}</div>
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: "#5B73FF" }}
              >
                {achievement.number}
              </div>
              <div className="text-sm text-ds-text-body font-medium">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-card-gradient py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "#5B73FF" }}
                >
                  Our Story
                </h2>
                <div className="space-y-4 text-ds-text-body">
                  <p className="leading-relaxed">
                    Founded in 2020 by a team of physicians, technologists, and
                    healthcare innovators, NextGen Doctor emerged from a simple
                    yet powerful vision: to make healthcare more accessible,
                    efficient, and personalized for everyone.
                  </p>
                  <p className="leading-relaxed">
                    We recognized that despite advances in medical science,
                    patients still faced significant barriers in accessing
                    quality care - from long wait times and complex scheduling
                    to difficulty understanding medical information.
                  </p>
                  <p className="leading-relaxed">
                    Today, we're proud to serve over 500,000 patients worldwide,
                    partnering with leading healthcare institutions to deliver
                    AI-enhanced care that puts patients at the center of their
                    health journey.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div
                  className="bg-gradient-to-br rounded-3xl p-8 shadow-modern-hover"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(91, 115, 255, 0.1) 0%, rgba(68, 92, 224, 0.05) 100%)",
                  }}
                >
                  <img
                    src="/images/nextGen-Doctor.png"
                    alt="NextGen Doctor Innovation"
                    className="w-full h-80 object-cover rounded-2xl"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = "flex";
                      }
                    }}
                  />
                  <div
                    className="hidden w-full h-80 bg-gradient-to-br rounded-2xl items-center justify-center text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(91, 115, 255, 0.2) 0%, rgba(68, 92, 224, 0.1) 100%)",
                    }}
                  >
                    <div>
                      <div className="text-6xl mb-4">🏥</div>
                      <div
                        className="text-xl font-semibold"
                        style={{ color: "#5B73FF" }}
                      >
                        NextGen Healthcare
                      </div>
                      <div className="text-sm opacity-75 mt-2">
                        Innovation in Medical Care
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#5B73FF" }}
            >
              Our Core Values
            </h2>
            <p className="text-lg text-ds-text-body">
              The principles that guide everything we do and every decision we
              make
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group bg-card-gradient p-8 rounded-3xl shadow-modern hover:shadow-modern-hover transition-all duration-500 border border-ds-gray/20 text-center animate-fade-in"
                style={{
                  animationDelay: `${index * 150}ms`,
                  borderColor: "rgba(229, 231, 235, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${value.color}40`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(229, 231, 235, 0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl shadow-modern group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${value.color}20` }}
                >
                  {value.icon}
                </div>
                <h3
                  className="text-xl font-bold mb-4 transition-colors"
                  style={{ color: value.color }}
                >
                  {value.title}
                </h3>
                <p className="text-ds-text-body leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="bg-card-gradient py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#5B73FF" }}
            >
              Leadership Team
            </h2>
            <p className="text-lg text-ds-text-body">
              Meet the visionary leaders driving healthcare innovation forward
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="group bg-white p-6 rounded-3xl shadow-modern hover:shadow-modern-hover transition-all duration-500 border border-ds-gray/20 text-center animate-fade-in"
                style={{
                  animationDelay: `${index * 150}ms`,
                  borderColor: "rgba(229, 231, 235, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(91, 115, 255, 0.3)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(229, 231, 235, 0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-2xl mx-auto object-cover shadow-modern ring-4 ring-white group-hover:ring-4 transition-all duration-300"
                    style={
                      {
                        "--tw-ring-color": "rgba(91, 115, 255, 0.2)",
                      } as React.CSSProperties
                    }
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = "flex";
                      }
                    }}
                  />
                  <div
                    className="hidden w-24 h-24 rounded-2xl mx-auto items-center justify-center text-4xl shadow-modern"
                    style={{ backgroundColor: "rgba(91, 115, 255, 0.1)" }}
                  >
                    👨‍⚕️
                  </div>
                </div>

                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "#5B73FF" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#00B074" }}
                >
                  {member.role}
                </p>
                <p className="text-sm text-ds-text-body mb-4 leading-relaxed">
                  {member.bio}
                </p>

                <div className="mb-4">
                  <div className="text-xs font-semibold text-ds-text-body uppercase tracking-wide mb-2">
                    Specialties
                  </div>
                  <div className="flex flex-wrap justify-center gap-1">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: "rgba(91, 115, 255, 0.1)",
                          color: "#5B73FF",
                        }}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-ds-text-body font-medium">
                  🏆 {member.achievements}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology & Innovation */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: "#5B73FF" }}
            >
              Technology & Innovation
            </h2>
            <p className="text-lg text-ds-text-body mb-12 leading-relaxed">
              We leverage cutting-edge technology to deliver personalized,
              efficient, and accessible healthcare solutions that adapt to your
              unique needs.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🤖",
                  title: "AI-Powered Diagnostics",
                  description:
                    "Advanced AI algorithms assist in accurate diagnosis and treatment recommendations.",
                },
                {
                  icon: "📱",
                  title: "Digital-First Platform",
                  description:
                    "Seamless digital experience from booking to follow-up care and health monitoring.",
                },
                {
                  icon: "🔒",
                  title: "Security & Privacy",
                  description:
                    "Enterprise-grade security ensuring your health data is protected and confidential.",
                },
              ].map((tech, index) => (
                <div
                  key={tech.title}
                  className="bg-card-gradient p-6 rounded-2xl shadow-modern border border-ds-gray/20 animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-4xl mb-4">{tech.icon}</div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: "#5B73FF" }}
                  >
                    {tech.title}
                  </h3>
                  <p className="text-sm text-ds-text-body leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #5B73FF 0%, #445CE0 100%)",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience the Future of Healthcare?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have transformed their healthcare
            experience with NextGen Doctor's innovative platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="bg-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-modern hover:shadow-modern-hover"
              style={{ color: "#5B73FF" }}
            >
              🚀 Get Started Today
            </button>
            <button
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#5B73FF";
                e.currentTarget.style.backgroundColor = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "white";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              📋 Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
