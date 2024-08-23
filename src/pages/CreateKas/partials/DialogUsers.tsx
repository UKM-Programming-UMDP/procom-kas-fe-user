import React, { useEffect, useState } from "react";
import { BaseDialog, DialogContent } from "@components/Dialog";
import { UserModel } from "@api/kasSubmission/model";
import useGetUser from "../List/hooks/useGetUser";
import glassmorphism from "@utils/glassmorphism";
import { Search } from "@mui/icons-material";
import { DialogTitle } from "@mui/material";
import { userFilter } from "../List/utils/userFilter";
import { useFormContext } from "react-hook-form";
import { LocalStorage } from "@utils/localStorage";

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
    fetchUsers();
    setValue("user.npm", getItem());
  }, [fetchUsers, setValue]);

  useEffect(() => {
    setFilteredUsers(userFilter(users, searchTerm));
  }, [searchTerm, users]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleUserSelect = (user: UserModel) => {
    const selectedNpm = user.npm;
    setValue("user.npm", selectedNpm);
    setItem(selectedNpm);
    onClose();
  };

  return (
    <BaseDialog open={isOpen} onClose={onClose}>
      <DialogTitle
        fontSize="0.9rem"
        sx={{
          padding: "0.8rem 1.2rem",
          backgroundColor: "#323232",
          borderBottom: "1px solid #55555590",
        }}
      >
        <div>Search Your NPM</div>
        {filteredUsers.length === 0 && (
          <div className="italic text-neutral-300">
            Note: If npm is not found, please register your account with admin.
          </div>
        )}
      </DialogTitle>
      <DialogContent>
        <div className="relative mb-2">
          <Search className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className={`w-full pl-10 pr-4 py-2 focus:border-cyan-500 rounded-lg outline-none ${glassmorphism(
              {
                container: true,
              },
            )}`}
          />
        </div>
        {loading ? (
          <div>Loading...</div>
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
                  )} ${user.npm === getValues("user.npm") ? glassmorphism({ container: true }) : ""}`}
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
