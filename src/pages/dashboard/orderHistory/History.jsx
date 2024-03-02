import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../../firebase/firebase.config';
import { AuthContext } from '../../../context/AuthProvider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Check } from '@mui/icons-material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import MapIcon from '@mui/icons-material/Map';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import BikeScooterIcon from '@mui/icons-material/BikeScooter';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InventoryIcon from '@mui/icons-material/Inventory';
import { dot } from '../../../constants/images';
import { Spinner } from '../../../components';
import GoToTop from '../../../components/GoToTop/GoToTop';

const History = () => {
    const [info, setInfo] = useState([]);
    const {user} = useContext(AuthContext)
    const [orderDetails, setOrderDetails] = useState(false)
    let [allOrders, setAllOrders] = useState([])
    let [curOrder, setCurOrder] = useState([])
    let [trackingConstants, setTrackingConstants] = useState([])
    let [orderPlaced, setOrderPlaced] = useState(false);
    let [orderConfirmed, setOrderConfirmed] = useState(false);
    let [orderDelivered, setOrderDelivered] = useState(false);
    let [orderShipped, setOrderShipped] = useState(false);
    let [orderOnWay, setOrderOnWay] = useState(false)
    let [orderReached, setOrderReached] = useState(false)
    let [orderOutForDelivery, setOrderOutForDelivery] = useState(false)
    let [orderDeliveringToday, setOrderDeliveringToday] = useState(false);
    

    const getInfo = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data()
        
        setInfo(data)
    }

    useEffect( () => {
        getInfo()
    }, [])

    allOrders = info?.orders
    trackingConstants = info?.trackConstants

    orderPlaced = curOrder?.orderPlaced
    orderConfirmed = curOrder?.orderConfirmed
    orderShipped = curOrder?.orderShipped
    orderOnWay = curOrder?.orderOnWay
    orderReached = curOrder?.orderReached
    orderOutForDelivery = curOrder?.orderOutForDelivery
    orderDeliveringToday = curOrder?.orderDeliveringToday
    orderDelivered = curOrder?.orderDelivered

  return (
    <div className={`${orderDetails ? ' w-full sm:w-[75%]' : 'sm:w-[75%] w-full'} font-poppins`}>
        <GoToTop />

        {info?.length !== 0 
            ?
                allOrders?.length >= 1 
                    ?
                        !orderDetails && 
                            <div className=' w-[100%]  border border-primaryGray'>
                                <div className=' w-full text-[14px] p-4'>
                                    <h2 className=' font-semibold'>ORDER HISTORY</h2>
                                </div>
                                <div className=' flex items-center  w-full text-[10px] sm:text-[12px] text-center bg-primaryGray font-medium py-4'>
                                    <p className=' w-[20%] '>ORDER ID</p>
                                    <p className=' w-[20%] '>STATUS</p>
                                    <p className=' w-[20%] '>DATE</p>
                                    <p className=' w-[20%]'>TOTAL</p>
                                    <p className=' w-[20%]'>ACTION</p>
                                </div>
                                <div className=' w-full my-6'>
                                    {allOrders?.reverse().map((item, i) => (
                                        <div key={i + 1} className=' flex items-center text-center md:text-[12px] text-[8px] mb-2' >
                                        <p className=' w-[20%] text-center py-4 font-medium'>#{item?.orderId}</p>
                                        <p className='w-[20%] text-center font-medium py-4'>{item?.orderPlaced && !item?.orderShipped ? <span className=' text-primary'>IN PROGRESS</span> : item?.orderPlaced && item?.orderShipped && !item?.orderDelivered ? <span className=' text-primaryBlue'>SHIPPED</span> : item?.orderPlaced && item?.orderShipped && item?.orderDelivered && <span className=' text-lightGreen'>COMPLETED</span>}</p>
                                        <p className='w-[20%] text-center font-medium'>{item?.month} {item?.day}, {item?.year} {item?.time}</p>
                                        <p className=' w-[20%] text-center font-medium'>&#8358; {(item?.totalCart).toLocaleString()}({item?.cartItem.length} {item?.cartItem.length > 1 ? 'products' : item?.cartItem.length === 1 && 'product'})</p>
                                        <p onClick={() => {
                                            setOrderDetails(true)
                                            setCurOrder(item)
                                            console.log(curOrder)
                                            console.log(orderDetails)
                                            }} 
                                            className=' w-[20%] text-center text-primaryBlue font-medium cursor-pointer'>
                                                View All <span><ArrowForwardIcon style={{fontSize: 16}}  /></span>
                                        </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        : <h2 className=' font-poppins text-[12px] sm:text-[14px] md:text-[16px]'>No Orders yet...</h2>
                    :   <div className='h-[50vh] flex justify-center items-center'><Spinner /></div>
        
        }
        

        { orderDetails &&
            <div className=' w-[100%] md:mx-auto px-2 font-poppins '>
                <div className='mx-auto border border-primaryGray'>
                <div className=' p-6 border-b border-primaryGray'>
                    <p onClick={() => setOrderDetails(false)} className=' font-semibold text-[12px] md:text-[14px] cursor-pointer'><span className=' mr-2'><ArrowBackIcon /></span>ORDER DETAILS</p>
                </div>
                <div className=' bg-[#FDFAE7] p-3 m-3  md:m-6 md:p-6 flex sm:flex-row flex-col items-start sm:items-center justify-between'>
                    <div>
                        <h2 className=' font-poppins font-medium text-[18px] md:text-[22px]'>#{curOrder?.orderId}</h2>
                        <p className=' flex items-center md:gap-4 gap-2 font-poppins text-neutral mt-2 sm:mt-4 text-[10px] md:text-[14px]'>
                            <span>
                            {curOrder?.cartItem?.length} {curOrder?.cartItem.length > 1 ? 'products' : 'product'}
                            </span>
                            <span><img src={dot} alt="" /></span>
                            <span>Order Placed {curOrder?.weekday} {curOrder?.day} {curOrder?.month}, {curOrder?.year} at {curOrder?.time}</span>
                        </p>
                    </div>

                    <h2 className=' text-[18px] md:text-[32px] font-medium font-inter text-primaryBlue mt-4 sm:mt-0'>&#8358; {(curOrder?.totalCart).toLocaleString()}</h2>

                </div>

                <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] mt-6 mx-6 '>

                    Order expected arrival between
                    <span className=' font-medium ml-2'>
                    {curOrder?.shipping === "Free" 
                        ? `${curOrder?.freeDeliveryDate?.weekdayFree} ${curOrder?.freeDeliveryDate?.dayFree} ${curOrder?.freeDeliveryDate?.monthFree}, ${curOrder?.freeDeliveryDate?.yearFree}`  
                        : `${curOrder?.expressDeliveryDate?.weekdayExpress} ${curOrder?.expressDeliveryDate?.dayExpress} ${curOrder?.expressDeliveryDate?.monthExpress}, ${curOrder?.expressDeliveryDate?.yearExpress}`
                    }
                    </span>
                    <span className=' font-medium ml-2'>-</span>
                    <span className=' font-medium ml-2'>
                    {curOrder?.shipping === "Free" 
                        ? `${curOrder?.maxFreeDeliveryDate?.weekdayMaxFree} ${curOrder?.maxFreeDeliveryDate?.dayMaxFree} ${curOrder?.maxFreeDeliveryDate?.monthMaxFree}, ${curOrder?.maxFreeDeliveryDate?.yearMaxFree}`  
                        : `${curOrder?.maxExpressDeliveryDate?.weekdayMaxExpress} ${curOrder?.maxExpressDeliveryDate?.dayMaxExpress} ${curOrder?.maxExpressDeliveryDate?.monthMaxExpress}, ${curOrder?.maxExpressDeliveryDate?.yearMaxExpress}`
                    }
                    </span>
                </p>

                <div className=' w-[80%] mx-auto mt-[2.83rem] relative'>
                    <div className=' text-center flex  items-center '>
                        <div className='text-primaryWhite md:w-[32px] md:h-[22px] w-[30px] sm:h-[18px] h-[15px] border md:border-2 border-primaryWhite rounded-full bg-lightGreen flex justify-center items-center'><Check style={{fontSize: 14, fontWeight: 600}} /></div>
                        <div className=' md:h-[6px] md:w-[263.4px] h-[3px] w-[140px] bg-lightGreen' />
                        <div className={`text-primaryWhite  md:w-[32px] md:h-[22px] w-[30px] sm:h-[18px] h-[15px] rounded-full  flex justify-center items-center ${orderConfirmed ? 'border md:border-2 border-primaryWhite bg-lightGreen' : ' border md:border-2 border-primary bg-transparent'}`}>{orderConfirmed && <Check style={{fontSize: 14, fontWeight: 600}} />}</div>
                        <div className={`md:h-[6px] md:w-[263.4px] h-[3px] w-[140px] ${orderConfirmed ? 'opacity-100 bg-lightGreen' : 'opacity-20 bg-primary'}`} />
                        <div className={`text-primaryWhite md:w-[32px] md:h-[22px] w-[30px] sm:h-[18px] h-[15px] rounded-full flex justify-center items-center ${orderShipped ? 'border-2 border-primaryWhite bg-lightGreen' : 'border md:border-2 border-primary bg-transparent'}`}>{orderShipped && <Check style={{fontSize: 14, fontWeight: 600}} />}</div>
                        <div className={`md:h-[6px] md:w-[263.4px] h-[3px] w-[140px] ${orderShipped ? 'opacity-100 bg-lightGreen' : 'bg-primary opacity-20'}`} />
                        <div className={`text-primaryWhite md:w-[32px] md:h-[22px] w-[30px] sm:h-[18px] h-[15px] rounded-full flex justify-center items-center ${orderOutForDelivery ? 'border-2 border-primaryWhite bg-lightGreen' : 'border md:border-2 border-primary bg-transparent'}`}>{orderOutForDelivery && <Check style={{fontSize: 14, fontWeight: 600}} />}</div>
                        <div className={`md:h-[6px] md:w-[263.4px] h-[3px] w-[140px] ${orderOutForDelivery ? 'opacity-100 bg-lightGreen' : 'bg-primary opacity-20'}`} />
                        <div className={`text-primaryWhite md:w-[32px] md:h-[22px] w-[30px] sm:h-[18px] h-[15px] rounded-full flex items-center justify-center ${orderDelivered ? 'border-2 border-primaryWhite bg-lightGreen' : 'border md:border-2 border-primary bg-transparent'}`}>{orderDelivered && <Check style={{fontSize: 14, fontWeight: 600}} />}</div>
                    </div>
                </div>

                <div className=' w-full flex items-center justify-evenly md:justify-around mt-8 sm:text-[10px] md:text-[16px] text-[8px]'>
                    <h2 className=' font-poppins font-medium text-lightGreen'>Order Placed</h2> 
                    <h2 className={`font-poppins ${orderConfirmed ? 'text-lightGreen font-medium' : 'text-primaryBlack'}`}>Order Confirmed</h2> 
                    <h2 className={`font-poppins ${orderShipped ? 'text-lightGreen font-medium' : 'text-primaryBlack'}`}>Order Shipped</h2> 
                    <h2 className={`font-poppins ${orderOutForDelivery ? 'text-lightGreen font-medium' : 'text-primaryBlack'}`}>Out For Delivery</h2> 
                    <h2 className={`font-poppins ${orderDelivered ? 'text-lightGreen font-medium' : 'text-primaryBlack'}`}>Delivered</h2> 
                </div>

                <div className='mt-[4rem] mx-6 mb-6'>
                    <h2 className=' font-poppins text-[16px] md:text-[18px] font-medium'>Order Activity</h2>
                    {curOrder?.shipping === "Free" 
                    ? 
                        // when order is free
                        <div>
                        {orderDelivered && 
                            <div className=' mt-[2rem] flex items-center gap-4'>
                            <div className=' w-[48px] h-[48px] flex justify-center items-center text-[#2DB324] bg-[#EAF7E9]'>
                                <DoneAllIcon />
                            </div>
                            <div>
                                <h3 className=' font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.delivered}</h3>
                                <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${curOrder?.orderDeliveredConfirmation?.weekdayDelivered} ${curOrder?.orderDeliveredConfirmation?.dayDelivered} ${curOrder?.orderDeliveredConfirmation?.monthDelivered}, ${curOrder?.orderDeliveredConfirmation?.yearDelivered} at ${curOrder?.orderDeliveredConfirmation?.timeDelivered}`}</p>
                            </div>
                            </div>
                        }

                        {orderDeliveringToday && 
                            <div className=' mt-[2rem] flex items-center gap-4'>
                            <div className=' w-[48px] h-[48px] flex justify-center items-center text-primaryBlue bg-[#EAF6FE]'>
                                <LocalShippingIcon />
                            </div>
                            <div>
                                <h3 className=' font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.dayDelivery}</h3>
                                <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${curOrder?.orderDeliveringTodayConfirmation?.weekdayDeliveringToday} ${curOrder?.orderDeliveringTodayConfirmation?.dayDeliveringToday} ${curOrder?.orderDeliveringTodayConfirmation?.monthDeliveringToday}, ${curOrder?.orderDeliveringTodayConfirmation?.yearDeliveringToday} at ${curOrder?.orderDeliveringTodayConfirmation?.timeDeliveringToday}`}</p>
                            </div>
                            </div>
                        }

                        {orderOutForDelivery && 
                            <div className=' mt-[2rem] flex items-center gap-4'>
                            <div className=' w-[48px] h-[48px] flex justify-center items-center text-primaryBlue bg-[#EAF6FE]'>
                                <BikeScooterIcon />
                            </div>
                            <div>
                                <h3 className=' font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.outForDelivery}</h3>
                                <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${curOrder?.orderOutForDeliveryConfirmation?.weekdayOutForDelivery} ${curOrder?.orderOutForDeliveryConfirmation?.dayOutForDelivery} ${curOrder?.orderOutForDeliveryConfirmation?.monthOutForDelivery}, ${curOrder?.orderOutForDeliveryConfirmation?.yearOutForDelivery} at ${curOrder?.orderOutForDeliveryConfirmation?.timeOutForDelivery}`}</p>
                            </div>
                            </div>
                        }
                        
                        {orderReached && 
                            <div className=' mt-[2rem] flex items-center gap-4'>
                            <div className=' w-[48px] h-[48px] flex justify-center items-center text-primaryBlue bg-[#EAF6FE]'>
                                <MapsHomeWorkIcon />
                            </div>
                            <div>
                                <h3 className=' font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.ontheway2}</h3>
                                <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${curOrder?.orderReachedConfirmation?.weekdayReached} ${curOrder?.orderReachedConfirmation?.dayReached} ${curOrder?.orderReachedConfirmation?.monthReached}, ${curOrder?.orderReachedConfirmation?.yearReached} at ${curOrder?.orderReachedConfirmation?.timeReached}`}</p>
                            </div>
                            </div>
                        }

                        {orderOnWay && 
                            <div className=' mt-[2rem] flex items-center gap-4'>
                            <div className=' w-[48px] h-[48px] flex justify-center items-center text-primaryBlue bg-[#EAF6FE]'>
                                <MapIcon />
                            </div>
                            <div>
                                <h3 className=' font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.ontheway}</h3>
                                <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${curOrder?.orderOnWayConfirmation?.weekdayOnWay} ${curOrder?.orderOnWayConfirmation?.dayOnWay} ${curOrder?.orderOnWayConfirmation?.monthOnWay}, ${curOrder?.orderOnWayConfirmation?.yearOnWay} at ${curOrder?.orderOnWayConfirmation?.timeOnWay}`}</p>
                            </div>
                            </div>
                        }

                        {orderShipped && 
                            <div className=' mt-[2rem] flex items-center gap-4'>
                            <div className=' w-[48px] h-[48px] flex justify-center items-center text-[#2DB324] bg-[#EAF7E9]'>
                                <InventoryIcon />
                            </div>
                            <div>
                                <h3 className=' font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.shipped}</h3>
                                <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${curOrder?.orderShippingConfirmation?.weekdayShipping} ${curOrder?.orderShippingConfirmation?.dayShipping} ${curOrder?.orderShippingConfirmation?.monthShipping}, ${curOrder?.orderShippingConfirmation?.yearShipping} at ${curOrder?.orderShippingConfirmation?.timeShipping}`}</p>
                            </div>
                            </div>
                        }

                        {orderConfirmed && 
                            <div className=' mt-[2rem] flex items-center gap-4'>
                            <div className=' w-[48px] h-[48px] flex justify-center items-center text-[#2DB324] bg-[#EAF7E9]'>
                                <TaskAltIcon />
                            </div>
                            <div>
                                <h3 className=' font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.confirmed}</h3>
                                <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${curOrder?.orderConfirmation?.weekdayConfirmation} ${curOrder?.orderConfirmation?.dayConfirmation} ${curOrder?.orderConfirmation?.monthConfirmation}, ${curOrder?.orderConfirmation?.yearConfirmation} at ${curOrder?.orderConfirmation?.timeConfirmation}`}</p>
                            </div>
                            </div>
                        }

                        {orderPlaced && 
                            <div className=' mt-[2rem] flex items-center gap-4'>
                            <div className=' w-[48px] h-[48px] flex justify-center items-center text-primaryBlue bg-[#EAF6FE]'>
                                <EventNoteIcon />
                            </div>
                            <div>
                                <h3 className=' font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.placed}</h3>
                                <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${curOrder?.weekday} ${curOrder?.day} ${curOrder?.month}, ${curOrder?.year} at ${curOrder?.time}`}</p>
                            </div>
                            </div>
                        }

                        </div>
                        // when order is express
                    : ""
                    
                    }
                </div>

                </div>
                <div className='py-8  border-t-0 border border-primaryGray'>
                    <p className=' text-[16px] md:text-[18px] px-6'>
                    <span className='mr-2 font-semibold'>{curOrder?.cartItem.length > 1 ? 'Products' : curOrder?.cartItem.length === 1 && 'Product'}</span>
                    <span>{`(${curOrder?.cartItem.length})`}</span>
                    </p>
                    <div className=' my-6 bg-primaryGray w-full flex items-center px-6 py-3 text-[10px] sm:text-[12px] text-center font-medium'>
                    <p className=' w-[40%]'>PRODUCTS</p>
                    <p className=' w-[20%]'>PRICE</p>
                    <p className=' w-[20%]'>QUANTITY</p>
                    <p className=' w-[20%]'>SUBTOTAL</p>
                    </div>
                    
                    <div className=' px-6'>
                    {curOrder?.cartItem.map((item) => (
                        <div key={item?.id} className=' flex items-center py-6'>
                        <div className=' w-[40%] flex items-center sm:gap-6 gap-3'>
                            <img src={item?.image || item?.img || item?.imageProfile} alt="" className=' md:w-[70px] sm:w-[55px] w-[25px]' />
                            <div>
                            <p className=' text-primaryBlue uppercase md:text-[12px] sm:text-[10px] text-[8px] font-medium'>{item?.category}</p>
                            <p className=' md:text-[12px] sm:text-[10px] text-[8px] max-w-[320px]'>{item?.name}</p>
                            </div>
                        </div>

                        <div className=' w-[20%] text-center md:text-[12px] sm:text-[10px] text-[8px]'>
                            <p>&#8358; {(item?.price).toLocaleString()}</p>
                        </div>

                        <div className=' w-[20%] text-center md:text-[12px] sm:text-[10px] text-[8px]'>
                            <p>x {item?.cartQuantity}</p>
                        </div>

                        <div className=' w-[20%] text-center md:text-[12px] sm:text-[10px] text-[8px]'>
                            <p>&#8358; {(item?.cartQuantity * item?.price).toLocaleString()}</p>
                        </div>
                        </div>
                    ))}

                    </div>
                </div>

                <div className=' border-primaryGray border border-t-0 py-8 px-6'>
                    <h2 className=' text-[16px] sm:text-[14px] md:text-[18px] font-medium uppercase'>Shipping Details</h2>

                    <h3 className=' mt-8 font-medium text-[14px] md:text-[16px]'>{info?.fullname}</h3>
                    <p className=' text-neutral md:text-[14px] sm:text-[12px] text-[10px] my-2'>{info?.address}, {info?.city}, {info?.state} state, {info?.country}. </p>
                    <p className=' md:text-[14px] sm:text-[12px] text-[10px] font-medium text-neutral'>Email: <span className='font-normal'>{info?.email}</span></p>
                    <p className='md:text-[14px] sm:text-[12px] text-[10px] font-medium text-neutral mt-2'>Contact: <span className='font-normal'>{info?.phoneNumber}</span></p>
                    <p className=' md:text-[14px] sm:text-[12px] text-[10px] font-medium text-neutral mt-2'>Contact 2: <span className='font-normal'>{info?.phoneNumber2}</span></p>
                </div>


              
      
            </div>
        }
    </div> 
  )
}

export default History