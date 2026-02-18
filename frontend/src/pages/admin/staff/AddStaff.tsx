import { useState } from "react";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import FormTextarea from "../../../components/form/FormTextarea";
import FormSection from "../../../components/form/FormSection";
import { createStaff } from "../../../api/staffapi/AddStaff";
import Popup from "../../../components/ui/Popup";
import FormFileInput from "../../../components/form/FormFileInput";

const initialFormState = {
  fullName: "",
  dob: "",
  gender: "",
  maritalStatus: "",
  photo: null as File | null,
  email: "",
  mobile: "",
  address: "",
  salary: "",
  workSchedule: "",
  manager: "",
  notes: "",
  role: "STAFF", // ✅ Added role
};

const AddStaff = () => {
  const [form, setForm] = useState(initialFormState);
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files) {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const requiredFields = [
      "fullName",
      "dob",
      "gender",
      "email",
      "mobile",
      "address",
      "role",
    ];

    for (const key of requiredFields) {
      if (!form[key as keyof typeof form]) {
        setPopup({
          message: "Please fill all required fields",
          type: "error",
        });
        return;
      }
    }

    try {
      const formData = new FormData();

      const { photo, ...staffData } = form;

      formData.append(
        "data",
        new Blob([JSON.stringify(staffData)], {
          type: "application/json",
        })
      );

      if (photo) {
        formData.append("photo", photo);
      }

      await createStaff(formData);

      setPopup({
        message:
          "Staff created successfully. Temporary password sent via email.",
        type: "success",
      });

      setForm(initialFormState);
    } catch (err: any) {
      setPopup({
        message: err.response?.data?.message || "Failed to create staff",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">
        Add New Staff / Employee
      </h1>

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
          <FormInput
            name="maritalStatus"
            label="Marital Status"
            value={form.maritalStatus}
            onChange={handleChange}
          />
          <FormFileInput
            name="photo"
            label="Photograph"
            onChange={handleChange}
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

        <FormSection title="Work Details">
          <FormSelect
            name="role"
            label="Role"
            options={["STAFF", "MANAGER", "TELLER"]}
            value={form.role}
            onChange={handleChange}
            required
          />
          <FormInput
            name="salary"
            label="Salary / Pay Grade"
            value={form.salary}
            onChange={handleChange}
          />
          <FormInput
            name="workSchedule"
            label="Work Schedule / Shifts"
            value={form.workSchedule}
            onChange={handleChange}
          />
          <FormInput
            name="manager"
            label="Manager / Reporting Authority"
            value={form.manager}
            onChange={handleChange}
          />
          <FormTextarea
            name="notes"
            label="Internal Notes / Special Instructions"
            value={form.notes}
            onChange={handleChange}
          />
        </FormSection>

        <button
          type="submit"
          className="w-full bg-accent text-black py-3 rounded-lg font-semibold hover:bg-accentHover transition"
        >
          Create Staff
        </button>
      </form>
    </div>
  );
};

export default AddStaff;