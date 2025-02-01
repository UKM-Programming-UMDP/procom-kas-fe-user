import React, { useEffect, useState } from "react";
import { BaseDialog, DialogContent, LoadingDialog } from "@components/Dialog";
import { UserModel } from "@api/kasSubmission/model";
import useGetUser from "../hooks/useGetUser";
import glassmorphism from "@utils/glassmorphism";
import { Search } from "@mui/icons-material";
import { DialogTitle } from "@mui/material";
import { userFilter } from "../List/utils/userFilter";
import { useFormContext } from "react-hook-form";
import { LocalStorage } from "@utils/localStorage";
import { SearchBar } from "@components/Input";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DialogUsers: React.FC<Props> = ({ isOpen, onClose }) => {
  const { users, loading, fetchUsers } = useGetUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserModel[]>([]);
  const { setValue, getValues } = useFormContext();
  const { setItem, getItem } = LocalStorage("user.npm");

  useEffect(() => {
    setValue("user.npm", getItem());
  }, [setValue]);

  useEffect(() => {
    setFilteredUsers(userFilter(users, searchTerm));
  }, [searchTerm, users]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleUserSelect = (user: UserModel) => {
    const selectedNpm = user.npm;
    setValue("user.npm", selectedNpm);
    setItem(selectedNpm);
    onClose();
  };

  return (
    <BaseDialog
      open={isOpen}
      onClose={onClose}
      title="Search your NPM"
      message={
        filteredUsers.length === 0
          ? "Note: If npm is not found, please register your account with admin."
          : ""
      }
    >
      <DialogTitle fontSize="0.9rem">
        <div>Search Your NPM</div>
        {filteredUsers.length === 0 && (
          <div className="italic text-neutral-300"></div>
        )}
      </DialogTitle>
      <DialogContent>
        <div className="relative mb-2">
          <SearchBar
            placeholder="Search..."
            onChange={handleSearchChange}
            className={`w-full pl-10 pr-4 py-20 focus:border-cyan-500 rounded-lg outline-none ${glassmorphism(
              {
                container: true,
              },
            )}`}
          />
        </div>
        {loading ? (
          <>Loading...</>
        ) : (
          <div className="snap-y overflow-y-auto max-h-[300px]">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.npm}
                  onClick={() => handleUserSelect(user)}
                  className={`cursor-pointer p-2 my-2 rounded-lg ${glassmorphism(
                    {
                      hover: true,
                    },
                  )} ${
                    user.npm === getValues("user.npm")
                      ? glassmorphism({ container: true })
                      : ""
                  }`}
                >
                  {user.npm} - {user.name}
                </div>
              ))
            ) : (
              <div className="text-center text-neutral-300">NPM not found</div>
            )}
          </div>
        )}
      </DialogContent>
    </BaseDialog>
  );
};

export default DialogUsers;
