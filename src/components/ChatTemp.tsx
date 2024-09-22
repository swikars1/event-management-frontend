"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSocketConnect } from "@/hooks/useSocketConnect";
import { useSocketConnectionLogs } from "@/hooks/useSocketConnectionLogs";
import { useSocketRegister } from "@/hooks/useSocketRegister";
import { socket } from "@/lib/socket";
import { useState, useEffect, FormEvent } from "react";

type OnlineUser = { id: string; email: string; role: "ADMIN" | "USER" };
export function ChatTemp() {
  const [messages, setMessages] = useState<{ id: string; message: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  useSocketConnect();
  useSocketConnectionLogs();
  useSocketRegister();

  // useEffect(() => {
  //   function onMsg(message: {}) {
  //     setMessages(messages.concat(message));
  //   }

  //   socket.on("msg_received", onMsg);

  //   return () => {
  //     socket.off("msg_received", onMsg);
  //   };
  // }, [messages]);

  useEffect(() => {
    function onMsg(data: { message: string }) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), message: data.message },
      ]);
      console.log("send_msg_to_user", data.message);
    }
    socket.on("send_msg_to_user", onMsg);

    return () => {
      socket.off("send_msg_to_user", onMsg);
    };
  }, [messages]);

  useEffect(() => {
    function onMsg(data: { message: string }) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), message: data.message },
      ]);
      console.log("send_msg_to_user", data.message);
    }
    socket.on("send_msg_to_user", onMsg);

    return () => {
      socket.off("send_msg_to_user", onMsg);
    };
  }, [messages]);

  useEffect(() => {
    function onOnlineUsers(users: OnlineUser[]) {
      setOnlineUsers(users);
      console.log("Online users updated:", users);
    }
    socket.on("online_users", onOnlineUsers);

    return () => {
      socket.off("online_users", onOnlineUsers);
    };
  }, []);

  console.log({ messages });

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    socket.emit("msg_sent_from_user", { message: input });
    setMessages([...messages, { id: Date.now().toString(), message: input }]);
    setInput("");
  }

  console.log({ onlineUsers });

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Link
          href="#"
          className="flex items-center gap-2"
          prefetch={false}
        ></Link>
      </header>
      <main className="flex-1 p-4 sm:px-6 sm:py-0">
        <div className="bg-background rounded-lg shadow-sm">
          <div className="border-b px-4 py-3 font-semibold flex justify-between items-center">
            <span>Chat with our Admin</span>
            <span className="text-sm text-muted-foreground">
              {onlineUsers.some((a) => a.role === "ADMIN")
                ? "🟢 Admin is online."
                : "🔴 Admin is offline. "}
            </span>
          </div>
          <div className="p-4 space-y-4">
            {messages.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 grid gap-1">
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">
                    {item.message}
                  </div>
                  <div className="text-xs text-muted-foreground">2h</div>
                </div>
              </div>
            ))}

            <form onSubmit={sendMessage}>
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg bg-muted px-4 py-2"
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button type="submit">Send</Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

function BookAIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="m8 13 4-7 4 7" />
      <path d="M9.1 11h5.7" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
