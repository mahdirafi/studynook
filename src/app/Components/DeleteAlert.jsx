"use client";

import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";


export function DeleteAlert({room}) {
  const {_id ,name } = room;
  const handleDelete = async() =>{
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${room._id}`,
      {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(room),
        }
    );
    const data = await res.json(res);
    redirect("/rooms");
    console.log(data);

  }
  return (
    <AlertDialog>
      <Button
        variant="bordered"
        className="border-red-500 dark:border-red-400 !text-red-600 dark:!text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/10 rounded-full font-medium"
      >
        <RiDeleteBin6Line /> Delete Project
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] !bg-white dark:!bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.18)] dark:shadow-black/30">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="!text-gray-900 dark:!text-gray-100 font-bold tracking-tight">
                Delete project permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed tracking-wide">
                This will permanently delete{" "}
                <strong className="!text-gray-900 dark:!text-gray-100 font-semibold">
                  {name}
                </strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                slot="close"
                variant="tertiary"
                className="!text-gray-700 dark:!text-gray-300 hover:!bg-gray-100 dark:hover:!bg-gray-800 rounded-full font-medium"
              >
                Cancel
              </Button>
              <Button
                slot="close"
                onClick={handleDelete}
                className="!bg-red-600 dark:!bg-red-500 hover:!bg-red-700 dark:hover:!bg-red-600 !text-white rounded-full font-medium"
              >
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}