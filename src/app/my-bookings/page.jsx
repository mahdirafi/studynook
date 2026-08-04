"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Chip, Spinner, Table } from "@heroui/react";
import { useEffect, useState } from "react";
import { FiCalendar, FiInbox } from "react-icons/fi";

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
      <div className="min-h-[60vh] flex justify-center items-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-3 bg-white dark:bg-gray-900 px-8 py-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <Spinner color="primary" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Loading your bookings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 dark:bg-blue-500 p-3 rounded-xl shadow-md shadow-blue-600/20 dark:shadow-blue-500/20">
            <FiCalendar className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              My Bookings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Manage your upcoming and past room reservations.
            </p>
          </div>
        </div>

        {/* Desktop/Table View */}
        <div className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <Table className="dark:text-gray-200">
            <Table.ScrollContainer>
              <Table.Content aria-label="My Bookings Table">
                <Table.Header className="bg-blue-50 dark:bg-gray-800/60">
                  <Table.Column>Room</Table.Column>
                  <Table.Column>Date</Table.Column>
                  <Table.Column>Time</Table.Column>
                  <Table.Column>Cost</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column>Action</Table.Column>
                </Table.Header>
                <Table.Body
                  items={bookings}
                  renderEmptyState={() => (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                      <FiInbox className="text-blue-500 dark:text-blue-400" size={28} />
                      <p className="text-gray-500 dark:text-gray-400 font-medium">
                        You have no bookings yet.
                      </p>
                    </div>
                  )}
                >
                  {(booking) => (
                    <Table.Row key={booking._id}>
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <img
                            src={booking.images?.[0]}
                            alt={booking.name || "Room image"}
                            className="w-11 h-11 rounded-lg object-cover"
                          />
                          {booking.name}
                        </div>
                      </Table.Cell>
                      <Table.Cell>{booking.date}</Table.Cell>
                      <Table.Cell>{booking.start} - {booking.end}</Table.Cell>
                      <Table.Cell>${booking.totalCost}</Table.Cell>
                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={statusColorMap[booking.status?.trim().toLowerCase()] || "default"}
                        >
                          {booking.status}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>
                        {booking.status?.trim().toLowerCase() === "confirmed" ? (
                          <Button size="sm" color="danger" onPress={() => handleCancel(booking._id)}>
                            Cancel
                          </Button>
                        ) : "—"}
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>

        {/* Mobile/Card View */}
        <div className="md:hidden space-y-4">
          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <FiInbox className="text-blue-500 dark:text-blue-400" size={28} />
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                You have no bookings yet.
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="bg-white dark:bg-gray-900 rounded-xl border p-4 shadow-sm">
                {/* Row 1: Room + Date */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={booking.images?.[0]}
                      alt={booking.name || "Room image"}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-semibold">{booking.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{booking.date}</span>
                </div>
                {/* Row 2: Time + Cost */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    {booking.start} - {booking.end}
                  </span>
                  <span className="font-semibold">${booking.totalCost}</span>
                </div>
                {/* Row 3: Status + Action */}
                <div className="flex justify-between items-center">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={statusColorMap[booking.status?.trim().toLowerCase()] || "default"}
                  >
                    {booking.status}
                  </Chip>
                  {booking.status?.trim().toLowerCase() === "confirmed" ? (
                    <Button size="sm" color="danger" onPress={() => handleCancel(booking._id)}>
                      Cancel
                    </Button>
                  ) : "—"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingPage;
