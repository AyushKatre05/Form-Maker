"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { LibraryBig, LineChart, MessageCircleQuestion, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses",
    },
    {
      id: 3,
      name: "How it works",
      icon: MessageCircleQuestion,
      path: "/how-it-works",
    },
  ];

  const path = usePathname();

  
  const [formList,setFormList] = useState([]);
  const [percentFile,setPercentFile] = useState(0);
  const {user} = useUser();
  useEffect(() => {user&&GetFormList()}, [user]);
  
  const GetFormList = async()=>{
    const result = await db.select().from(JsonForms).where(eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(JsonForms.id));
    setFormList(result);
    console.log(result);
    const perc = (result.length/5)*100;
    setPercentFile(perc)
}

  return (
    <div className="h-screen shadow-md border">
      <div className="p-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path}
            className={`flex items-center p-4 gap-3 mb-5 hover:bg-primary text-white rounded-lg ${
              path == menu.path && "bg-primary text-white"
            }`}
            key={index}
          >
            <menu.icon /> {menu.name}
          </Link>
        ))}
      </div>
      <div className="fixed bottom-20 p-6 w-64">
        <Button className="w-full">+ Create Form</Button>
        <div className="my-5">
          <Progress value={percentFile} />
          <h2 className="text-sm mt-2 text-gray-600">
            <strong>{formList?.length}</strong> out of <strong>5</strong> File created
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
