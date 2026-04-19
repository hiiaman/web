import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@config/routes";

export default function BottomNav() {
  const { t } = useTranslation();

  const navItems = [
    { to: ROUTES.SWIPE,   label: t("nav.discover"), icon: "🐾" },
    { to: ROUTES.MY_PETS, label: t("nav.myPets"),   icon: "🐶" },
    { to: ROUTES.MATCHES, label: t("nav.matches"),  icon: "💬" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-gray-200 bg-white md:hidden">
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            [
              "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-xs font-medium transition-colors",
              isActive ? "text-brand-600" : "text-gray-500",
            ].join(" ")
          }
        >
          <span className="text-xl">{icon}</span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
