import React, { useState } from 'react'
import { productsCategories } from '../../constants'
import { useNavigate, useParams } from 'react-router-dom'

const Sidebar = () => {
  const {id} = useParams() 
  const [active, setActive] = useState(id)
  const navigate = useNavigate()
  
  const handleToggleCat = (id) => {
    navigate(`/category/${id}`)
  }

  return (
    <div className=''>
      {/* CATEGORY */}
      <div className=' font-poppins border-b border-primaryGray pb-4 w-[100%]'>
          <h2 className=' font-semibold text-[14px] md:text-[16px] mb-3'>CATEGORY</h2>
            <div className=' w-full'>
              {productsCategories.map((item) => (
                <div onClick={() => handleToggleCat(item.id)} key={item.id} className=' w-full flex items-center gap-2 mb-2 cursor-pointer'>
                  <div className={`w-[20px] h-[20px] flex justify-center items-center rounded-full ${item.id === active ? 'bg-primary' : 'border border-primaryGray'}`}>
                      <div className='w-[8px] h-[8px] rounded-full bg-primaryWhite' />
                  </div>
                  <p className=' text-[14px]'>{item.title}</p>
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default Sidebar