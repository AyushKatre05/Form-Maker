"use client";
import FormUi from "@/app/edit-form/(components)/FormUi";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const LiveAiForm = ({ params }) => {
  const [record, setRecord] = useState();
  const [jsonForm, setJsonForm] = useState([]);

  useEffect(() => {
    params && GetFormData();
  }, [params]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.id, Number(params?.formid)));
    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonform));
  };

  return (
    <div
      className="p-10 flex justify-center items-center"
      style={{ backgroundImage: record?.backgroundImage }}
    >
      {record && (
        <FormUi
          editable={false}
          jsonForm={jsonForm}
          onFieldUpdate={() => console.log()}
          deleteField={() => console.log()}
          selectedTheme={record?.theme}
          formId={record.id}
          enableSignIn={record?.enableSignIn}
        />
      )}
      <Link
        href={"/"}
        className="flex gap-2 items-center bg-black text-white px-3 py-1 rounded-full fixed bottom-5 left-5 cursor-pointer"
      >
        <Image src={"/logo.svg"} alt="logo" width={26} height={26} />
        Build Your Own AI Form
      </Link>
    </div>
  );
};

export default LiveAiForm;
