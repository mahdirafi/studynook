"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Spinner } from "@heroui/react";
import {
    FiBookOpen,
    FiCalendar,
    FiEdit2,
    FiHome,
    FiMail,
    FiUser,
} from "react-icons/fi";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center bg-gray-50 dark:bg-gray-950">
        <Spinner color="primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Cover + header */}
        <div className="relative rounded-2xl overflow-hidden !bg-white dark:!bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.15)] dark:shadow-black/20">
          {/* Cover banner */}
          <div className="h-32 md:h-40 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500" />

          {/* Avatar + basic info */}
          <div className="px-6 md:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-14">
              <img
                referrerPolicy="no-referrer"
                src={user.image || "/assets/default-avatar.png"}
                alt={user.name || "User"}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-white dark:ring-gray-900 shadow-md shrink-0"
              />
              <div className="flex-1 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-2">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold !text-gray-900 dark:!text-gray-100 tracking-tight">
                    {user.name || "Unnamed User"}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1.5">
                    <FiMail size={14} />
                    {user.email}
                  </p>
                </div>
                <Button className="!bg-blue-600 dark:!bg-blue-500 hover:!bg-blue-700 dark:hover:!bg-blue-600 !text-white rounded-full font-medium shadow-md shadow-blue-600/25 dark:shadow-blue-500/20 px-5 self-start sm:self-auto">
                  <FiEdit2 size={15} /> Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="!bg-white dark:!bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.12)] dark:shadow-black/20 flex items-center gap-4">
            <div className="bg-blue-50 dark:bg-blue-500/10 p-3 rounded-xl">
              <FiHome className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-xl font-bold !text-gray-900 dark:!text-gray-100">
                0
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Rooms Listed
              </p>
            </div>
          </div>

          <div className="!bg-white dark:!bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.12)] dark:shadow-black/20 flex items-center gap-4">
            <div className="bg-blue-50 dark:bg-blue-500/10 p-3 rounded-xl">
              <FiCalendar className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-xl font-bold !text-gray-900 dark:!text-gray-100">
                0
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Bookings Made
              </p>
            </div>
          </div>

          <div className="!bg-white dark:!bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.12)] dark:shadow-black/20 flex items-center gap-4">
            <div className="bg-blue-50 dark:bg-blue-500/10 p-3 rounded-xl">
              <FiUser className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-sm font-bold !text-gray-900 dark:!text-gray-100">
                {joinedDate}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Member Since
              </p>
            </div>
          </div>
        </div>

        {/* Account details card */}
        <div className="!bg-white dark:!bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-7 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.12)] dark:shadow-black/20 mt-6">
          <div className="flex items-center gap-2 mb-5">
            <FiBookOpen className="text-blue-600 dark:text-blue-400" size={18} />
            <h2 className="text-lg font-bold !text-gray-900 dark:!text-gray-100 tracking-tight">
              Account Details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">
                Full Name
              </p>
              <p className="text-sm !text-gray-900 dark:!text-gray-100 font-medium">
                {user.name || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">
                Email Address
              </p>
              <p className="text-sm !text-gray-900 dark:!text-gray-100 font-medium">
                {user.email || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">
                Email Verified
              </p>
              <p className="text-sm !text-gray-900 dark:!text-gray-100 font-medium">
                {user.emailVerified ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">
                User ID
              </p>
              <p className="text-sm !text-gray-900 dark:!text-gray-100 font-medium truncate">
                {user.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;