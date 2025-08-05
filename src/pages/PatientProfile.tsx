import { useState } from "react";

export default function PatientProfile() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-ds-light-gray to-ds-bg-highlight">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-modern border border-ds-gray/20 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-4xl text-white shadow-modern"
                style={{ backgroundColor: "#5B73FF" }}
              >
                👤
              </div>
              <div>
                <h1 className="text-3xl font-bold text-ds-dark-gray mb-2">
                  Emily Johnson
                </h1>
                <div className="flex items-center gap-4 text-ds-text-body">
                  <span>📧 emily.johnson@email.com</span>
                  <span>📱 +1 (555) 123-4567</span>
                  <span>🎂 March 15, 1985</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                className="px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-300 shadow-modern hover:shadow-modern-hover"
                style={{ backgroundColor: "#5B73FF" }}
              >
                📅 Book Appointment
              </button>
              <button
                className="px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
                style={{
                  backgroundColor: "rgba(91, 115, 255, 0.1)",
                  color: "#5B73FF",
                }}
              >
                💬 Message Doctor
              </button>
            </div>
          </div>

          {/* Emergency Info Card */}
          <div
            className="mt-6 p-4 rounded-2xl border-2 border-dashed"
            style={{
              borderColor: "#FF4D4F",
              backgroundColor: "rgba(255, 77, 79, 0.05)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🚨</span>
              <h3 className="font-bold text-ds-dark-gray">
                Emergency Information
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Allergies:</strong> Penicillin, Shellfish, Pollen
              </div>
              <div>
                <strong>Conditions:</strong> Type 2 Diabetes, Hypertension
              </div>
              <div>
                <strong>Emergency Contact:</strong> Michael Johnson - +1 (555)
                987-6543
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-modern border border-ds-gray/20 p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "overview", label: "Overview", icon: "👤" },
              { id: "medical", label: "Medical Info", icon: "🏥" },
              { id: "appointments", label: "Appointments", icon: "📅" },
              { id: "tests", label: "Test Results", icon: "🔬" },
              { id: "metrics", label: "Health Metrics", icon: "📊" },
              { id: "insurance", label: "Insurance", icon: "💳" },
              { id: "documents", label: "Documents", icon: "📄" },
              { id: "settings", label: "Settings", icon: "⚙️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-white shadow-modern"
                    : "text-ds-text-body hover:bg-ds-light-gray/50"
                }`}
                style={{
                  backgroundColor:
                    activeTab === tab.id ? "#5B73FF" : "transparent",
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-3xl shadow-modern border border-ds-gray/20 p-8">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-bold text-ds-dark-gray mb-6">
                Profile Overview
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-ds-gray/20">
                      <span className="text-ds-text-body">Full Name:</span>
                      <span className="font-medium text-ds-dark-gray">
                        Emily Johnson
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-ds-gray/20">
                      <span className="text-ds-text-body">Date of Birth:</span>
                      <span className="font-medium text-ds-dark-gray">
                        March 15, 1985
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-ds-gray/20">
                      <span className="text-ds-text-body">Gender:</span>
                      <span className="font-medium text-ds-dark-gray">
                        Female
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-ds-gray/20">
                      <span className="text-ds-text-body">Email:</span>
                      <span className="font-medium text-ds-dark-gray">
                        emily.johnson@email.com
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-ds-gray/20">
                      <span className="text-ds-text-body">Phone:</span>
                      <span className="font-medium text-ds-dark-gray">
                        +1 (555) 123-4567
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Health Summary */}
                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                    Health Summary
                  </h3>
                  <div className="space-y-4">
                    <div
                      className="p-4 rounded-2xl"
                      style={{ backgroundColor: "rgba(91, 115, 255, 0.1)" }}
                    >
                      <h4 className="font-semibold text-ds-dark-gray mb-2">
                        Current Conditions
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: "rgba(255, 159, 67, 0.2)",
                            color: "#FF9F43",
                          }}
                        >
                          Type 2 Diabetes
                        </span>
                        <span
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: "rgba(255, 159, 67, 0.2)",
                            color: "#FF9F43",
                          }}
                        >
                          Hypertension
                        </span>
                      </div>
                    </div>

                    <div
                      className="p-4 rounded-2xl"
                      style={{ backgroundColor: "rgba(0, 176, 116, 0.1)" }}
                    >
                      <h4 className="font-semibold text-ds-dark-gray mb-2">
                        Next Appointment
                      </h4>
                      <p className="text-ds-text-body">
                        August 15, 2025 at 10:00 AM
                        <br />
                        <span className="font-medium">Dr. Sarah Smith</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "medical" && (
            <div>
              <h2 className="text-2xl font-bold text-ds-dark-gray mb-6">
                Medical Information
              </h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                    🏥 Chronic Conditions
                  </h3>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-ds-light-gray/50 border border-ds-gray/20">
                      <span className="font-medium text-ds-dark-gray">
                        Type 2 Diabetes
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-ds-light-gray/50 border border-ds-gray/20">
                      <span className="font-medium text-ds-dark-gray">
                        Hypertension
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                    ⚠️ Allergies
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-ds-light-gray/50 border border-ds-gray/20">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-ds-dark-gray">
                          Penicillin
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium text-red-600 bg-red-100">
                          Severe
                        </span>
                      </div>
                      <p className="text-sm text-ds-text-body mt-1">
                        Medication Allergy
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-ds-light-gray/50 border border-ds-gray/20">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-ds-dark-gray">
                          Shellfish
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium text-orange-600 bg-orange-100">
                          Moderate
                        </span>
                      </div>
                      <p className="text-sm text-ds-text-body mt-1">
                        Food Allergy
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-ds-light-gray/50 border border-ds-gray/20">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-ds-dark-gray">
                          Pollen
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-100">
                          Mild
                        </span>
                      </div>
                      <p className="text-sm text-ds-text-body mt-1">
                        Environmental Allergy
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                  💊 Current Medications
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-ds-dark-gray">
                        Metformin
                      </span>
                      <span className="text-sm text-ds-text-body">500mg</span>
                    </div>
                    <p className="text-sm text-ds-text-body">
                      Twice daily, with meals
                    </p>
                    <p className="text-xs text-ds-text-body mt-1">
                      For Type 2 Diabetes
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-ds-dark-gray">
                        Lisinopril
                      </span>
                      <span className="text-sm text-ds-text-body">10mg</span>
                    </div>
                    <p className="text-sm text-ds-text-body">
                      Once daily, morning
                    </p>
                    <p className="text-xs text-ds-text-body mt-1">
                      For Hypertension
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
            <div>
              <h2 className="text-2xl font-bold text-ds-dark-gray mb-6">
                Appointments
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Upcoming Appointments */}
                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                    📅 Upcoming
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-gradient-to-r from-blue-50 to-indigo-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-ds-dark-gray">
                            Regular Check-up
                          </h4>
                          <p className="text-sm text-ds-text-body">
                            Dr. Sarah Smith
                          </p>
                        </div>
                        <span className="text-sm font-medium text-blue-600">
                          Aug 15, 2025
                        </span>
                      </div>
                      <p className="text-sm text-ds-text-body">
                        10:00 AM - 11:00 AM
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-gradient-to-r from-green-50 to-emerald-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-ds-dark-gray">
                            Blood Work Follow-up
                          </h4>
                          <p className="text-sm text-ds-text-body">
                            Dr. Michael Chen
                          </p>
                        </div>
                        <span className="text-sm font-medium text-green-600">
                          Aug 22, 2025
                        </span>
                      </div>
                      <p className="text-sm text-ds-text-body">
                        2:00 PM - 2:30 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Appointments */}
                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                    📋 Recent
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-ds-dark-gray">
                            Annual Physical
                          </h4>
                          <p className="text-sm text-ds-text-body">
                            Dr. Sarah Smith
                          </p>
                        </div>
                        <span className="text-sm text-ds-text-body">
                          July 10, 2025
                        </span>
                      </div>
                      <p className="text-sm text-ds-text-body">Completed ✓</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tests" && (
            <div>
              <h2 className="text-2xl font-bold text-ds-dark-gray mb-6">
                Test Results & Reports
              </h2>

              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-ds-gray/20 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-ds-dark-gray">
                        Blood Panel - Comprehensive
                      </h3>
                      <p className="text-sm text-ds-text-body">July 10, 2025</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      Normal
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-ds-text-body">HbA1c</p>
                      <p className="font-medium text-ds-dark-gray">6.8%</p>
                    </div>
                    <div>
                      <p className="text-sm text-ds-text-body">Cholesterol</p>
                      <p className="font-medium text-ds-dark-gray">180 mg/dL</p>
                    </div>
                    <div>
                      <p className="text-sm text-ds-text-body">
                        Blood Pressure
                      </p>
                      <p className="font-medium text-ds-dark-gray">
                        130/85 mmHg
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-ds-dark-gray">
                        Chest X-Ray
                      </h3>
                      <p className="text-sm text-ds-text-body">June 15, 2025</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      Clear
                    </span>
                  </div>
                  <p className="text-sm text-ds-text-body">
                    No abnormalities detected. Lungs appear clear and healthy.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "metrics" && (
            <div>
              <h2 className="text-2xl font-bold text-ds-dark-gray mb-6">
                Health Metrics
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Vital Signs */}
                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                    📊 Current Vitals
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-gradient-to-r from-red-50 to-pink-50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-ds-dark-gray">
                          Blood Pressure
                        </span>
                        <span className="text-lg font-bold text-red-600">
                          130/85
                        </span>
                      </div>
                      <p className="text-sm text-ds-text-body">
                        mmHg - Last measured: Today
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-gradient-to-r from-blue-50 to-cyan-50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-ds-dark-gray">
                          Heart Rate
                        </span>
                        <span className="text-lg font-bold text-blue-600">
                          72
                        </span>
                      </div>
                      <p className="text-sm text-ds-text-body">
                        bpm - Last measured: Today
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-gradient-to-r from-green-50 to-emerald-50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-ds-dark-gray">
                          Weight
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          165
                        </span>
                      </div>
                      <p className="text-sm text-ds-text-body">
                        lbs - Last measured: July 10
                      </p>
                    </div>
                  </div>
                </div>

                {/* Health Goals */}
                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                    🎯 Health Goals
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-ds-dark-gray">
                          Daily Steps
                        </span>
                        <span className="text-sm text-ds-text-body">
                          7,500 / 10,000
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-ds-dark-gray">
                          Target Weight
                        </span>
                        <span className="text-sm text-ds-text-body">
                          165 / 160 lbs
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "insurance" && (
            <div>
              <h2 className="text-2xl font-bold text-ds-dark-gray mb-6">
                Insurance & Billing
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Insurance Information */}
                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                    💳 Insurance Details
                  </h3>
                  <div className="p-6 rounded-xl border border-ds-gray/20 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-ds-text-body">Provider:</span>
                        <span className="font-medium text-ds-dark-gray">
                          Blue Cross Blue Shield
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ds-text-body">
                          Policy Number:
                        </span>
                        <span className="font-medium text-ds-dark-gray">
                          BCBS-123456789
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ds-text-body">Group Number:</span>
                        <span className="font-medium text-ds-dark-gray">
                          GRP-987654
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ds-text-body">
                          Effective Date:
                        </span>
                        <span className="font-medium text-ds-dark-gray">
                          January 1, 2025
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Bills */}
                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                    🧾 Recent Bills
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-ds-dark-gray">
                            Annual Physical
                          </p>
                          <p className="text-sm text-ds-text-body">
                            July 10, 2025
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">$0.00</p>
                          <p className="text-xs text-ds-text-body">Covered</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-ds-dark-gray">
                            Blood Work
                          </p>
                          <p className="text-sm text-ds-text-body">
                            July 10, 2025
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-orange-600">$25.00</p>
                          <p className="text-xs text-ds-text-body">Copay</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div>
              <h2 className="text-2xl font-bold text-ds-dark-gray mb-6">
                Documents & Files
              </h2>

              <div className="space-y-6">
                {/* Document Categories */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl border border-ds-gray/20 bg-gradient-to-br from-blue-50 to-indigo-50 text-center">
                    <div className="text-4xl mb-3">📋</div>
                    <h3 className="font-semibold text-ds-dark-gray mb-2">
                      Medical Records
                    </h3>
                    <p className="text-sm text-ds-text-body">3 files</p>
                  </div>

                  <div className="p-6 rounded-xl border border-ds-gray/20 bg-gradient-to-br from-green-50 to-emerald-50 text-center">
                    <div className="text-4xl mb-3">🔬</div>
                    <h3 className="font-semibold text-ds-dark-gray mb-2">
                      Lab Results
                    </h3>
                    <p className="text-sm text-ds-text-body">5 files</p>
                  </div>

                  <div className="p-6 rounded-xl border border-ds-gray/20 bg-gradient-to-br from-purple-50 to-violet-50 text-center">
                    <div className="text-4xl mb-3">💳</div>
                    <h3 className="font-semibold text-ds-dark-gray mb-2">
                      Insurance
                    </h3>
                    <p className="text-sm text-ds-text-body">2 files</p>
                  </div>
                </div>

                {/* Recent Documents */}
                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                    📄 Recent Documents
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📋</span>
                        <div>
                          <p className="font-medium text-ds-dark-gray">
                            Annual Physical Report
                          </p>
                          <p className="text-sm text-ds-text-body">
                            Uploaded July 10, 2025
                          </p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                        View
                      </button>
                    </div>

                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🔬</span>
                        <div>
                          <p className="font-medium text-ds-dark-gray">
                            Blood Panel Results
                          </p>
                          <p className="text-sm text-ds-text-body">
                            Uploaded July 10, 2025
                          </p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold text-ds-dark-gray mb-6">
                Privacy & Security Settings
              </h2>

              <div className="space-y-8">
                {/* Privacy Controls */}
                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                    🔒 Privacy Controls
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-ds-dark-gray">
                            Share data with research studies
                          </h4>
                          <p className="text-sm text-ds-text-body">
                            Help improve healthcare by sharing anonymized data
                          </p>
                        </div>
                        <div className="relative">
                          <input type="checkbox" className="sr-only" />
                          <div className="w-12 h-6 bg-gray-300 rounded-full cursor-pointer">
                            <div className="w-5 h-5 bg-white rounded-full shadow-md transform translate-x-6 transition-transform"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-ds-dark-gray">
                            Allow marketing communications
                          </h4>
                          <p className="text-sm text-ds-text-body">
                            Receive health tips and wellness information
                          </p>
                        </div>
                        <div className="relative">
                          <input type="checkbox" className="sr-only" />
                          <div className="w-12 h-6 bg-blue-500 rounded-full cursor-pointer">
                            <div className="w-5 h-5 bg-white rounded-full shadow-md transform translate-x-6 transition-transform"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                    🔔 Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-ds-dark-gray">
                            Appointment reminders
                          </h4>
                          <p className="text-sm text-ds-text-body">
                            Get notified 24 hours before appointments
                          </p>
                        </div>
                        <div className="relative">
                          <input type="checkbox" className="sr-only" />
                          <div className="w-12 h-6 bg-blue-500 rounded-full cursor-pointer">
                            <div className="w-5 h-5 bg-white rounded-full shadow-md transform translate-x-6 transition-transform"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-ds-dark-gray">
                            Test results available
                          </h4>
                          <p className="text-sm text-ds-text-body">
                            Immediate notification when results are ready
                          </p>
                        </div>
                        <div className="relative">
                          <input type="checkbox" className="sr-only" />
                          <div className="w-12 h-6 bg-blue-500 rounded-full cursor-pointer">
                            <div className="w-5 h-5 bg-white rounded-full shadow-md transform translate-x-6 transition-transform"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-gray mb-4">
                    🛡️ Security
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30 text-left hover:bg-ds-light-gray/50 transition-colors">
                      <h4 className="font-medium text-ds-dark-gray">
                        Change Password
                      </h4>
                      <p className="text-sm text-ds-text-body">
                        Update your account password
                      </p>
                    </button>

                    <button className="w-full p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30 text-left hover:bg-ds-light-gray/50 transition-colors">
                      <h4 className="font-medium text-ds-dark-gray">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-ds-text-body">
                        Add an extra layer of security
                      </p>
                    </button>

                    <button className="w-full p-4 rounded-xl border border-ds-gray/20 bg-ds-light-gray/30 text-left hover:bg-ds-light-gray/50 transition-colors">
                      <h4 className="font-medium text-ds-dark-gray">
                        Download My Data
                      </h4>
                      <p className="text-sm text-ds-text-body">
                        Export all your health information
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
