import { Button } from '@/components/ui/button'
import React from 'react'
import CreateForm from './(components)/CreateForm'

const page = () => {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl flex items-center justify-between'>Dashboard
      <CreateForm/>
      </h2>
    </div>
  )
}

export default page