import React from 'react'
import CreateForm from './(components)/CreateForm'
import FormList from './(components)/FormList'

const page = () => {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl flex items-center justify-between'>Dashboard
      <CreateForm/>
      </h2>
      <FormList/>
    </div>
  )
}

export default page