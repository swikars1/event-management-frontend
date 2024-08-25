"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eventService } from "@/services/event.service";
import { formatDate } from "@/lib/date";
import { Badge } from "./ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "./ui/use-toast";

export function BookingList() {
  const queryClient = useQueryClient();
  // use query to fetch all booking of the user
  const { data } = useQuery({
    queryKey: ["bookings"],
    queryFn: eventService.getAllBookings,
  });

  const { mutate: deleteBooking, isPending: deleting } = useMutation({
    mutationFn: eventService.deleteBooking,
    mutationKey: ["bookingsDelete"],
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      toast({
        title: `${res.responseObject.title} has been deleted!`,
      });
    },
  });

  console.log({ data });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">
            View and manage all your upcoming events and bookings.
          </p>
        </div>
        <div className="grid gap-4">
          <>
            {data?.responseObject?.length ? (
              data?.responseObject.map((item) => (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{item.title}</div>
                      <Badge variant="secondary">{item.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Start Date
                        </div>
                        <div>{formatDate(item.startDate)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          End Date
                        </div>
                        <div>{formatDate(item.endDate)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Location
                        </div>
                        <div>{item.location}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Theme
                        </div>
                        <div>{item.theme?.name || "-"}</div>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Decor
                        </div>
                        <div>{item.decor?.name || "-"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Catering
                        </div>
                        <div>{item.catering?.name || "-"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Entertainment
                        </div>
                        <div>{item.entertainment?.name || "-"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Accommodation
                        </div>
                        <div>{item.accommodation?.name || "-"}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <div className="flex items-center justify-end gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant={"destructive"}>
                            Delete Booking
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete your '{item.title}'
                              booking.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteBooking(item.id)}
                            >
                              {deleting ? "Processing..." : "Confirm"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p>No bookings yet!</p>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
