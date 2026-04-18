import { useQuery } from "@tanstack/react-query";
import { useState, type PropsWithChildren } from "react";

import { getUserInfo } from "@/services/users.service";
import type { UpdateUserData, UserStatsInterface } from "@/interfaces/user";

import { UserContext } from "./UserContext";

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [userData, setUserData] = useState({} as UserStatsInterface);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      try {
        const user = await getUserInfo();
        setUserData(user);
        setIsLoggingOut(false);
        return user;
      } catch {
        setUserData({} as UserStatsInterface);

        return {};
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const updateUserData = (data: UpdateUserData) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const changePostCount = (add: boolean) => {
    setUserData((prev) => ({
      ...prev,
      postsCount: prev.postsCount + (add ? 1 : -1),
    }));
  };

  const changeCommentCount = (add: boolean) => {
    setUserData((prev) => ({
      ...prev,
      commentsCount: prev.commentsCount + (add ? 1 : -1),
    }));
  };

  const updateLikeCount = (action: "like" | "unlike") => {
    setUserData((prev) => ({
      ...prev,
      likesCount: action === "like" ? prev.likesCount + 1 : prev.likesCount - 1,
    }));
  };

  const logoutUser = () => {
    setIsLoggingOut(true);
    setUserData({} as UserStatsInterface);
  };

  return (
    <UserContext.Provider
      value={{
        userId: userData._id,
        userData,
        isLoading: isLoading || isLoggingOut,
        updateUserData,
        changeCommentCount,
        changePostCount,
        updateLikeCount,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
