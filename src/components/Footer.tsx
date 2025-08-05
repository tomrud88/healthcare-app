export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-ds-dark-gray to-ds-dark-gray/90 text-center py-12 mt-20 border-t border-ds-gray/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-ds-primary-blue to-ds-blue-hover rounded-xl flex items-center justify-center text-white font-bold">
            N
          </div>
          <span className="text-xl font-bold text-ds-white">
            NextGen Doctor
          </span>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-ds-primary-blue to-ds-blue-hover rounded-full mx-auto mb-6"></div>
        <p className="text-ds-text-label mb-4 max-w-md mx-auto">
          Transforming healthcare with innovative technology and compassionate
          care.
        </p>
        <p className="text-sm text-ds-text-timestamp">
          © {new Date().getFullYear()} NextGen Doctor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
