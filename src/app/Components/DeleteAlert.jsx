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
      <Button variant="outline" className='border-red-500 text-red-500'> <RiDeleteBin6Line />Delete Project</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong> {name}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="outline" onClick={handleDelete} className='border-red-500 text-red-500'>
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}