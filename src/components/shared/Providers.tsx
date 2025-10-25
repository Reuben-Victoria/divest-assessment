import Sidebar from "./Sidebar";
interface ProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <div className="provider">
      <Sidebar />
      <main className="provider__content">
        <div className="provider__container">{children}</div>
      </main>
    </div>
  );
};

export default Providers;
