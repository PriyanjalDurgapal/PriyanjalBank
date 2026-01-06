interface Props {
  label: string;
  name: string;
  options: string[];
  onChange: (e: any) => void;
}

const FormSelect = ({ label, options, ...props }: Props) => {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-400">
        {label}
      </label>
      <select
        {...props}
        className="w-full px-4 py-2 rounded-md bg-primary border border-gray-700
        focus:ring-2 focus:ring-accent outline-none"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
