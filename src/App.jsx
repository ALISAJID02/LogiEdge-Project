import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AddCustomer from "../src/pages/Customer/AddCustomer";
import Dashboard from "./pages/Dashboard";
import Master from "./pages/Master";
import Customers from "../src/pages/Customer/Customers";
import Items from "../src/pages/Items/Items";
import AddItem from "../src/pages/Items/AddItem";
import Bills from "../src/pages/Bills";
import Billing from "./pages/Billing";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/master" element={<Master />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/items" element={<Items />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/bills" element={<Bills />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
