import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MainPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background shadow">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <CalendarIcon className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Event Planner</span>
          </Link>
          <nav className="hidden space-x-4 md:flex">
            <Link
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary"
              prefetch={false}
            >
              Events
            </Link>
            <Link
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary"
              prefetch={false}
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline">Sign In</Button>
            <Button>Sign Up</Button>
          </div>
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
                  <Button>Get Started</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.svg"
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
                  event managers, and service providers to sign up with
                  different roles and access levels.
                </p>
                <div className="mt-8">
                  <Button>Sign Up Now</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.svg"
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
                  src="/placeholder.svg"
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
                  <Button>Book an Event</Button>
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
                <div className="mt-8">
                  <Button>Explore Planning Tools</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.svg"
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
                  src="/placeholder.svg"
                  width={500}
                  height={400}
                  alt="Event Search and Navigation"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Seamless Event Search and Navigation
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our event management app allows users to search for events
                  based on various criteria, making it easy to find the perfect
                  event for their needs.
                </p>
                <div className="mt-8">
                  <Button>Search Events</Button>
                </div>
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
            <nav className="flex gap-4">
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary"
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary"
                prefetch={false}
              >
                Events
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary"
                prefetch={false}
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary"
                prefetch={false}
              >
                About
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary"
                prefetch={false}
              >
                Contact
              </Link>
            </nav>
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
