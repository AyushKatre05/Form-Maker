"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/configs'
import { userResponse } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import * as XLSX from 'xlsx'

const ResponseItem = ({ jsonForm, formRecord }) => {
  const [loading, setLoading] = useState(false)
  let jsonData = []

  const ExportData = async () => {
    setLoading(true)
    const result = await db
      .select()
      .from(userResponse)
      .where(eq(userResponse.formRef, formRecord.id))
    if (result) {
      result.forEach((item) => {
        const jsonItem = JSON.parse(item.jsonResponse)
        jsonData.push(jsonItem)
      })
      setLoading(false)
    }
    exportToExcel(jsonData)
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, jsonForm?.formTitle + '.xlsx')
  }

  return (
    <div className="border shadow-lg rounded-lg p-6 my-6 bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <h2 className="font-bold text-xl text-gray-900 dark:text-gray-200">
            {jsonForm?.formTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            {jsonForm?.formHeading}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            disabled={loading}
            onClick={() => ExportData()}
            className="w-full md:w-auto bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            size="sm"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Export'}
          </Button>
        </div>
      </div>
      <hr className="border-gray-300 dark:border-gray-700" />
      <div className="mt-4 text-gray-800 dark:text-yellow-400 text-sm">
        <p>Click the export button to download the responses as an Excel file.</p>
      </div>
    </div>
  )
}

export default ResponseItem
