import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import DoctorDetail from "./pages/DoctorDetail";
import PatientProfile from "./pages/PatientProfile";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-ds-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctor/:id" element={<DoctorDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<PatientProfile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
