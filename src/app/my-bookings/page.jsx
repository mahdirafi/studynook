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

        {/* Card container */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-black/20 overflow-hidden">
          <Table className="dark:text-gray-200" removeWrapper>
            <Table.ScrollContainer>
              <Table.Content aria-label="My Bookings Table">
                {/* 6 columns total */}
                <Table.Header className="bg-blue-50 dark:bg-gray-800/60">
                  <Table.Column
                    isRowHeader
                    className="text-blue-700 dark:text-blue-300 font-semibold text-xs uppercase tracking-wide"
                  >
                    Room
                  </Table.Column>
                  <Table.Column className="text-blue-700 dark:text-blue-300 font-semibold text-xs uppercase tracking-wide">
                    Date
                  </Table.Column>
                  <Table.Column className="text-blue-700 dark:text-blue-300 font-semibold text-xs uppercase tracking-wide">
                    Time
                  </Table.Column>
                  <Table.Column className="text-blue-700 dark:text-blue-300 font-semibold text-xs uppercase tracking-wide">
                    Cost
                  </Table.Column>
                  <Table.Column className="text-blue-700 dark:text-blue-300 font-semibold text-xs uppercase tracking-wide">
                    Status
                  </Table.Column>
                  <Table.Column className="text-blue-700 dark:text-blue-300 font-semibold text-xs uppercase tracking-wide">
                    Action
                  </Table.Column>
                </Table.Header>
                <Table.Body
                  items={bookings}
                  renderEmptyState={() => (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                      <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-full">
                        <FiInbox className="text-blue-500 dark:text-blue-400" size={28} />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">
                        You have no bookings yet.
                      </p>
                    </div>
                  )}
                >
                  {(booking) => (
                    // 6 cells total — must match the 6 columns above
                    <Table.Row
                      id={booking._id}
                      className="hover:bg-blue-50/60 dark:hover:bg-gray-800/40 transition-colors"
                    >
                      <Table.Cell>
                        <div className="flex items-center gap-3 py-1">
                          {/* Room snapshot fields saved on the booking itself
                              (from BookingModal) — NOT the user's photo/name */}
                          <img
                            src={booking.images?.[0]}
                            alt={booking.name || "Room image"}
                            className="w-11 h-11 rounded-lg object-cover shrink-0 bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-100 dark:ring-gray-800"
                          />
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {booking.name || "Unknown room"}
                          </span>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="text-gray-600 dark:text-gray-300">
                        {booking.date}
                      </Table.Cell>
                      <Table.Cell className="text-gray-600 dark:text-gray-300">
                        {booking.start} - {booking.end}
                      </Table.Cell>
                      <Table.Cell className="font-semibold text-gray-900 dark:text-gray-100">
                        ${booking.totalCost}
                      </Table.Cell>
                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={
                            statusColorMap[booking.status?.trim().toLowerCase()] ||
                            "default"
                          }
                          className="capitalize font-medium"
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
                            className="font-medium"
                            onPress={() => handleCancel(booking._id)}
                          >
                            Cancel
                          </Button>
                        ) : (
                          <span className="text-gray-300 dark:text-gray-600">—</span>
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
    </div>
  );
};

export default MyBookingPage;