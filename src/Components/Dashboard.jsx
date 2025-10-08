import React from 'react'
import Sidebar from './Sidebar'
import { dashboardList } from '../Utils/sidebarElements'

function Dashboard() {
  return (
    <main className='flex flex-row min-h-screen bg-gray-100 font-mulish'>
      <Sidebar />
      <main className='px-6 py-6 w-full'>
        <p className="text-2xl font-semibold text-gray-800 mb-6">
          Track, manage, and convert your leads with ease
        </p>
        <main className='flex flex-col lg:flex-row gap-8'>
            <section>
              {dashboardList.map((ele) => (
                <div key={ele.id}>
                  <p>{ele.name}</p>
                  
                </div>
              ))}
            </section>
        </main>
      </main>
    </main>
  )
}

export default Dashboard