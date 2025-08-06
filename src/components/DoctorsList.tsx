import type { DoctorWithAvailability } from "../utils/consultationUtils";

interface DoctorsListProps {
  doctors: DoctorWithAvailability[];
  onDoctorSelect: (doctor: DoctorWithAvailability) => void;
}

export default function DoctorsList({
  doctors,
  onDoctorSelect,
}: DoctorsListProps) {
  return (
    <div className="space-y-3">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Available Doctors
        </h3>
      </div>
      <div className="grid gap-3">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-all duration-300 cursor-pointer hover:shadow-md"
            onClick={() => onDoctorSelect(doctor)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{doctor.name}</h4>
                <p className="text-gray-600">{doctor.specialty}</p>
                <p className="text-sm text-green-600">{doctor.availability}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
