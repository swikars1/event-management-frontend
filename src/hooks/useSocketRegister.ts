import { socket } from "@/lib/socket";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useEffect } from "react";

export const useSocketRegister = () => {
  const [currentUserId] = useLocalStorage({
    key: "currentUserId",
    initialValue: "",
  });

  useEffect(() => {
    socket.emit("register", { currentUserId, isAdmin: false });

    return () => {
      socket.off("register");
    };
  }, [currentUserId]);
};
