"use client";

import { authClient } from "@/lib/auth-client";
import { Calendar } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import { FaCalendarCheck } from "react-icons/fa";

export function BookingModal({ room, formattedDate }) {
  const {data : session, isPending} = authClient.useSession();
    const user= session?.user
    console.log(user);
  const {images,  name,  description, floor,  seatCapacity,  hourlyRate, totalBookings,
    listedBy,  listedAt, amenities, } = room;

  const [date, setDate] = useState("");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("11:00");
  const [note, setNote] = useState("");

  const rate = hourlyRate?.amount ?? hourlyRate?.value ?? 0;

  const getDuration = () => {
    if (!start || !end) return 0;
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const diff = (eh * 60 + em - (sh * 60 + sm)) / 60;
    return diff > 0 ? diff : 0;
  };

  const totalCost = (getDuration() * rate).toFixed(2);

  const handleConfirm = async() => {
    // console.log({ roomId: room?._id, date, start, end, note, totalCost });
    const bookingData ={
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      roomId: room?._id,
      date,
      start,
      end,
      note,
      totalCost,
      images,
    name,
    description,
    floor,
    seatCapacity,
    hourlyRate,
    totalBookings,
    listedBy,
    listedAt,
    amenities,
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
    method: "POST",
    headers: {
      "content-type" : "application/json",
    },
    body: JSON.stringify(bookingData),
  });
  const data = await res.json();
  console.log(data);
   

  };

  return (
    <Modal>
      <Button variant="outline" className="bg-blue-500 text-white w-full rounded-sm">
        <FaCalendarCheck />Book Now
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Calendar className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Book {room?.name}</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Pick a date and time slot. Bookings run on the hour.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4">
                  <TextField className="w-full" name="date" type="date" variant="secondary">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </TextField>

                  <div className="grid grid-cols-2 gap-4">
                    <TextField className="w-full" name="start" variant="secondary">
                      <Label>Start</Label>
                      <Input
                        type="time"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                      />
                    </TextField>
                    <TextField className="w-full" name="end" variant="secondary">
                      <Label>End</Label>
                      <Input
                        type="time"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                      />
                    </TextField>
                  </div>

                  <TextField className="w-full" name="note" variant="secondary">
                    <Label>Special note (optional)</Label>
                    <Input
                      placeholder="Any setup needed?"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </TextField>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-[#a39d8c]">Total cost</span>
                    <span className="text-xl font-semibold text-[#2b2b28]">
                      ${totalCost}
                    </span>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close" onPress={handleConfirm}>
                Confirm Booking
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}