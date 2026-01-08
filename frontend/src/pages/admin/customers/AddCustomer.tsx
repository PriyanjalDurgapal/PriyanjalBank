import { useState } from "react";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import FormTextarea from "../../../components/form/FormTextarea";
import FormSection from "../../../components/form/FormSection";
import { createCustomer } from "../../../api/AddCustomer";
import Popup from "../../../components/ui/Popup";

const initialFormState = {
  fullName: "",
  dob: "",
  gender: "",
  mobile: "",
  email: "",
  address: "",
};

const AddCustomer = () => {
  const [form, setForm] = useState(initialFormState);
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    
    for (const key in form) {
      if (!form[key as keyof typeof form]) {
        setPopup({
          message: "All fields are required",
          type: "error",
        });
        return;
      }
    }

    try {
      await createCustomer(form);
      setPopup({
        message: "Customer created successfully. Credentials sent via email.",
        type: "success",
      });
      setForm(initialFormState); 
    } catch (err: any) {
      setPopup({
        message: err.response?.data?.message || "Failed to create customer",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Add New Customer</h1>

      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-secondary p-6 rounded-xl border border-gray-800 space-y-6"
      >
        <FormSection title="Basic Information">
          <FormInput
            name="fullName"
            label="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <FormInput
            name="dob"
            label="Date of Birth"
            type="date"
            value={form.dob}
            onChange={handleChange}
            required
          />
          <FormSelect
            name="gender"
            label="Gender"
            options={["Male", "Female", "Other"]}
            value={form.gender}
            onChange={handleChange}
            required
          />
        </FormSection>

        <FormSection title="Contact Details">
          <FormInput
            name="mobile"
            label="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
          />
          <FormInput
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <FormTextarea
            name="address"
            label="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </FormSection>

        <button
          type="submit"
          className="w-full bg-accent text-black py-3 rounded-lg font-semibold hover:bg-accentHover transition"
        >
          Create Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
