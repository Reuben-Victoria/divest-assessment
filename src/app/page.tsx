import Button from "@/components/shared/Button";
import DatePicker from "@/components/shared/DatePicker";
import Dropdown from "@/components/shared/Dropdown";
import FilterCheckbox from "@/components/shared/FilterCheckbox";
import Sidebar from "@/components/shared/Sidebar";
import StatusBadge from "@/components/shared/StatusBadge";
import TextInput from "@/components/shared/TextInput";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Sidebar userName="John Doe" />
      <Button variant="ghost">Home</Button>
      <TextInput label="Username" placeholder="Enter your username" />
      <Dropdown />
      <DatePicker/>
      <FilterCheckbox />

      <StatusBadge status="paid" />
    </div>
  );
}
