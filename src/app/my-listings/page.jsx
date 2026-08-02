"use client"
import { authClient } from "@/lib/auth-client";
import { PlusShape } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";

const MyListingPage = () => {
     const {data : session, isPending} = authClient.useSession();
      const user= session?.user
      console.log(user);
    
    //   only add listing card
    return (
       <div className="max-w-7xl mx-auto px-4 py-10 flex items-center justify-between">
    <div>
      <h1 className="text-4xl font-semibold text-black mb-3">My Listings </h1>
      <p className="text-muted mb-6">
        Rooms you currently host on StudyNook.
      </p>
    </div>

      <div>
         <Link href="/add-room"> 
                    <Button className="bg-blue-500 rounded-sm text-white"><PlusShape /> Add Room</Button>
                </Link>
      </div>
    </div>
               
          
    );
};

export default MyListingPage;

