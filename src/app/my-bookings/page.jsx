"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Chip, Spinner, Table } from "@heroui/react";
import { useEffect, useState } from "react";

const statusColorMap = {
  confirmed: "success",
  cancelled: "danger",
  pending: "warning",
};

const MyBookingPage = () => {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user?.id) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${session.user.id}`
        );
        const data = await res.json();
        setBookings(data);
        console.log("fetch bookings data:", data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchBookings();
    }
  }, [session]);

  const handleCancel = async (bookingId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}/cancel`,
        { method: "PATCH" }
      );
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, status: "cancelled" } : b
          )
        );
      }
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner label="Loading your bookings..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-800 shadow-2xl dark:shadow-black/40 transition-colors">
      <h1 className="text-4xl font-semibold text-black dark:text-gray-100 mb-3">
        My Bookings
      </h1>
      <p className="text-muted dark:text-gray-400 mb-6">
        Manage your upcoming and past room reservations.
      </p>

      <div>
        <Table className="dark:text-gray-200">
          <Table.ScrollContainer>
            <Table.Content aria-label="My Bookings Table">
              {/* 6 columns total */}
              <Table.Header className="bg-blue-100 dark:bg-gray-800">
                <Table.Column isRowHeader>ROOM</Table.Column>
                <Table.Column>DATE</Table.Column>
                <Table.Column>TIME</Table.Column>
                <Table.Column>COST</Table.Column>
                <Table.Column>STATUS</Table.Column>
                <Table.Column>ACTION</Table.Column>
              </Table.Header>
              <Table.Body
                items={bookings}
                renderEmptyState={() => (
                  <p className="text-center py-6 text-muted dark:text-gray-400">
                    You have no bookings yet.
                  </p>
                )}
              >
                {(booking) => (
                  // 6 cells total — must match the 6 columns above
                  <Table.Row id={booking._id}>
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        {/* Room snapshot fields saved on the booking itself
                            (from BookingModal) — NOT the user's photo/name */}
                        <img
                          src={booking.images?.[0]}
                          alt={booking.name || "Room image"}
                          className="w-10 h-10 rounded-md object-cover shrink-0 bg-gray-100 dark:bg-gray-800"
                        />
                        <span className="font-medium dark:text-gray-100">
                          {booking.name || "Unknown room"}
                        </span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{booking.date}</Table.Cell>
                    <Table.Cell>
                      {booking.start} - {booking.end}
                    </Table.Cell>
                    <Table.Cell>${booking.totalCost}</Table.Cell>
                    <Table.Cell>
                      <Chip
                        size="sm"
                        variant="flat"
                        color={
                          statusColorMap[booking.status?.trim().toLowerCase()] ||
                          "default"
                        }
                        className="capitalize"
                      >
                        {booking.status || "unknown"}
                      </Chip>
                    </Table.Cell>
                    <Table.Cell>
                      {booking.status?.trim().toLowerCase() === "confirmed" ? (
                        <Button
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => handleCancel(booking._id)}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <span className="text-muted dark:text-gray-500">—</span>
                      )}
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
};

export default MyBookingPage;