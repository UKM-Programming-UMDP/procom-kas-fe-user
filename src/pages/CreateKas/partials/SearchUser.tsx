import { useState, useEffect, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Search } from "@mui/icons-material";
import glassmorphism from "@utils/glassmorphism";
import DialogUsers from "./DialogUsers";
import useGetUser from "../hooks/useGetUser";
import { LocalStorage } from "@utils/localStorage";

const SearchUser = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { control, getValues, setValue } = useFormContext();
  const { users, fetchUsers } = useGetUser();
  const { getItem } = LocalStorage("user.npm");

  const npm = getValues("user.npm");
  const activeUser = users.find((user) => user.npm === npm);

  useEffect(() => {
    if (!activeUser) {
      setValue("user.npm", getItem());
    }
  }, [setValue]);

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
        render={({ field, fieldState }) => (
          <>
            <button
              type="button"
              className={`w-full flex items-center gap-2 rounded-lg py-2 px-3 ${glassmorphism({ container: true, border: true })}`}
              onClick={handleOpenDialog}
            >
              <Search />

              {activeUser
                ? `${activeUser.npm} - ${activeUser.name}`
                : field.value || "Search..."}
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
