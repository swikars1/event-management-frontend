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
import { eventService } from "@/services/event.service";
import { commonService } from "@/services/common.service";

export function CreateEventForm() {
  type Inputs = {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    theme: string;
    catering: string;
    entertainment: string;
    accommodation: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate } = useMutation({
    mutationFn: eventService.create,
    mutationKey: ["eventsCreate"],
    onSuccess: (res) => {
      console.log({ res });
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // mutate(data);
    console.log({ data });
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("title", { required: true })}
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
                  {...register("description", { required: true })}
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
                    {...register("startDate")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end-date" className="text-sm font-medium">
                    End Date
                  </Label>
                  <Input id="end-date" type="date" {...register("endDate")} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="Enter event location"
                  {...register("location", { required: true })}
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="theme" className="text-sm font-medium">
                  Theme
                </Label>
                <Select id="theme">
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes?.responseObject?.map((theme) => (
                      <SelectItem
                        key={theme.id}
                        value={theme.name}
                        {...register("theme", { required: true })}
                      >
                        {theme.name}
                      </SelectItem>
                    ))}
                    {/* <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="decor" className="text-sm font-medium">
                  Decor
                </Label>
                <Select id="decor">
                  <SelectTrigger>
                    <SelectValue placeholder="Select decor" />
                  </SelectTrigger>
                  <SelectContent>
                    {decors?.responseObject?.map((decor) => (
                      <SelectItem
                        key={decor.id}
                        value={decor.name}
                        {...register("theme")}
                      >
                        {decor.name}
                      </SelectItem>
                    ))}
                    {/* <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="rustic">Rustic</SelectItem>
                  <SelectItem value="elegant">Elegant</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="catering" className="text-sm font-medium">
                  Catering
                </Label>
                <Select id="catering">
                  <SelectTrigger>
                    <SelectValue placeholder="Select catering" />
                  </SelectTrigger>

                  <SelectContent>
                    {caterings?.responseObject?.map((catering) => (
                      <SelectItem
                        key={catering.id}
                        value={catering.name}
                        {...register("catering")}
                      >
                        {catering.name}
                      </SelectItem>
                    ))}
                    {/* <SelectItem value="buffet">Buffet</SelectItem>
                  <SelectItem value="plated">Plated</SelectItem>
                  <SelectItem value="family-style">Family Style</SelectItem>
                  <SelectItem value="cocktail">Cocktail</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="entertainment" className="text-sm font-medium">
                  Entertainment
                </Label>
                <Select id="entertainment">
                  <SelectTrigger>
                    <SelectValue placeholder="Select entertainment" />
                  </SelectTrigger>
                  <SelectContent>
                    {entertainments?.responseObject?.map((entertainment) => (
                      <SelectItem
                        key={entertainment.id}
                        value={entertainment.name}
                        {...register("entertainment")}
                      >
                        {entertainment.name}
                      </SelectItem>
                    ))}
                    {/* <SelectItem value="live-music">Live Music</SelectItem>
                  <SelectItem value="dj">DJ</SelectItem>
                  <SelectItem value="photo-booth">Photo Booth</SelectItem>
                  <SelectItem value="games">Games</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="accommodation" className="text-sm font-medium">
                  Accommodation
                </Label>
                <Select id="accommodation">
                  <SelectTrigger>
                    <SelectValue placeholder="Select accommodation" />
                  </SelectTrigger>
                  <SelectContent>
                    {accommodations?.responseObject?.map((accommodation) => (
                      <SelectItem
                        key={accommodation.id}
                        value={accommodation.name}
                        {...register("accommodation")}
                      >
                        {accommodation.name}
                      </SelectItem>
                    ))}
                    {/* <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="airbnb">Airbnb</SelectItem>
                  <SelectItem value="resort">Resort</SelectItem>
                  <SelectItem value="camping">Camping</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end">
            <Button type="submit">Book Event</Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
