import { UserContext } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/users.service";
import { useState, type PropsWithChildren } from "react";
import type { UserStatsInterface } from "../../interfaces/user";

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [userData, setUserData] = useState({} as UserStatsInterface);

  const { isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const user = await getUserInfo();
      setUserData(user);

      return user;
    },
  });

  const updateLikeCount = (action: "like" | "unlike") => {
    setUserData((prev) => ({
      ...prev,
      likesCount: action === "like" ? prev.likesCount + 1 : prev.likesCount - 1,
    }));
  };

  const addUserComment = () => {
    setUserData((prev) => ({
      ...prev,
      commentsCount: prev.commentsCount + 1,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        userId: userData._id,
        userData,
        isLoading,
        addUserComment,
        updateLikeCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
