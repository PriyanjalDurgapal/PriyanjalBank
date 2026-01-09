interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-gray-300">
        Page {page + 1} of {totalPages}
      </span>

      <button
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
