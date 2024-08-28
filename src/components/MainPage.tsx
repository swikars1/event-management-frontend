"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useEffect, useState } from "react";

function ConditionalAuthButton() {
  "use client";
  const { push } = useRouter();
  const [token] = useLocalStorage({ key: "token", initialValue: "" });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  console.log({ token });

  if (!token && isClient) {
    return (
      <div className="flex items-center gap-2">
        <Button onClick={() => push("/signin")} variant="outline">
          Login
        </Button>
        <Button onClick={() => push("/signup")}>Register</Button>
      </div>
    );
  } else {
    return (
      <div className="flex gap-2">
        <Button
          variant={"outline"}
          onClick={() => {
            push("/chats");
          }}
        >
          Chat with Admin
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            push("/bookings");
          }}
        >
          View Bookings
        </Button>

        <Button
          variant={"destructive"}
          onClick={() => {
            localStorage.clear();
            location.reload();
          }}
        >
          Logout
        </Button>
      </div>
    );
  }
}

export default function MainPage() {
  const { push } = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [token] = useLocalStorage({ key: "token", initialValue: "" });

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background shadow">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <img
              src="/event_logo.png"
              width={90}
              height={80}
              alt="Event Planning"
            />
          </Link>
          <ConditionalAuthButton />
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-gradient-to-r from-primary to-primary/90 py-20 text-primary-foreground">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Streamline Your Event Planning
                </h1>
                <p className="text-lg">
                  Our event management app helps you effortlessly coordinate
                  every aspect of your events, from booking venues to managing
                  attendees.
                </p>
                <div className="flex gap-4">
                  <Link
                    href={isClient && !token ? "/signin" : "/create_event"}
                    prefetch={false}
                  >
                    <Button variant="outline">Start Booking!</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/Ephoto1.jpg"
                  width={500}
                  height={400}
                  alt="Event Planning"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Seamless Registration and Authentication
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our event management app offers a secure and intuitive
                  registration and authentication process, allowing clients,
                  event managers, and service providers to Register with
                  different roles and access levels.
                </p>

                {isClient && !token ? (
                  <div className="mt-8">
                    <Button onClick={() => push("/signup")}>
                      Register Now
                    </Button>
                  </div>
                ) : null}
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/Uphoto3.webp"
                  width={500}
                  height={400}
                  alt="Registration and Authentication"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-muted py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex items-center justify-center">
                <img
                  src="/Ephoto3.jpg"
                  width={500}
                  height={400}
                  alt="Event Scheduling and Booking"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Effortless Event Scheduling and Booking
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our event management app makes it easy for users to view
                  available dates and times, select venues, and coordinate all
                  event details with just a few clicks.
                </p>
                <div className="mt-8">
                  <Link
                    href={isClient && !token ? "/signin" : "/create_event"}
                    prefetch={false}
                  >
                    <Button variant="outline">Book an Event</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Comprehensive Event Planning and Coordination
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our event management app provides a centralized dashboard for
                  managing various aspects of your events, including theme,
                  decor, catering, entertainment, and accommodations.
                </p>
                <div className="mt-8"></div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/Cphoto2.jpg"
                  width={500}
                  height={400}
                  alt="Event Planning and Coordination"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-muted py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex items-center justify-center">
                <img
                  src="/Sphoto1.jpg"
                  width={500}
                  height={400}
                  alt="Event Search and Navigation"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Seamless Search for Event Needs
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our event management app allows users to search for all the
                  events needs based on various criteria, making it easy to
                  frame a perfect event for your needs.
                </p>
                <div className="mt-8"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">Event Planner</span>
            </div>

            <p className="text-sm text-muted-foreground">
              &copy; 2024 Event Planner. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CalendarIcon(props: any) {
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

function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
