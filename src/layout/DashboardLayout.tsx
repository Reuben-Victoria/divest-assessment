import { Sidebar } from "@/components";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="layout__content">
        <div className="layout__container">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;