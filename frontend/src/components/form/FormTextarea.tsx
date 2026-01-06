interface Props {
  label: string;
  name: string;
  onChange: (e: any) => void;
}

const FormTextarea = ({ label, ...props }: Props) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm mb-1 text-gray-400">
        {label}
      </label>
      <textarea
        {...props}
        rows={3}
        className="w-full px-4 py-2 rounded-md bg-primary border border-gray-700
        focus:ring-2 focus:ring-accent outline-none"
      />
    </div>
  );
};

export default FormTextarea;
