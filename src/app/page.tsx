import Button from "@/components/shared/Button";
import DatePicker from "@/components/shared/DatePicker";
import Dropdown from "@/components/shared/Dropdown";
import FilterCheckbox from "@/components/shared/FilterCheckbox";
import TextInput from "@/components/shared/TextInput";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Button variant="ghost">Home</Button>
      <TextInput label="Username" placeholder="Enter your username" />
      <Dropdown />
      <DatePicker/>
      <FilterCheckbox />
    </div>
  );
}
