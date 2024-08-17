import { UserModel } from "@api/kasSubmission/model";

export const userFilter = (users: UserModel[], searchTerm: string) => {
  return users.filter(
    (user) =>
      user.npm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};
