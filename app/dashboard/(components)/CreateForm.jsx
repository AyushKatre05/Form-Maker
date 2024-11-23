"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/configs/AiModal";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

const CreateForm = () => {

    const PROMPT = "Description: Student registration for coding workshop on React & react native , On the basis of description please give form in json format with form title, form subheading, Form field, form name, placeholder name, and form label, fieldType, field required In Json format"

    const route = useRouter();
    const [openDialog,setOpenDialog] = useState(false);
    const [loading,setLoading] = useState(false);
    const [userInput,setUserInput] = useState();
    const {user} = useUser();

    const onCreateForm = async()=>{
      setLoading(true)
        const result = await AiChatSession.sendMessage("Description:"+userInput+PROMPT)
        console.log(result.response.text())
        if(result.response.text()){
          const resp = await db.insert(JsonForms).values({
            jsonform : result.response.text(),
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format("DD/MM/yyyy")
          }).returning({id:JsonForms.id})
          if(resp[0].id){
            route.push('/edit-form/'+resp[0].id)
          }
          console.log(resp)
          setLoading(false);
        }
        setLoading(false);
    }

  return (
    <div>
    <Button onClick={()=>setOpenDialog(true)}>+ Create Form</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
            <Textarea onChange={(e)=>setUserInput(e.target.value)} className="my-2" placeholder="Write Description of your form"/>
            <div className="flex gap-2 my-3 justify-end">
                <Button onClick={()=>setOpenDialog(false)} variant="destructive">Cancel</Button>
                <Button disabled={loading} onClick={()=>onCreateForm()}>{loading?<Loader2Icon className="animate-spin"/>:"Create"}</Button>
            </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
