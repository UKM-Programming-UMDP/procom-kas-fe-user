import { useState, useEffect, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Search } from "@mui/icons-material";
import glassmorphism from "@utils/glassmorphism";
import DialogUsers from "./DialogUsers";
import useGetUser from "../hooks/useGetUser";
import { LocalStorage } from "@utils/localStorage";

const SearchUser = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {control, getValues, setValue } = useFormContext();
  const {fetchUsers, handleActiveUser } = useGetUser();
  const {getItem} = LocalStorage("user.npm");
  const active= handleActiveUser();

  useEffect(() => {
    const storedNpm = getItem();
    if (!getValues("user.npm") && storedNpm) {
      fetchUsers();
      setValue("user.npm", storedNpm);
    }
  }, [setValue, fetchUsers]);

  const handleOpenDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <div className="mb-3">
      <Controller
        name="user.npm"
        control={control}
        defaultValue="user.npm"
        render={({ fieldState }) => (
          <>
            <button
              type="button"
              className={`w-full flex items-center gap-2 rounded-lg py-2 px-3 ${glassmorphism({ container: true, border: true })}`}
              onClick={handleOpenDialog}
            >
              <Search />
              {active ? `${active.npm} - ${active.name}` : "Select a user"}
            </button>
            <div className="text-red-500 text-sm mt-2">
              {fieldState.error?.message}
            </div>
          </>
        )}
      />
      {isDialogOpen && (
        <DialogUsers isOpen={isDialogOpen} onClose={handleCloseDialog} />
      )}
    </div>
  );
};

export default SearchUser;
