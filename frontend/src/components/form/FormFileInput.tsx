interface FormFileInputProps {
  label: string;
  name: string;
  onChange: (e: any) => void;
  required?: boolean;
}

const FormFileInput = ({ label, name, onChange, required }: FormFileInputProps) => (
  <div>
    <label className="block text-sm mb-1 text-gray-400">{label}</label>
    <input
      type="file"
      name={name}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 rounded-md bg-primary border border-gray-700 focus:ring-2 focus:ring-accent outline-none"
    />
  </div>
);

export default FormFileInput;