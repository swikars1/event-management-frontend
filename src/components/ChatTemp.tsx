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
import { useState, FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { API } from "@/lib/API";
import { useRef, useEffect } from "react";

type OnlineUser = { id: string; email: string; role: "ADMIN" | "USER" };

interface ChatHistoryMessage {
  id: string;
  chatId: string;
  senderId: string;
  message: string;
  createdAt: Date;
  sender: {
    id: string;
    email: string;
    role: "ADMIN" | "USER";
  };
}

export function ChatTemp() {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([]);
  const [input, setInput] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  const [currentUserId] = useLocalStorage({
    key: "currentUserId",
    initialValue: "",
  });

  const { data: chatHistory, isLoading: isLoadingChatHistory } = useQuery({
    queryKey: ["chatHistory"],
    queryFn: async () => {
      const response = await API.get(`/chat/${null}/history`);
      return response.data.responseObject as ChatHistoryMessage[];
    },
  });

  console.log({ chatHistory });

  useSocketConnect();
  useSocketConnectionLogs();
  useSocketRegister();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    function onOnlineUsers(users: OnlineUser[]) {
      setOnlineUsers(users);
      console.log("Online users updated:", users);
    }

    function onReceiveMessage(data: {
      id: string;
      message: string;
      senderId: string;
    }) {
      const newMessage: ChatHistoryMessage = {
        id: data.id,
        chatId: currentUserId,
        senderId: data.senderId,
        message: data.message,
        createdAt: new Date(),
        sender: {
          id: data.senderId,
          email: data.senderId === currentUserId ? "You" : "Admin",
          role: data.senderId === currentUserId ? "USER" : "ADMIN",
        },
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log("Message received:", newMessage);
    }

    socket.on("online_users", onOnlineUsers);
    socket.on("receive_message", onReceiveMessage);

    return () => {
      socket.off("online_users", onOnlineUsers);
      socket.off("receive_message", onReceiveMessage);
    };
  }, [currentUserId]);

  useEffect(() => {
    if (chatHistory) {
      setMessages(chatHistory);
    }
  }, [chatHistory]);

  console.log({ messages });

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newMessage: ChatHistoryMessage = {
      id: Date.now().toString(),
      chatId: currentUserId,
      senderId: currentUserId,
      message: input,
      createdAt: new Date(),
      sender: {
        id: currentUserId,
        email: "You",
        role: "USER",
      },
    };
    socket.emit("send_message_from_user", { message: input });
    setMessages((prevMessages) => [...prevMessages, newMessage]);
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
                : "🔴 Admin is offline."}
            </span>
          </div>
          <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {messages.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                  <AvatarFallback>
                    {item.sender.role === "ADMIN" ? "AD" : "YOU"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 grid gap-1">
                  <div className="font-medium">
                    {item.sender.role === "ADMIN" ? "Admin" : "You"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.message}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
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
      </main>
    </div>
  );
}
