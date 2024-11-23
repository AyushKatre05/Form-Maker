import React from 'react'
import CreateForm from './(components)/CreateForm'
import FormList from './(components)/FormList'

const page = () => {
  return (
    <div className='p-10 dark:bg-black bg-slate-100'>
      <h2 className='font-bold dark:text-white text-black text-3xl flex items-center justify-between'>Dashboard
      <CreateForm/>
      </h2>
      <FormList/>
    </div>
  )
}

export default page