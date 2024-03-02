import React from 'react'
import Ratings from '../Ratings/Ratings'

const ProgressBar = ({ratings, percentage}) => {
  return (
    <div className=' w-full flex items-end mb-4'>
        {/* <p className=' w-[100px]'>5 Star</p> */}
        <div className=' min-w-[130px]'>
            <Ratings ratings={ratings} color="#FFAD33" />

        </div>
        <div className=' w-full h-[6px] sm:h-[8px] md:h-[11px] rounded-full bg-slate-300'>
            <div className={`h-full w-[${percentage}%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full`} />

        </div>
    </div>
  )
}

export default ProgressBar