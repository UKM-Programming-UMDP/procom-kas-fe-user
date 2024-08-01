import glassmorphism from "@utils/glassmorphism";
import { useState } from "react";
import DialogUsers from "./DialogUsers";
import { Search } from "@mui/icons-material";
import useCreateKasSubmission from "../hooks/useCreateKasSubmission";
const SearchUser = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const { selectedUser, errors } = useCreateKasSubmission();

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="mb-3">
      <button
        type="button"
        className={`w-full flex items-center gap-2 rounded-lg py-2 px-3 ${glassmorphism({ container: true, border: true })}`}
        onClick={handleOpenDialog}
      >
        <Search />
        {selectedUser
          ? `${selectedUser.npm} - ${selectedUser.name}`
          : "Search..."}
      </button>
      {errors.user && <div className="text-red-600 mb-3">{errors.user}</div>}
      <DialogUsers isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </div>
  );
};
export default SearchUser;
