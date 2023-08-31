import "./App.css";
import Sidebar from "./components/navigation/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* Importando paginas de almacen */
import {
  Home,
  List,
  ShowInventory,
  AddProductsToWarehouse,
} from "./pages/Warehouse/WarehouseIndex";
/* Importando paginas de productos */
import { ProductList } from "./pages/Product/ProductIndex";
import { AboutUs, OurAim, OurVision } from "./pages/AboutUs";
import {
  Services,
  ServicesOne,
  ServicesTwo,
  ServicesThree,
} from "./pages/Services";
import { Events, EventsOne, EventsTwo } from "./pages/Events";
import Contact from "./pages/ContactUs";
import Support from "./pages/Support";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        {/* Alamacenes */}
        <Route path="/warehouses" element={<Home />} />
        <Route path="/warehouses/list" element={<List />} />
        <Route path="/Warehouse/Inventory" element={<ShowInventory />} />
        <Route
          path="/Warehouse/Inventory/AddProducts"
          element={<AddProductsToWarehouse />}
        />
        {/* Productos */}
        <Route path="/Products" element={<ProductList />} />
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
      </Routes>
    </Router>
  );
}

export default App;
