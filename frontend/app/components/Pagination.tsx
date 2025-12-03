import { useNavigate } from "react-router";
import Button from "./Button";

export default function Pagination({
  currentPage,
  totalPages,
  redirectRoute,
}: {
  currentPage: number;
  totalPages: number;
  redirectRoute: string;
}) {
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    navigate(`${redirectRoute}?page=${newPage}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 my-8">
      <Button
        variant="secondary"
        text="Previous"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="secondary"
        text="Next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
}
