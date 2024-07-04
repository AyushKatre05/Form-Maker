import { Button } from "@/components/ui/button";
import { Edit, Share, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";
import { RWebShare } from "react-web-share";

const FormListItem = ({ refreshData, formRecord, jsonForm }) => {
  const { user } = useUser();
  const onDeleteForm = async () => {
    const result = await db
      .delete(JsonForms)
      .where(
        and(
          eq(JsonForms.id, formRecord.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    if (result) {
      toast("Form Deleted...");
      refreshData();
    }
  };

  return (
    <div className="border shadow-sm rounded-lg p-4">
      <div className="flex justify-between">
        <h2></h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash className="h-5 w-5 hover:scale-105 transition-all cursor-pointer text-red-500" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDeleteForm()}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <h2 className="font-bold text-lg">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm">{jsonForm?.formHeading}</h2>
      <hr className="my-4" />
      <div className="flex justify-between">
        <RWebShare
        data={{
          text: jsonForm?.formHeading+" , Build with the power of AI ",
          url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/"+formRecord?.id,
          title: jsonForm?.formTitle,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button variant="outline" size="sm" className="flex gap-2">
          <Share className="h-5 w-5" />
          Share
        </Button>
      </RWebShare>
        <Link href={"/edit-form/" + formRecord?.id}>
          <Button size="sm" className="flex gap-2">
            <Edit className="h-5 w-5" />
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FormListItem;
