import { useState, memo } from "react";
import { FaClock, FaUmbrellaBeach, FaWallet, FaBars } from "react-icons/fa";
import { Button } from "../components/Button";

// Sidebar config
const menuItems = [
  { id: "shift", label: "Start Shift", icon: FaClock },
  { id: "leaves", label: "Leaves", icon: FaUmbrellaBeach },
  { id: "salary", label: "Salary", icon: FaWallet },
];

// Sidebar Item (memoized for performance)
const SidebarItem = memo(({ id, label, icon: Icon, active, open, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center w-full px-3 py-2 rounded-lg transition ${
      active === id
        ? "bg-red-400 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`}
  >
    <Icon size={20} />
    {open && <span className="ml-3">{label}</span>}
  </button>
));

export default function Dashboard() {
  const [active, setActive] = useState("shift");
  const [open, setOpen] = useState(true);

  // Render content based on active tab
  const renderContent = () => {
    switch (active) {
      case "shift":
        return (
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Start Shift</h2>
            <Button 
            label = "Start Now"
            />
          </div>
        );
      case "leaves":
        return (
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Leaves</h2>
            <p className="text-gray-600">You have 5 leaves remaining.</p>
          </div>
        );
      case "salary":
        return (
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Salary</h2>
            <p className="text-gray-600">Your last credited salary: ₹50,000</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-64" : "w-20"
        } bg-white shadow-lg flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`text-xl font-bold text-blue-600 ${!open && "hidden"}`}>
            Employee
          </h1>
          <button onClick={() => setOpen(!open)}>
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              {...item}
              active={active}
              open={open}
              onClick={setActive}
            />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}
