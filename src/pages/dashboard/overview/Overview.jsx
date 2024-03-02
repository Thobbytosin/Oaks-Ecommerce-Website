/* eslint-disable no-unsafe-optional-chaining */
import React, { useContext, useEffect, useState } from 'react'
import RocketIcon from '@mui/icons-material/Rocket';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';
import { AuthContext } from '../../../context/AuthProvider';
import { beatz, noprofile } from '../../../constants/images';
import { Spinner } from '../../../components';
import GoToTop from '../../../components/GoToTop/GoToTop';

const Overview = () => {
    const [showAll, setShowAll] = useState(false)
    const [info, setInfo] = useState([])
    let [pendingOrders, setPendingOrders] = useState([])
    let [completedOrders, setCompletedOrders] = useState([])
    let [allOrders, setAllOrders] = useState([])
    

    const {user} = useContext(AuthContext)


    const getInfo = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data()
        
        setInfo(data)
        // setAllOrders(info?.orders)
    }

    useEffect( () => {
        getInfo()
    }, [])

    allOrders = info?.orders
    // console.log(allOrders)

    
    const pending = info?.orders?.filter((order) => !order.orderDelivered)
    pendingOrders = pending

    const completed = info?.orders?.filter((order) => order.orderDelivered)
    completedOrders = completed

  return (
    <div className=' w-full sm:w-[75%] font-poppins'>
      <GoToTop />
      {info?.length !== 0 
        ?
          <div>

            <h2 className=' font-semibold text-[18px] md:text-[20px] mb-6'>Hello, {`${info?.username}`}</h2>
            <p className=' max-w-[443px] text-[12px] md:text-[14px]'>From your account dashboard. you can easily check & view your <span className=' text-primaryBlue'>Recent Orders</span>, manage your <span className=' text-primaryBlue'>Shipping and Billing Addresses</span> and edit your <span className=' text-primaryBlue'>Password</span> and <span className=' text-primaryBlue'>Account Details.</span></p>

            <div className=' mt-10 flex flex-wrap items-center md:items-start justify-center md:justify-start md:flex-nowrap md:gap-4 gap-2 '>
              <div className=' w-[324px] min-h-[312px] border border-primaryGray'>
                <div className=' w-full font-medium text-[12px] md:text-[14px] p-4 border-b border-primaryGray'>
                    ACCOUNT INFO
                </div>
                <div className=' w-full p-4 flex items-start gap-5'>
                  <div className=' rounded-full w-[48px] h-[48px] border-2 border-primaryGray overflow-hidden flex items-center justify-center'>
                      <img src={user?.photoURL} alt="" className=' w-[40px] object-contain' />
                  </div>
                  <div>
                    <h2 className=' font-semibold text-[14px] md:text-[16px]'>{info?.fullname}</h2>
                    <p className=' italic text-neutral text-[12px]'>{user?.emailVerified ? 'Verified User' : 'Not verified'}</p>
                  </div>

                </div>
                {user?.emailVerified && <p className='mt-2 mx-4 text-[14px] font-medium'>Email: <span className=' font-normal ml-1 text-[12px]'>{info?.email}</span></p>}
                {info?.username && <p className='mt-2 mx-4 text-[14px] font-medium'>Username: <span className=' font-normal ml-1 text-[12px]'>{info?.username}</span></p>}
                {info?.phoneNumber && <p className='mt-2 mx-4 text-[14px] font-medium'>Phone: <span className=' font-normal ml-1 text-[12px]'>{info?.phoneNumber}</span></p>}
                {info?.state && <p className='mt-2 mx-4 text-[14px] font-medium'>State: <span className=' font-normal ml-1 text-[12px]'>{info?.state}</span></p>}
                {info?.address && <p className='mt-2 mx-4 text-[14px] font-medium'>Address: <span className=' font-normal ml-1 text-[12px]'>{info?.address}</span></p>}
                
              </div>

              <div className=' w-[324px] min-h-[312px] border border-primaryGray'>
                <div className=' w-full font-medium text-[12px] md:text-[14px] p-4 border-b border-primaryGray'>
                    BILLING ADDRESS
                </div>
                <div className=' w-full px-4 mt-5 gap-5'>
                  <div className=' mb-3'>
                    <h2 className=' font-semibold text-[14px] md:text-[16px]'>{info?.fullname}</h2>
                    {user?.emailVerified && info?.address && 
                    
                      <p className='mt-2 text-[14px] text-neutral'>{info?.address}, {info?.city}, {info?.state}, {info?.countyr}.</p>
                    
                    }
                  </div>

                </div>
                {user?.emailVerified && <p className='mt-2 mx-4 text-[14px] font-medium'>Email: <span className=' font-normal ml-1 text-[12px]'>{info?.email}</span></p>}
                {info?.phoneNumber && <p className='mt-2 mx-4 text-[14px] font-medium'>Phone: <span className=' font-normal ml-1 text-[12px]'>{info?.phoneNumber}</span></p>}
                {info?.phoneNumber2 && <p className='mt-2 mx-4 text-[14px] font-medium'>Phone 2: <span className=' font-normal ml-1 text-[12px]'>{info?.phoneNumber2}</span></p>}
                
              </div>

              <div className=' w-[324px] min-h-[312px] flex flex-col justify-between '>
                <div className=' w-full bg-[#EAF6FE] flex items-start gap-3 p-[16px]'>
                  <div className=' text-primaryBlue bg-primaryWhite p-[12px] '><RocketIcon /></div>
                  <div>
                    <h2 className=' font-semibold text-[18px] md:text-[20px] '>{info?.orders?.length.toString().padStart(2, 0)}</h2>
                    <p className=' text-[12px] md:text-[14px] text-neutral'>Total Orders</p>
                  </div>
                </div>
                <div className=' w-full bg-primary bg-opacity-10 flex items-start gap-3 p-[16px]'>
                  <div className=' text-primary bg-primaryWhite p-[12px] '><ReceiptIcon /></div>
                  <div>
                    <h2 className=' font-semibold text-[18px] md:text-[20px] '>{pendingOrders?.length.toString().padStart(2, 0)}</h2>
                    <p className=' text-[12px] md:text-[14px] text-neutral'>Pending Orders</p>
                  </div>
                </div>

                <div className=' w-full bg-[#EAF7E9] flex items-start gap-3 p-[16px]'>
                  <div className=' text-lightGreen bg-primaryWhite p-[12px] '><InventoryIcon /></div>
                  <div>
                    <h2 className=' font-semibold text-[18px] md:text-[20px] '>{completedOrders?.length.toString().padStart(2, 0)}</h2>
                    <p className=' text-[12px] md:text-[14px] text-neutral'>Completed Orders</p>
                  </div>
                </div>
                
                
              </div>

            </div>
                    
            <div className=' w-full mt-10 border border-primaryGray'>
              <div className=' w-full flex justify-between items-center text-[12px] sm:text-[14px] p-4'>
                <h2 className=' font-semibold'>RECENT ORDER</h2>
                <p onClick={() => setShowAll(true)} className=' text-primary font-medium cursor-pointer text-[10px] sm:text-[12px]'>View All <span><ArrowForwardIcon style={{fontSize: 16}} /></span></p>
              </div>
              <div className=' flex items-center  w-full text-[10px] sm:text-[12px] text-center bg-primaryGray font-medium py-4'>
                <p className=' w-[20%] '>ORDER ID</p>
                <p className=' w-[20%] '>STATUS</p>
                <p className=' w-[20%] '>DATE</p>
                <p className=' w-[20%]'>TOTAL</p>
                <p className=' w-[20%]'>SUMMARY</p>
              </div>
              {allOrders?.length >= 1
                ?
                  <div className=' w-full my-6'>
                      {allOrders?.reverse().slice(0, 6).map((item, i) => (
                        <div key={i + 1} className=' flex items-center text-center md:text-[14px] sm:text-[10px] text-[8px] mb-2' >
                          <p className=' w-[20%] text-center py-6 font-medium'>#{item?.orderId}</p>
                          <p className='w-[20%] text-center font-medium py-4 '>{item?.orderPlaced && !item?.orderDelivered ? <span className=' text-primary'>IN PROGRESS</span>: item?.orderPlaced && item?.orderDelivered && <span className=' text-lightGreen'>COMPLETED</span> }</p>
                          <p className='w-[20%] text-center font-medium'>{item?.month} {item?.day}, {item?.year} {item?.time}</p>
                          <p className=' w-[20%] text-center font-medium'>&#8358; {(item?.totalCart).toLocaleString()}</p>
                          <p className=' w-[20%] text-center font-medium'>{item?.cartItem.length} {item?.cartItem.length > 1 ? 'products' : item?.cartItem.length === 1 && 'product'}</p>
                        </div>
                        
                      ))}
                  </div>
                : <h2 className=' text-[12px] sm:text-[14px] md:text-[16px] m-8 font-poppins font-medium'>No recent orders...</h2>

              }
            </div>
          </div>
        : <div className='h-[50vh] flex justify-center items-center'><Spinner /></div>
      
      }
    </div>
  )
}

export default Overview