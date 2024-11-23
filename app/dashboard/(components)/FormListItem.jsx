import { Button } from "@/components/ui/button";
import { Edit, Share } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { RWebShare } from "react-web-share";

const FormListItem = ({ refreshData, formRecord, jsonForm }) => {
  const { user } = useUser();

  return (
    <div className="border shadow-sm rounded-lg p-4 bg-white dark:bg-gray-900 dark:border-gray-700">
      <h2 className="font-bold text-lg text-gray-900 dark:text-gray-200">
        {jsonForm?.formTitle}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
        {jsonForm?.formHeading}
      </p>
      <hr className="my-4 border-gray-300 dark:border-gray-700" />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Share Button */}
        <RWebShare
          data={{
            text: `${jsonForm?.formHeading} - Build with the power of AI`,
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/aiform/${formRecord?.id}`,
            title: jsonForm?.formTitle,
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 justify-center w-full md:w-auto border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <Share className="h-5 w-5" />
            Share
          </Button>
        </RWebShare>

        {/* Edit Button */}
        <Link href={`/edit-form/${formRecord?.id}`}>
          <Button
            size="sm"
            className="flex items-center gap-2 justify-center w-full md:w-auto bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Edit className="h-5 w-5" />
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FormListItem;
