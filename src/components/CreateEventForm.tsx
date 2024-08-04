"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BookEventInputs, eventService } from "@/services/event.service";
import { commonService } from "@/services/common.service";
import { FormField, FormItem, FormLabel, FormControl, Form } from "./ui/form";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export function CreateEventForm() {
  const form = useForm<BookEventInputs>();
  const { toast } = useToast();

  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: eventService.create,
    mutationKey: ["eventsCreate"],
    onSuccess: (res) => {
      push("/");
      toast({
        title: "Event Booking Successful.",
      });
    },
  });

  const onSubmit: SubmitHandler<BookEventInputs> = (data) => {
    mutate({
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    });
    // console.log({ data });
  };

  const { data: themes } = useQuery({
    queryKey: ["themes"],
    queryFn: () => {
      return commonService.getAll("themes");
    },
  });
  const { data: accommodations } = useQuery({
    queryKey: ["accomodations"],
    queryFn: () => {
      return commonService.getAll("accommodations");
    },
  });
  const { data: decors } = useQuery({
    queryKey: ["decors"],
    queryFn: () => {
      return commonService.getAll("decors");
    },
  });
  const { data: caterings } = useQuery({
    queryKey: ["caterings"],
    queryFn: () => {
      return commonService.getAll("caterings");
    },
  });
  const { data: entertainments } = useQuery({
    queryKey: ["entertainments"],
    queryFn: () => {
      return commonService.getAll("entertainments");
    },
  });

  return (
    <Card className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Book an Event</CardTitle>
            <CardDescription>
              Fill out the details to plan your event.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    {...form.register("title", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    rows={3}
                    placeholder="Describe your event"
                    {...form.register("description", { required: true })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start-date" className="text-sm font-medium">
                      Start Date
                    </Label>
                    <Input
                      id="start-date"
                      type="date"
                      {...form.register("startDate", { required: true })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end-date" className="text-sm font-medium">
                      End Date
                    </Label>
                    <Input
                      id="end-date"
                      type="date"
                      {...form.register("endDate", { required: true })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter event location"
                    {...form.register("location", { required: true })}
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="themeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="theme"
                          className="text-sm font-medium"
                        >
                          Theme
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {themes?.responseObject?.map((theme) => (
                              <SelectItem key={theme.id} value={theme.id}>
                                {theme.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="decorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="decorId"
                          className="text-sm font-medium"
                        >
                          decor
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="decor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {decors?.responseObject?.map((decor) => (
                              <SelectItem key={decor.id} value={decor.id}>
                                {decor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="cateringId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="cateringId"
                          className="text-sm font-medium"
                        >
                          catering
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="catering" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {caterings?.responseObject?.map((catering) => (
                              <SelectItem key={catering.id} value={catering.id}>
                                {catering.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="entertainmentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="entertainmentId"
                          className="text-sm font-medium"
                        >
                          entertainment
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="entertainment" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {entertainments?.responseObject?.map(
                              (entertainment) => (
                                <SelectItem
                                  key={entertainment.id}
                                  value={entertainment.id}
                                >
                                  {entertainment.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="accommodationId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="accommodationId"
                          className="text-sm font-medium"
                        >
                          accommodation
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="accommodation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {accommodations?.responseObject?.map(
                              (accommodation) => (
                                <SelectItem
                                  key={accommodation.id}
                                  value={accommodation.id}
                                >
                                  {accommodation.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-end">
              <Button type="submit">
                {isPending ? "Booking..." : "Book Event"}
              </Button>
              <span className="px-2 text-muted-foreground"></span>
              <Button variant="outline" onClick={() => push("/")} type="reset">
                Cancel
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
