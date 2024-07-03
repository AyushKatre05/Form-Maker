"use client"
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import FormUi from '../(components)/FormUi'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from 'sonner'

const EditForm = ({params}) => {

  const {user} = useUser();
  const [jsonForm,setJsonForm] = useState([]);
  const [onUpdateTrigger,setOnUpdateTrigger] = useState();
  const [record,setRecord] = useState([])
  

  
  useEffect(()=>{
    user&&GetFormData();
  },[user])

  const GetFormData = async()=>{
    const result = await db.select().from(JsonForms).where(and(eq(JsonForms.id,params?.formId),eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress)));
    const MockJsonResp = JSON.parse(result[0].jsonform);
    console.log(MockJsonResp);
    setRecord(result[0])
    setJsonForm(MockJsonResp)
  }

  const onFieldUpdate=(value,index)=>{
    jsonForm.formFields[index].label = value.label;
    jsonForm.formFields[index].placeholder = value.placeholder;
    setOnUpdateTrigger(Date.now())
  }

  useEffect(()=>{
    if(onUpdateTrigger){

      setJsonForm(jsonForm);
      updateJsonFormInDb();
    }
  },[onUpdateTrigger])

  const updateJsonFormInDb = async()=>{
    const result = await db.update(JsonForms).set({
      jsonform:jsonForm
    }).where(and(eq(JsonForms.id,record.id)),eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress))
    toast("Updated...")
  }

  const deleteField =(i)=>{
    const result = jsonForm.formFields.filter((item,index)=>index!=i)
    jsonForm.formFields = result;
    setOnUpdateTrigger(Date.now())
  }

  return (
    <div>
      <Link href={"/dashboard"}><Button className='flex gap-2 items-center my-5 cursor-pointer hover:font-bold bg-primary'><ArrowLeft/> Back</Button></Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='p-5 border rounded-lg shadow-sm'></div>
        <div className='md:col-span-2 p-5 flex items-center justify-center border rounded-lg'><FormUi jsonForm={jsonForm} onFieldUpdate={onFieldUpdate} deleteField={(index)=>deleteField(index)}/></div>
      </div>
    </div>
  )
}

export default EditForm