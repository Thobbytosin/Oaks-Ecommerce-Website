/* eslint-disable no-unsafe-optional-chaining */
import React, { useContext, useEffect, useState } from 'react'
import styles from '../../styles'
import PageTag from '../../components/PageTag/PageTag'
import { dot, help } from '../../constants/images'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AuthContext } from '../../context/AuthProvider';
import { db } from '../../firebase/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import GoToTop from '../../components/GoToTop/GoToTop';
import { Check } from '@mui/icons-material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import MapIcon from '@mui/icons-material/Map';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import BikeScooterIcon from '@mui/icons-material/BikeScooter';

const TrackOrder = () => {
  const initialValues = { orderId: "", email: ""}
  const [formValues, setFormValues] = useState(initialValues)
  const [email, setEmail] = useState("")
  // const [orderId, setOrderId] = useState("")
  let [info, setInfo] = useState([])
  let [ordersIdArray, setOrdersIdArray] = useState([])
  let [orders, setOrders] = useState([])
  let [order, setOrder] = useState([])
  const {user} = useContext(AuthContext)
  const [formErrors, setFormErrors] = useState({})
  const [showDetails, setShowDetails] = useState(false)
  let [id, setId] = useState("")
  const [data, setData] = useState([])
  const [func, setFunc] = useState(true)
  let [orderPlaced, setOrderPlaced] = useState(false);
  let [orderConfirmed, setOrderConfirmed] = useState(false);
  let [orderDelivered, setOrderDelivered] = useState(false);
  let [orderShipped, setOrderShipped] = useState(false);
  let [orderOnWay, setOrderOnWay] = useState(false)
  let [orderReached, setOrderReached] = useState(false)
  let [orderOutForDelivery, setOrderOutForDelivery] = useState(false)
  let [orderDeliveringToday, setOrderDeliveringToday] = useState(false);
  let [trackingConstants, setTrackingConstants] = useState([])
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value})
    // console.log(formValues)
}
  
  
  const getInfo = async () => {
    const docRef = doc(db, "users", user?.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data()

    info = userData
    setEmail(info.email)
    setOrders(info.orders)
    setTrackingConstants(info.trackConstants)
    const orderIdArray = info?.orders?.map((order) => order?.orderId)
    setOrdersIdArray(orderIdArray)
    console.log(info)
    // console.log(trackingConstants)
  }
  
  useEffect(() => {
    getInfo()
  }, [])

  // console.log(info)
  console.log(orders)
  console.log(trackingConstants)

  const handleSubmit = (e) => {
    e.preventDefault()

    
    setFormErrors(validateForm(formValues))
    
  }
  
  const validateForm =  (values) => {
    const errors = {}
    if (!ordersIdArray?.includes(values?.orderId, 0)){
      errors.orderId = "Order Id is not valid. Please enter a valid order id."
    } else if (values?.email !== email) {
      errors.email = "Invalid email address."
    } else {
      setId(values.orderId)
      setShowDetails(true)
    }

    return errors
  }
  
  

  const findOrder = orders?.filter((order) => order.orderId === id)
  order = findOrder
  console.log(order)
  orderPlaced = order[0]?.orderPlaced
  orderConfirmed = order[0]?.orderConfirmed
  orderShipped = order[0]?.orderShipped
  orderOnWay = order[0]?.orderOnWay
  orderReached = order[0]?.orderReached
  orderOutForDelivery = order[0]?.orderOutForDelivery
  orderDeliveringToday = order[0]?.orderDeliveringToday
  orderDelivered = order[0]?.orderDelivered

  // Add time range with Math.random for minutes, hours and days for each confirmation and out of delivery

  return (
    <>
      <GoToTop />
      {showDetails 
        ? 
          <div className={`${styles.newPageSectionProducts} ${styles.padding} mb-10`}>
            <PageTag prevPage="Home" curPage="Track Order" subPage='Details' />
            <div className='w-[100%] md:w-[80%] mx-auto border border-primaryGray p-3 sm:p-6 mb-[2.83rem]'>
              <div className=' bg-[#FDFAE7] w-full p-3 sm:p-6 flex sm:flex-row flex-col items-start sm:items-center justify-between'>
                <div>
                  <h2 className=' font-poppins font-medium text-[16px] sm:text-[18px] md:text-[22px]'>#{order[0]?.orderId}</h2>
                  <p className=' flex items-center gap-4 font-poppins text-neutral mt-2 sm:mt-4 text-[8px] sm:text-[10px] md:text-[14px]'>
                    <span>
                      {order[0]?.cartItem.length} {order[0]?.cartItem.length > 1 ? 'products' : 'product'}
                    </span>
                    <span><img src={dot} alt="" /></span>
                    <span>Order Placed {order[0]?.weekday} {order[0]?.day} {order[0]?.month}, {order[0]?.year} at {order[0]?.time}</span>
                  </p>
                </div>

                <h2 className=' text-[18px] md:text-[32px] font-medium font-inter text-primaryBlue mt-4 sm:mt-0'>&#8358; {(order[0]?.totalCart).toLocaleString()}</h2>

              </div>

              <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] mt-3 sm:mt-6 mx-3 sm:mx-6 '>

                Order expected arrival between
                <span className=' font-medium ml-2'>
                  {order[0]?.shipping === "Free" 
                    ? `${order[0]?.freeDeliveryDate?.weekdayFree} ${order[0]?.freeDeliveryDate?.dayFree} ${order[0]?.freeDeliveryDate?.monthFree}, ${order[0]?.freeDeliveryDate?.yearFree}`  
                    : `${order[0]?.expressDeliveryDate?.weekdayExpress} ${order[0]?.expressDeliveryDate?.dayExpress} ${order[0]?.expressDeliveryDate?.monthExpress}, ${order[0]?.expressDeliveryDate?.yearExpress}`
                  }
                </span>
                <span className=' font-medium ml-2'>-</span>
                <span className=' font-medium ml-2'>
                  {order[0]?.shipping === "Free" 
                    ? `${order[0]?.maxFreeDeliveryDate?.weekdayMaxFree} ${order[0]?.maxFreeDeliveryDate?.dayMaxFree} ${order[0]?.maxFreeDeliveryDate?.monthMaxFree}, ${order[0]?.maxFreeDeliveryDate?.yearMaxFree}`  
                    : `${order[0]?.maxExpressDeliveryDate?.weekdayMaxExpress} ${order[0]?.maxExpressDeliveryDate?.dayMaxExpress} ${order[0]?.maxExpressDeliveryDate?.monthMaxExpress}, ${order[0]?.maxExpressDeliveryDate?.yearMaxExpress}`
                  }
                </span>
              </p>

              <div className=' w-[80%] mx-auto my-[2.83rem] relative'>
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

              <div className='w-full flex items-center justify-evenly md:justify-around mt-8 sm:text-[10px] md:text-[16px] text-[8px] '>
                <h2 className=' font-poppins font-medium text-lightGreen'>Order Placed</h2> 
                <h2 className={`font-poppins ${orderConfirmed ? 'text-lightGreen font-medium' : 'text-primaryBlack'}`}>Order Confirmed</h2> 
                <h2 className={`font-poppins ${orderShipped ? 'text-lightGreen font-medium' : 'text-primaryBlack'}`}>Order Shipped</h2> 
                <h2 className={`font-poppins ${orderOutForDelivery ? 'text-lightGreen font-medium' : 'text-primaryBlack'}`}>Out For Delivery</h2> 
                <h2 className={`font-poppins ${orderDelivered ? 'text-lightGreen font-medium' : 'text-primaryBlack'}`}>Delivered</h2> 
              </div>

              <div className='mt-[1rem] sm:mt-[2rem] md:mt-[3.2rem] mx-3 sm:mx-6 mb-3 sm:mb-6'>
                <h2 className=' font-poppins text-[12px] sm:text-[16px] md:text-[18px] font-medium'>Order Activity</h2>
                {order[0]?.shipping === "Free" 
                  ? 
                    // when order is free
                    <div>
                      {orderDelivered && 
                        <div className=' mt-[0.6] sm:mt-[1rem] flex items-center gap-4'>
                          <div className=' sm:w-[48px] sm:h-[48px] h-[34px] w-[34px] flex justify-center items-center text-[#2DB324] bg-[#EAF7E9]'>
                            <DoneAllIcon style={{fontSize: 16}}  />
                          </div>
                          <div>
                            <h3 className='font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.delivered}</h3>
                            <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${order[0]?.orderDeliveredConfirmation?.weekdayDelivered} ${order[0]?.orderDeliveredConfirmation?.dayDelivered} ${order[0]?.orderDeliveredConfirmation?.monthDelivered}, ${order[0]?.orderDeliveredConfirmation?.yearDelivered} at ${order[0]?.orderDeliveredConfirmation?.timeDelivered}`}</p>
                          </div>
                        </div>
                      }

                      {orderDeliveringToday && 
                        <div className=' mt-[2rem] flex items-center gap-4'>
                          <div className=' sm:w-[48px] sm:h-[48px] h-[34px] w-[34px] flex justify-center items-center text-primaryBlue bg-[#EAF6FE]'>
                            <LocalShippingIcon style={{fontSize: 16}}  />
                          </div>
                          <div>
                            <h3 className='font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.dayDelivery}</h3>
                            <p className='font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${order[0]?.orderDeliveringTodayConfirmation?.weekdayDeliveringToday} ${order[0]?.orderDeliveringTodayConfirmation?.dayDeliveringToday} ${order[0]?.orderDeliveringTodayConfirmation?.monthDeliveringToday}, ${order[0]?.orderDeliveringTodayConfirmation?.yearDeliveringToday} at ${order[0]?.orderDeliveringTodayConfirmation?.timeDeliveringToday}`}</p>
                          </div>
                        </div>
                      }

                      {orderOutForDelivery && 
                        <div className=' mt-[2rem] flex items-center gap-4'>
                          <div className=' sm:w-[48px] sm:h-[48px] h-[34px] w-[34px] flex justify-center items-center text-primaryBlue bg-[#EAF6FE]'>
                            <BikeScooterIcon style={{fontSize: 16}}  />
                          </div>
                          <div>
                            <h3 className='font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.outForDelivery}</h3>
                            <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${order[0]?.orderOutForDeliveryConfirmation?.weekdayOutForDelivery} ${order[0]?.orderOutForDeliveryConfirmation?.dayOutForDelivery} ${order[0]?.orderOutForDeliveryConfirmation?.monthOutForDelivery}, ${order[0]?.orderOutForDeliveryConfirmation?.yearOutForDelivery} at ${order[0]?.orderOutForDeliveryConfirmation?.timeOutForDelivery}`}</p>
                          </div>
                        </div>
                      }
                      
                      {orderReached && 
                        <div className=' mt-[2rem] flex items-center gap-4'>
                          <div className=' sm:w-[48px] sm:h-[48px] h-[34px] w-[34px] flex justify-center items-center text-primaryBlue bg-[#EAF6FE]'>
                            <MapsHomeWorkIcon style={{fontSize: 16}}  />
                          </div>
                          <div>
                            <h3 className=' font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.ontheway2}</h3>
                            <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${order[0]?.orderReachedConfirmation?.weekdayReached} ${order[0]?.orderReachedConfirmation?.dayReached} ${order[0]?.orderReachedConfirmation?.monthReached}, ${order[0]?.orderReachedConfirmation?.yearReached} at ${order[0]?.orderReachedConfirmation?.timeReached}`}</p>
                          </div>
                        </div>
                      }

                      {orderOnWay && 
                        <div className=' mt-[2rem] flex items-center gap-4'>
                          <div className=' sm:w-[48px] sm:h-[48px] h-[34px] w-[34px] flex justify-center items-center text-primaryBlue bg-[#EAF6FE]'>
                            <MapIcon style={{fontSize: 16}}  />
                          </div>
                          <div>
                            <h3 className=' font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.ontheway}</h3>
                            <p className='font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${order[0]?.orderOnWayConfirmation?.weekdayOnWay} ${order[0]?.orderOnWayConfirmation?.dayOnWay} ${order[0]?.orderOnWayConfirmation?.monthOnWay}, ${order[0]?.orderOnWayConfirmation?.yearOnWay} at ${order[0]?.orderOnWayConfirmation?.timeOnWay}`}</p>
                          </div>
                        </div>
                      }

                      {orderShipped && 
                        <div className=' mt-[2rem] flex items-center gap-4'>
                          <div className=' sm:w-[48px] sm:h-[48px] h-[34px] w-[34px] flex justify-center items-center text-[#2DB324] bg-[#EAF7E9]'>
                            <InventoryIcon style={{fontSize: 16}}  />
                          </div>
                          <div>
                            <h3 className='font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.shipped}</h3>
                            <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${order[0]?.orderShippingConfirmation?.weekdayShipping} ${order[0]?.orderShippingConfirmation?.dayShipping} ${order[0]?.orderShippingConfirmation?.monthShipping}, ${order[0]?.orderShippingConfirmation?.yearShipping} at ${order[0]?.orderShippingConfirmation?.timeShipping}`}</p>
                          </div>
                        </div>
                      }

                      {orderConfirmed && 
                        <div className=' mt-[2rem] flex items-center gap-4'>
                          <div className=' sm:w-[48px] sm:h-[48px] h-[34px] w-[34px] flex justify-center items-center text-[#2DB324] bg-[#EAF7E9]'>
                            <TaskAltIcon style={{fontSize: 16}}  />
                          </div>
                          <div>
                            <h3 className='font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.confirmed}</h3>
                            <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${order[0]?.orderConfirmation?.weekdayConfirmation} ${order[0]?.orderConfirmation?.dayConfirmation} ${order[0]?.orderConfirmation?.monthConfirmation}, ${order[0]?.orderConfirmation?.yearConfirmation} at ${order[0]?.orderConfirmation?.timeConfirmation}`}</p>
                          </div>
                        </div>
                      }

                      {orderPlaced && 
                        <div className=' mt-[2rem] flex items-center gap-4'>
                          <div className=' sm:w-[48px] sm:h-[48px] h-[34px] w-[34px] flex justify-center items-center text-primaryBlue bg-[#EAF6FE]'>
                            <EventNoteIcon style={{fontSize: 16}} />
                          </div>
                          <div>
                            <h3 className=' font-poppins font-medium text-[8px] sm:text-[12px] md:text-[14px] mb-2 max-w-[200px] sm:max-w-[520px] md:max-w-[700px]'>{trackingConstants[0]?.placed}</h3>
                            <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[14px] text-neutral'>{`${order[0]?.weekday} ${order[0]?.day} ${order[0]?.month}, ${order[0]?.year} at ${order[0]?.time}`}</p>
                          </div>
                        </div>
                      }

                    </div>
                    // when order is express
                  : ""
                
                }
              </div>
            
            </div>
          </div>
          
        :

          <div className={`${styles.newPageSectionProducts} ${styles.padding}`}>
            <PageTag prevPage="Home" curPage="Track Order" />
            
            <div>
              <h2 className=' font-poppins text-[26px] sm:text-[30px] md:text-[32px] font-semibold mb-4'>Track Order</h2>
              <p className=' font-poppins text-[10px] sm:text-[12px] md:text-[14px] max-w-[55rem] text-neutral mb-10'>To track your order please enter your order ID in the input field below and press the “Track Order” button. this was given to you on your receipt and in the confirmation email you should have received.</p>
              
              <form onSubmit={() => handleSubmit}>
                <div className=' sm:flex items-start gap-10'>
                  
                  <div className=' w-[100%] sm:w-[40%] md:w-[30%]'>
                    <label htmlFor="orderId" className=' block font-poppins text-[14px] md:text-[16px] mb-3 font-medium'>Order Id</label>
                    <input type="text" name='orderId' placeholder='ID...' value={formValues.orderId} onChange={handleChange} className=' border border-primaryGray rounded-[8px] p-2 w-full' required />
                    <p className=' mt-2 text-primary font-poppins text-[12px] md:text-[13px]'>{formErrors?.orderId}</p>

                  </div>
                  <div className=' w-[100%] sm:w-[40%] md:w-[30%] sm:mt-0 mt-5'>
                    <label htmlFor="email" className=' block font-poppins text-[14px] md:text-[16px] mb-3 font-medium'>Billing Email</label>
                    <input type="email" name='email' placeholder='Email Address' value={formValues.email}  onChange={handleChange} className=' border border-primaryGray rounded-[8px] p-2 w-full' required />
                    <p className=' mt-2 text-primary font-poppins text-[12px] md:text-[13px]'>{formErrors?.email}</p>

                  </div>
                </div>
                <p className=' flex items-center gap-1 mt-3'>
                  <img src={help} alt="" />
                  <p className=' font-poppins text-[10px] sm:text-[12px] md:text-[14px] text-neutral'>Order ID that we sent to your in your email address.</p>
                </p>
                <button onClick={handleSubmit} className=' font-poppins text-primaryWhite bg-primary text-center sm:px-6 sm:py-3 py-2 px-3 text-[10px] sm:text-[12px] md:text-[14px] flex items-center gap-2 my-10 md:my-12'>
                  <span>Track Order</span> 
                  <span><ArrowForwardIcon style={{fontSize: 16}} /></span>
                </button>

              </form>

            </div>
          </div>
      }
    </>
  )
}

export default TrackOrder