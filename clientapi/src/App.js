import "./App.css";
import Sidebar from "./components/navigation/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* Importando paginas de almacen */
import {
  Home,
  List,
  ShowInventory,
} from "./components/pages/Warehouse/WarehouseIndex";
import { AboutUs, OurAim, OurVision } from "./components/pages/AboutUs";
import {
  Services,
  ServicesOne,
  ServicesTwo,
  ServicesThree,
} from "./components/pages/Services";
import { Events, EventsOne, EventsTwo } from "./components/pages/Events";
import Contact from "./components/pages/ContactUs";
import Support from "./components/pages/Support";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        {/* Alamacenes */}
        <Route path="/warehouses" element={<Home />} />
        <Route path="/warehouses/list" element={<List />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/about-us/aim" element={<OurAim />} />
        <Route path="/about-us/vision" element={<OurVision />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/services1" element={<ServicesOne />} />
        <Route path="/services/services2" element={<ServicesTwo />} />
        <Route path="/services/services3" element={<ServicesThree />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/events1" element={<EventsOne />} />
        <Route path="/events/events2" element={<EventsTwo />} />
        <Route path="/support" element={<Support />} />
        <Route path="/OpWarehouseEast/Inventory" element={<ShowInventory />} />
      </Routes>
    </Router>
  );
}

export default App;
