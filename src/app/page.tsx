import Button from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import Dropdown from "@/components/ui/Dropdown";
import FilterCheckbox from "@/components/ui/FilterCheckbox";
import InvoiceCard from "@/components/shared/InvoiceCard";
import Sidebar from "@/components/shared/Sidebar";
import StatusBadge from "@/components/shared/StatusBadge";
import TextInput from "@/components/ui/TextInput";
import Image from "next/image";
import InvoicesPage from "@/components/custom/InvoiceOverview";

export default function Home() {
  return (
    <div>
      {/* <Button variant="ghost">Home</Button>
      <TextInput label="Username" placeholder="Enter your username" />
      <Dropdown />
      <DatePicker />
      <FilterCheckbox />

      <StatusBadge status="paid" /> */}
      {/* <InvoiceCard invoice={}/> */}

      <InvoicesPage />
    </div>
  );
}
