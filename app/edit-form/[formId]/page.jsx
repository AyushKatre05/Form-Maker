"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, Share, SquareArrowUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import FormUi from "../(components)/FormUi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import Controller from "../(components)/Controller";
import { RWebShare } from "react-web-share";

const EditForm = ({ params }) => {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const [onUpdateTrigger, setOnUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [selectedBackground, setSelectedBackground] = useState();

  useEffect(() => {
    user && GetFormData();
  }, [user]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, params?.formId),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    const MockJsonResp = JSON.parse(result[0].jsonform);
    console.log(MockJsonResp);
    setRecord(result[0]);
    setJsonForm(MockJsonResp);
    setSelectedBackground(result[0].background);
  };

  const onFieldUpdate = (value, index) => {
    jsonForm.formFields[index].label = value.label;
    jsonForm.formFields[index].placeholder = value.placeholder;
    setOnUpdateTrigger(Date.now());
  };

  useEffect(() => {
    if (onUpdateTrigger) {
      setJsonForm(jsonForm);
      updateJsonFormInDb();
    }
  }, [onUpdateTrigger]);

  const updateJsonFormInDb = async () => {
    const result = await db
      .update(JsonForms)
      .set({
        jsonform: jsonForm,
      })
      .where(
        and(eq(JsonForms.id, record.id)),
        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .returning({ id: JsonForms.id });
    toast("Updated...");
  };

  const deleteField = (i) => {
    const result = jsonForm.formFields.filter((item, index) => index != i);
    jsonForm.formFields = result;
    setOnUpdateTrigger(Date.now());
  };

  const updateControllerFields = async (e, columnName) => {
    const result = await db
      .update(JsonForms)
      .set({
        [columnName]: e,
      })
      .where(
        and(eq(JsonForms.id, record.id)),
        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .returning({ id: JsonForms.id });
    toast("Updated...");
  };

  return (
    <div className="p-10 dark:bg-black bg-slate-100">
      <div className="flex dark:text-white text-black justify-between items-center">
        <Link href={"/dashboard"}>
          <Button className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold bg-red-500">
            <ArrowLeft /> Back
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link href={"/aiform/" + record?.id}>
            <Button className="flex gap-2 hover:bg-blue-500">
              <SquareArrowUpRight className="h-5 w-5" />
              Live Preview
            </Button>
          </Link>
          <RWebShare
            data={{
              text: jsonForm?.formHeading + " , Build with the power of AI ",
              url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + record?.id,
              title: jsonForm?.formTitle,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button className="flex gap-2 bg-green-400 hover:bg-green-600">
              <Share />
              Share
            </Button>
          </RWebShare>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border border-black dark:border dark:border-white  rounded-lg shadow-sm">
          <Controller
            selectedBackground={(e) => {
               setSelectedBackground(e);
               updateControllerFields(e, "background") }}
               setSignInEnable={(e)=>{
                updateControllerFields(e, "enableSignIn")
             
            }}
            selectedTheme={(e) => {
              updateControllerFields(e, "theme"), setSelectedTheme(e);
            }}
          />
        </div>
        <div
          className="md:col-span-2 p-5 flex items-center justify-center border rounded-lg"
          style={{ backgroundImage: selectedBackground }}
        >
          <FormUi
            selectedTheme={selectedTheme}
            jsonForm={jsonForm}
            onFieldUpdate={onFieldUpdate}
            deleteField={(index) => deleteField(index)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
