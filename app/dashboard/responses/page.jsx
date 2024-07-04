"use client"
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import ResponseItem from './(components)/ResponseItem'
import { eq } from 'drizzle-orm'

const Responses = () => {

    const {user} = useUser();
    const [formList,setFormList] = useState([]);

    useEffect(()=>{
        user && getFormList();
    },[user])

    const getFormList=async()=>{
        const result = await db.select().from(JsonForms).where(eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress));
        setFormList(result)
    }

  return (
    <div className='p-10'>
        <h2 className='font-bold text-3xl flex items-center justify-between'>Responses</h2>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
        {formList.map((form,index)=>(
            <ResponseItem formRecord={form} jsonForm={JSON.parse(form.jsonform)}/>
        ))}
        </div>
    </div>
  )
}

export default Responses