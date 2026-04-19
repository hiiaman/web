import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@config/routes";
import { LanguageSwitcher } from "@shared/components/ui";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: Props) {
  const { t } = useTranslation();

  const navItems = [
    { to: ROUTES.SWIPE,   label: t("nav.discover"), icon: "🐾" },
    { to: ROUTES.MY_PETS, label: t("nav.myPets"),   icon: "🐶" },
    { to: ROUTES.MATCHES, label: t("nav.matches"),  icon: "💬" },
  ];

  return (
    <>
      {/* Backdrop — mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-gray-200 bg-white transition-transform duration-200",
          "md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-16 items-center px-6">
          <span className="text-xl font-bold text-brand-500">🐾 Zommie</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-600 hover:bg-gray-100",
                ].join(" ")
              }
            >
              <span>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-gray-100 px-4 py-4">
          <LanguageSwitcher />
        </div>
      </aside>
    </>
  );
}
