interface Props {
  label: string;
  name: string;
  type?: string;
  value: string;
  required?: boolean;
  onChange: (e: any) => void;
}

const FormInput = ({
  label,
  type = "text",
  ...props
}: Props) => {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-400">
        {label}
      </label>
      <input
        type={type}
        {...props}
        className="w-full px-4 py-2 rounded-md bg-primary border border-gray-700
        focus:ring-2 focus:ring-accent outline-none"
      />
    </div>
  );
};

export default FormInput;
