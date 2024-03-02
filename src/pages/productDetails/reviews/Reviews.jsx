import React, { useContext, useEffect, useState } from 'react'
import { ProgressBar, Ratings } from '../../../components'
import { AuthContext } from '../../../context/AuthProvider';
import { getDoc, doc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ratings = [
    {
        id: 5,
        name: "5 Star Rating",
        icon: <Ratings color="#FFAD33" ratings={5} />
    },
    {
        id: 4,
        name: "4 Star Rating",
        icon: <Ratings color="#FFAD33" ratings={4} />
    },
    {
        id: 3,
        name: "3 Star Rating",
        icon: <Ratings color="#FFAD33" ratings={3} />
    },
    {
        id: 3,
        name: "2 Star Rating",
        icon: <Ratings color="#FFAD33" ratings={2} />
    },
    {
        id: 1,
        name: "1 Star Rating",
        icon: <Ratings color="#FFAD33" ratings={1} />
    },
]


const Reviews = ({ reviews}) => {
    const {user} = useContext(AuthContext)
    const [loadAll, setLoadAll] = useState(false)
    


  return (
    <div>
        <div className='my-[5rem] pb-4 border-b border-primaryGray'>
            <h2 className=' font-poppins text-[12px] sm:text-[14px] font-semibold md:text-[16px] mt-16'>VERIFIED CUSTOMER FEEDBACK</h2>  
        </div>

        <div className='flex gap-10 md:flex-row flex-col-reverse'>
            <div className='w-[90%] md:mx-0 mx-auto md:w-[70%]'>
                {reviews?.length < 1 && <h2 className=' text-center text-[10px] sm:text-[12px] md:text-[14px] font-poppins opacity-80 '>Customers who have bought this product have not yet posted comments</h2>}

                {reviews?.slice(0, loadAll ? reviews?.length : 3 )?.map((item, index) => (
                    <div key={index + 1} className=' flex sm:flex-row flex-col items-center gap-2 sm:gap-4 mb-3 py-[1rem] px-4 bg-dimWhite'>
                        <div className=' flex flex-col items-center justify-center w-full'>
                            <div className=' md:w-[78px] md:h-[78px] w-[65px] h-[65px] bg-primaryGray rounded-full overflow-hidden mb-4'>
                                <img src={item?.profile} alt="" className=' object-contain' />
                            </div>
                            <h2 className=' font-poppins font-semibold text-[12px] md:text-[14px]'>{item?.name}</h2>
                            <p className=' font-poppins text-[10px] md:text-[12px] text-neutral'>{item?.date}</p>
                        </div>  

                        <div className=' w-full'>
                            <div className=' flex justify-center sm:justify-start'>
                                <Ratings color="#FFAD33" size='15px' ratings={item?.ratings} />

                            </div>
                            <p className=' font-poppins text-[10px] sm:text-[12px] md:text-[14px] text-neutral mt-2 md:mt-4 max-w-[480px] leading-6 sm:text-start text-center'>"{item?.comment}"</p>
                            
                            {user?.emailVerified && item?.userId && <div  className=' mt-5 flex items-center w-full'>
                                <TaskAltIcon className=' text-green-500' />
                                <span className='  ml-2 text-green-500 font-medium text-[10px] sm:text-[12px] md:text-[14px]'>Verified Purchase</span>
                               
                            </div>}

                        </div>
                    </div>
                ))}

                {!loadAll && reviews?.length >= 1 && <div className=' w-full text-center'>
                    <button onClick={() => setLoadAll(true)} className=' px-6 py-2 font-poppins text-center text-primaryWhite bg-primary mt-10 md:text-[16px] text-[14px]'>Load more reviews <span><ArrowDownwardIcon /></span></button>

                </div>}

                {loadAll && <div className=' w-full text-center'>
                    <button onClick={() => setLoadAll(false)} className=' px-6 py-2 font-poppins text-center text-primaryWhite bg-primary mt-10 md:text-[16px] text-[14px]'>Show less <span><ArrowUpwardIcon /></span></button>

                </div>}


            </div>

            <div className=' w-[90%] mx-auto md:mx-0 md:w-[30%] h-[30rem] flex flex-col justify-center'>
                <h2 className=' text-center font-poppins font-semibold text-[14px] sm:text-[16px] md:text-[18px] mb-2'>Average Rating</h2>
                <p className=' text-center font-poppins font-semibold text-[14px] sm:text-[16px] md:text-[18px] mb-2'>4.4/5</p>
                <div className='sm:block hidden text-center mb-10'><Ratings color="#FFAD33" ratings={4.4} size='40px' /></div>
                <div className='sm:hidden block text-center mb-10'><Ratings color="#FFAD33" ratings={4.4} size='30px' /></div>
                <ProgressBar ratings={5} percentage="70" />
                <ProgressBar ratings={4} percentage="80" />
                <ProgressBar ratings={3} percentage="40" />
                <ProgressBar ratings={2} percentage="25" />
                <ProgressBar ratings={1} percentage="15" />
            </div>

        </div>
    </div>
  )
}

export default Reviews