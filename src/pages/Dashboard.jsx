import { useState, memo } from "react";
import { FaClock, FaUmbrellaBeach, FaWallet, FaBars } from "react-icons/fa";
import { Button } from "../components/Button";

const menuItems = [
  { id: "shift", label: "Start Shift", icon: FaClock },
  { id: "leaves", label: "Leaves", icon: FaUmbrellaBeach },
  { id: "salary", label: "Salary", icon: FaWallet },
];

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

  const renderContent = () => {
    switch (active){
        case "shift":
            return (
                <div className="p-6 bg-white rounded-2xl shadow-md"></div>
            )
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-64" : "w-20"
        } bg-white shadow-lg flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-400">
          <h1 className={`text-xl font-bold text-red-400 ${!open && "hidden"}`}>
            Workspace
          </h1>
          <button className="cursor-pointer" onClick={() => setOpen(!open)}>
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center w-full px-3 py-2 rounded-lg transition cursor-pointer ${
                active === item.id
                  ? "bg-red-400 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{item.icon}</span>
              {open && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {active === "shift" && (
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Start Shift</h2>
            <Button label="Start Now" />
          </div>
        )}

        {active === "leaves" && (
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Leaves</h2>
            <p className="text-gray-600">You have 5 leaves remaining.</p>
          </div>
        )}

        {active === "salary" && (
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Salary</h2>
            <p className="text-gray-600">Your last credited salary: ₹50,000</p>
          </div>
        )}
      </div>
    </div>
  );
}
