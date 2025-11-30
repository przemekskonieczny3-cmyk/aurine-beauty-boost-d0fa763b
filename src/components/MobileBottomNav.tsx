import { Home, FileText, Receipt, FileSignature } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: "Główna",
      path: "/",
    },
    {
      icon: FileText,
      label: "Raporty",
      path: "/report-generator",
    },
    {
      icon: Receipt,
      label: "Faktury",
      path: "/invoice-generator",
    },
    {
      icon: FileSignature,
      label: "Umowy",
      path: "/contract-generator",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-zinc-800 z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200 ${
                active
                  ? "text-pink-500"
                  : "text-zinc-400 active:scale-95"
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-all ${
                  active ? "scale-110" : ""
                }`}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
