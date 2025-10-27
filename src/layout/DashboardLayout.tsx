'use client'
import { Sidebar } from "@/components";
import { useThemeContext } from "@/context/ThemeContext";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { toggleTheme } = useThemeContext();
  return (
    <div className="layout">
      <Sidebar onThemeToggle={toggleTheme} />
      <main className="layout__content">
        <div className="layout__container">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
