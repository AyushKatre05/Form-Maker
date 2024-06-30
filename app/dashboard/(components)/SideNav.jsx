"use client"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LibraryBig, LineChart, MessageSquare } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const SideNav = () => {

    const menuList = [
        {
            id : 1,
            name : 'My Forms',
            icon : LibraryBig,
            path : '/dashboard'
        },
        {
            id : 2,
            name : 'Responses',
            icon : MessageSquare,
            path : '/dashboard/responses'
        },
        {
            id : 3,
            name : 'Analytics',
            icon : LineChart,
            path : '/dashboard/analytics'
        },
    ]

    const path = usePathname();

    useEffect(()=>{},[path])

  return (
    <div className='h-screen shadow-md border'>
        <div className='p-5'>
            {menuList.map((menu,index)=>(
                <h2 className={`flex items-center p-4 gap-3 mb-5 hover:bg-primary text-white rounded-lg ${path==menu.path && 'bg-primary text-white'}`} key={index}><menu.icon/> {menu.name}</h2>
            ))}
        </div>
        <div className='fixed bottom-20 p-6 w-64'>
            <Button className='w-full'>+ Create Form</Button>
        <div className='my-5'>
            <Progress value={40}/>
            <h2 className='text-sm mt-2 text-gray-600'><strong>2</strong> out of <strong>3</strong> File created</h2>
        </div>
        </div>
    </div>
  )
}

export default SideNav