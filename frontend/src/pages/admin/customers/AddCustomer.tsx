import { useState } from "react";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import FormTextarea from "../../../components/form/FormTextarea";
import FormSection from "../../../components/form/FormSection";

const AddCustomer = () => {
  const [form, setForm] = useState<any>({});

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Add New Customer</h1>

      <form className="bg-secondary p-6 rounded-xl border border-gray-800 space-y-6">

        <FormSection title="Basic Information">
          <FormInput name="fullName" label="Full Name" onChange={handleChange} />
          <FormInput name="dob" label="Date of Birth" type="date" onChange={handleChange} />
          <FormSelect name="gender" label="Gender" options={["Male", "Female", "Other"]} onChange={handleChange} />
        </FormSection>

        <FormSection title="Contact Details">
          <FormInput name="mobile" label="Mobile Number" onChange={handleChange} />
          <FormInput name="email" label="Email" onChange={handleChange} />
          <FormTextarea name="address" label="Address" onChange={handleChange} />
        </FormSection>

        <button className="w-full bg-accent text-black py-3 rounded-lg font-semibold">
          Create Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
