"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/configs'
import { userResponse } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import * as XLSX from 'xlsx'

const ResponseItem = ({jsonForm,formRecord}) => {

    const [loading,setLoading] = useState(false);
    let jsonData = [];

    const ExportData=async()=>{
        setLoading(true);
        const result = await db.select().from(userResponse).where(eq(userResponse.formRef,formRecord.id));
        if(result){
            result.forEach((item)=>{
                const jsonItem =  JSON.parse(item.jsonResponse);
                jsonData.push(jsonItem);
            })
            setLoading(false)
        }
        exportToExcel(jsonData)
    }

    const exportToExcel = ()=>{
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook =  XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1");
        XLSX.writeFile(workbook,jsonForm?.formTitle+".xlsx");
    }

  return (
        <div className="border shadow-sm rounded-lg p-4 my-5">
      <h2 className="font-bold text-lg">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm">{jsonForm?.formHeading}</h2>
      <hr className="my-4" />
      <div className="flex justify-between items-center">
      <h2 className='text-sm'><strong>10</strong> responses</h2>
      <Button disabled={loading} onClick={()=>ExportData()} className="" size="sm">{loading?<Loader2 className='animate-spin'/>:'Export'}</Button>
      </div>
    </div>
  )
}

export default ResponseItem