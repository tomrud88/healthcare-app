export default function DigitalCheckinDemo() {
  return (
    <div className="relative">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-ds-primary-blue to-ds-blue-hover rounded-2xl flex items-center justify-center text-3xl text-white shadow-modern">
          📱
        </div>
        <h3 className="text-2xl font-bold text-ds-dark-gray mb-2">
          Digital Check-in Demo
        </h3>
        <p className="text-ds-text-body">Skip the waiting room queues</p>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="bg-gradient-to-br from-ds-light-gray to-ds-white p-6 rounded-3xl shadow-modern border border-ds-gray/20">
              {/* QR Code placeholder with modern styling */}
              <div className="w-32 h-32 bg-gradient-to-br from-ds-dark-gray to-ds-dark-gray/80 rounded-2xl flex items-center justify-center text-ds-white text-4xl shadow-inner-glow">
                📱
              </div>
            </div>
            {/* Floating scan indicator */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-ds-success-green rounded-full flex items-center justify-center animate-pulse-slow">
              <div className="w-2 h-2 bg-ds-white rounded-full"></div>
            </div>
          </div>

          <p className="text-sm text-ds-text-body mb-6 max-w-xs mx-auto leading-relaxed">
            Scan this QR code from your appointment reminder or enter your
            details manually below
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-ds-primary-blue/5 to-ds-blue-hover/5 rounded-2xl"></div>
          <div className="relative bg-ds-white/80 backdrop-blur-sm rounded-2xl p-6 border border-ds-primary-blue/20">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ds-dark-gray mb-2">
                  Appointment ID
                </label>
                <input
                  type="text"
                  placeholder="Enter your appointment ID"
                  className="w-full px-4 py-3 border border-ds-gray/30 rounded-2xl bg-ds-white text-ds-dark-gray placeholder-ds-text-placeholder focus:border-ds-primary-blue focus:shadow-ds-input-focus outline-none transition-all duration-300 font-medium"
                />
              </div>

              <button className="group relative w-full bg-ds-primary-blue text-ds-white py-3 px-6 rounded-2xl hover:bg-ds-blue-hover active:bg-ds-blue-pressed transition-all duration-300 shadow-modern hover:shadow-modern-hover font-semibold overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Check In Now</span>
                  <span className="text-lg">→</span>
                </span>
                <div className="absolute inset-0 bg-ds-button-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-ds-success-green rounded-full animate-pulse"></div>
            <span className="text-ds-text-body">System Online</span>
          </div>
          <div className="w-1 h-1 bg-ds-gray rounded-full"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-ds-primary-blue rounded-full"></div>
            <span className="text-ds-text-body">Instant Processing</span>
          </div>
        </div>
      </div>
    </div>
  );
}
