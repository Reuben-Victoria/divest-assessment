import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Dropdown from "@/components/Dropdown";
import FilterCheckbox from "@/components/FilterCheckbox";
import InvoiceCard from "@/components/InvoiceCard";
import Sidebar from "@/components/Sidebar";
import StatusBadge from "@/components/StatusBadge";
import TextInput from "@/components/TextInput";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Sidebar userName="John Doe" />
      <Button variant="ghost">Home</Button>
      <TextInput label="Username" placeholder="Enter your username" />
      <Dropdown />
      <DatePicker />
      <FilterCheckbox />

      <StatusBadge status="paid" />
      <InvoiceCard invoice={}/>
    </div>
  );
}
