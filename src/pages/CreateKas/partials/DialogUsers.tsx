import React, { useEffect } from "react";
import { BaseDialog, DialogContent } from "@components/Dialog";
import { useFormContext } from "react-hook-form";
import { SearchBar } from "@components/Input";
import { LoadingDialog } from "@components/Dialog";
import useGetUser from "../hooks/useUser";
import glassmorphism from "@utils/glassmorphism";
import { useLocalStorage } from "@utils/localStorage";
import { UserModel } from "@api/kasSubmission/model";
import useUserFilter from "../List/hooks/useUserFilter";
import { useCreateKasContext } from "../context";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DialogUsers: React.FC<Props> = ({ isOpen, onClose }) => {
  const { handleChangeSearch } = useUserFilter();
  const { setValue, getValues } = useFormContext();
  const { setItem } = useLocalStorage();
  const { state } = useCreateKasContext();
  const { userLoading, user } = state;
  const { fetchUsers } = useGetUser();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelect = (selectedUser: UserModel) => {
    const selectedNpm = selectedUser.npm;
    setValue("user.npm", selectedNpm);
    setItem("user.npm", selectedNpm);
    onClose();
  };

  return (
    <BaseDialog
      open={isOpen}
      onClose={onClose}
      title="Search Your NPM"
      message={
        user.length === 0
          ? "Note: If npm is not found, please register your account with admin."
          : ""
      }
    >
      <DialogContent>
        <div className="relative mb-2">
          <SearchBar
            placeholder="Search..."
            onChange={handleChangeSearch}
            className={`w-full pl-10 pr-4 py-2 focus:border-cyan-500 rounded-lg outline-none ${glassmorphism(
              {
                container: true,
              },
            )}`}
          />
        </div>

        {userLoading && <LoadingDialog open={isOpen} onClose={onClose} />}
        <div className="snap-y overflow-y-auto max-h-[300px]">
          {user?.map((item, index) => (
            <div
              key={index}
              onClick={() => handleUserSelect(item)}
              className={`cursor-pointer p-2 my-2 rounded-lg ${glassmorphism({
                hover: true,
              })} ${item.npm === getValues("user.npm") && glassmorphism({ container: true })}`}
            >
              {item.npm} - {item.name}
            </div>
          ))}

          {user.length == 0 && (
            <div className="text-center text-neutral-300">NPM not found</div>
          )}
        </div>
      </DialogContent>
    </BaseDialog>
  );
};

export default DialogUsers;
