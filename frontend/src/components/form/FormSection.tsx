const FormSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-accent">
        {title}
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
