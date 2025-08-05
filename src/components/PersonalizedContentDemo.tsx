export default function PersonalizedContentDemo() {
  const healthTips = [
    {
      condition: "Pre-Diabetes Management",
      tips: [
        "🥗 Focus on whole grains and vegetables",
        "🚶‍♀️ Aim for 30 minutes of daily exercise",
        "💧 Stay hydrated with 8 glasses of water daily",
        "😴 Maintain 7-8 hours of quality sleep",
      ],
      badge: "pending",
      progress: 65,
    },
    {
      condition: "Hypertension Control",
      tips: [
        "🧂 Reduce sodium intake to less than 2300mg/day",
        "🏃‍♂️ Regular cardio exercise helps lower BP",
        "🧘‍♀️ Practice stress management techniques",
        "📊 Monitor blood pressure twice daily",
      ],
      badge: "approved",
      progress: 85,
    },
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-ds-dark-gray mb-4">
          Your Personalized Health Education
        </h2>
        <p className="text-lg text-ds-text-body">
          Customized health guidance based on your unique medical profile
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {healthTips.map((content, index) => (
          <div
            key={index}
            className="group relative bg-card-gradient p-8 rounded-3xl shadow-modern hover:shadow-modern-hover transition-all duration-500 border border-ds-gray/20 overflow-hidden"
            style={{
              borderColor: "rgba(229, 231, 235, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(91, 115, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(229, 231, 235, 0.2)";
            }}
          >
            {/* Background decoration */}
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"
              style={{
                background:
                  "linear-gradient(135deg, rgba(91, 115, 255, 0.05) 0%, rgba(68, 92, 224, 0.05) 100%)",
              }}
            ></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-modern"
                    style={{
                      background:
                        "linear-gradient(135deg, #5B73FF 0%, #445CE0 100%)",
                    }}
                  >
                    📚
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold text-ds-dark-gray transition-colors"
                      style={{ color: "#5B73FF" }}
                    >
                      {content.condition}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-xs text-ds-text-body">Progress:</div>
                      <div className="flex-1 h-2 bg-ds-gray/30 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${content.progress}%`,
                            background:
                              "linear-gradient(90deg, #5B73FF 0%, #445CE0 100%)",
                          }}
                        ></div>
                      </div>
                      <div
                        className="text-xs font-semibold"
                        style={{ color: "#5B73FF" }}
                      >
                        {content.progress}%
                      </div>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-2xl text-xs font-semibold shadow-inner-glow ${
                    content.badge === "approved"
                      ? "text-ds-success-green"
                      : "text-ds-warning-orange"
                  }`}
                  style={{
                    backgroundColor:
                      content.badge === "approved"
                        ? "rgba(0, 176, 116, 0.1)"
                        : "rgba(255, 165, 0, 0.1)",
                    color: content.badge === "approved" ? "#00B074" : "#FF8C00",
                  }}
                >
                  {content.badge === "approved"
                    ? "✅ Following"
                    : "🆕 New Plan"}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                {content.tips.map((tip, tipIndex) => {
                  // Find the first space to properly split emoji from text
                  const spaceIndex = tip.indexOf(" ");
                  const emoji =
                    spaceIndex > 0
                      ? tip.substring(0, spaceIndex)
                      : tip.charAt(0);
                  const text =
                    spaceIndex > 0
                      ? tip.substring(spaceIndex + 1)
                      : tip.slice(1);

                  return (
                    <div
                      key={tipIndex}
                      className="flex items-start gap-3 p-4 bg-ds-white/70 rounded-2xl border border-ds-gray/20 transition-all duration-300"
                      style={{
                        borderColor: "rgba(229, 231, 235, 0.2)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(91, 115, 255, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(229, 231, 235, 0.2)";
                      }}
                    >
                      <div className="text-xl">{emoji}</div>
                      <div className="flex-1 text-sm text-ds-text-body font-medium leading-relaxed">
                        {text}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                className="group/btn relative w-full text-ds-white py-3 px-6 rounded-2xl transition-all duration-300 shadow-modern hover:shadow-modern-hover font-semibold overflow-hidden"
                style={{ backgroundColor: "#5B73FF" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#445CE0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#5B73FF";
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Explore Full Plan</span>
                  <span className="text-lg group-hover/btn:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
                <div
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(90deg, #445CE0 0%, #3346B3 100%)",
                  }}
                ></div>
              </button>
            </div>

            {/* Bottom accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              style={{
                background: "linear-gradient(90deg, #5B73FF 0%, #445CE0 100%)",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
