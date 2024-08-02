import React, { useEffect, useState } from "react";
import { BaseDialog, DialogContent } from "@components/Dialog";
import { UserType } from "@services/kasSubmission";
import useGetUser from "../hooks/useGetUser";
import glassmorphism from "@utils/glassmorphism";
import { Search } from "@mui/icons-material";
import { DialogTitle } from "@mui/material";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DialogUsers: React.FC<Props> = ({ isOpen, onClose }) => {
  const { users, loading, fetchUsers, selectUser } = useGetUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [activeNpm, setActiveNpm] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
      const storedUser = localStorage.getItem("selectedUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setActiveNpm(user.npm);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.npm.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, users]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleUserSelect = (user: UserType) => {
    selectUser(user);
    setActiveNpm(user.npm);
    localStorage.setItem("selectedUser", JSON.stringify(user));
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
        {filteredUsers.length === 0 ? (
          <div className="italic text-neutral-300">
            Note: If npm is not found, please register your account to admin
          </div>
        ) : (
          ""
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
            className={`w-full pl-10 pr-4 py-2 focus:border-cyan-500 rounded-lg outline-none ${glassmorphism({ container: true })}`}
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
                  className={`cursor-pointer p-2 my-2 rounded-lg ${glassmorphism({ hover: true })} ${user.npm === activeNpm ? glassmorphism({ container: true }) : ""}`}
                >
                  {user.npm} - {user.name}
                </div>
              ))
            ) : (
              <div className="text-center text-neutral-300">
                NPM is not found
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </BaseDialog>
  );
};

export default DialogUsers;
