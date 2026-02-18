interface HighlightTextProps {
  text?: string | null;
  highlight?: string | null;
}

const HighlightText = ({ text, highlight }: HighlightTextProps) => {
  
  if (!text) return <span></span>;

 
  if (!highlight) return <span>{text}</span>;

  const regex = new RegExp(`(${highlight})`, "ig");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span
            key={i}
            className="bg-yellow-500 text-black px-1 rounded"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export default HighlightText;
