/* eslint-disable no-unsafe-optional-chaining */
import React, { useContext, useEffect, useState } from 'react'
import styles from '../../styles'
import { db } from '../../firebase/firebase.config'
import { AuthContext } from '../../context/AuthProvider'
import GoToTop from '../../components/GoToTop/GoToTop'
import { PageTag, Ratings } from '../../components'
import LayersIcon from '@mui/icons-material/Layers';
import RedeemIcon from '@mui/icons-material/Redeem';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { noprofile } from '../../constants/images'
import Overview from './overview/Overview'
import History from './orderHistory/History'
import { useNavigate } from 'react-router-dom'
import ProductReviews from './pendingReviews/ProductReviews'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Settings from './settings/Settings'
import ReportIcon from '@mui/icons-material/Report';
import { toast } from 'react-toastify'

const sidebarLinks = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <LayersIcon style={{fontSize: 18}} />
  },

  {
    id: 'order-history',
    title: 'Order History',
    icon: <RedeemIcon  style={{fontSize: 18}} />
  },

  {
    id: 'track-order',
    title: 'Track Order',
    icon: <LocationOnIcon  style={{fontSize: 18}} />
  },

  {
    id: 'product-reviews',
    title: 'Product Reviews',
    icon: <LayersIcon  style={{fontSize: 18}} />
  },

  {
    id: 'wishlist',
    title: 'Wishlist',
    icon: <FavoriteIcon  style={{fontSize: 18}} />
  },

  {
    id: 'settings',
    title: 'Settings',
    icon: <SettingsIcon  style={{fontSize: 18}} />
  },

  {
    id: 'logout',
    title: 'Logout',
    icon: <LoginOutlinedIcon  style={{fontSize: 18}} />
  }
]

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


const Dashboard = () => {
  // let history = unstable_HistoryRouter()
  // console.log(history)
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState(noprofile)
  const [active, setActive] = useState('dashboard')
  const [info, setInfo] = useState([])
  const [orderDetails, setOrderDetails] = useState(false)
  let [completedOrders, setCompletedOrders] = useState([])
  let [allCarts, setAllCarts] = useState([])
  const navigate = useNavigate()
  const [showLogoutPop, setShowLogoutPop] = useState(false)
  
  

  const {user, logout} = useContext(AuthContext)


  const getInfo = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data()
    
    setInfo(data)
    
  }
  
  useEffect( () => {
    getInfo()
  }, [])
  

  // console.log(info)
  const completed = info?.orders?.filter((order) => {
    return order?.orderDelivered})
  
  // console.log(completed)
  completedOrders = completed


  const updateCompletedOrders = async () => {
    const updatUser =  doc(db, "users", user?.uid);
    
    try {
        await updateDoc(updatUser, {
            completedOrders: completedOrders
        
          });
        
        
        } catch (error) {
            // console.log(error.message)
      }
  }

  useEffect(() => {
    updateCompletedOrders()
  }, [completedOrders])

  const handleLogout = () => {
    logout().then(() => {
      toast.error("Logged out Successfully", {
        position: 'top-center',
        autoClose: 3000
      })
      navigate("/login")
      return location.reload()
    }).catch((error) => {
      // console.log(error.message)
    })
  }

  return (
    <div className={`${styles.newPageSectionProducts} ${styles.padding} mb-[4.4rem]`}>
      <GoToTop />
      {active === 'dashboard' && <PageTag prevPage="Home" next='User Account' curPage='Dashboard' />}
      {active === 'order-history' && !orderDetails && <PageTag prevPage="Home" next='User Account' curPage='Dashboard' subPage='Order History' />}
      {active === 'order-history' && orderDetails && <PageTag prevPage="Home" next='User Account' curPage='Dashboard' subPage='Order History' lastPage='Order Details' />}
      {active === 'product-reviews'  && <PageTag prevPage="Home" next='User Account' curPage='Dashboard' subPage='Product Reviews'  />}
      {active === 'settings' && <PageTag prevPage="Home" next='User Account' curPage='Dashboard' subPage='Settings' />}
      
      <div className=' flex sm:flex-row flex-col items-start md:gap-[2.8rem] sm:gap-[1.4rem]'>
          <div className=' sm:w-[25%] w-full bg-primaryWhite card-shadow2 flex justify-between sm:flex-col flex-row sm:mt-0 mt-[0.4rem] mb-[2.4rem]'>
            {sidebarLinks.map((item) => (
              <div 
                onClick={() => {
                  setActive(item.id)
                  item.id === 'order-history' && setOrderDetails(false)
                  item.id === 'logout' && setShowLogoutPop(true)
                }} 
                key={item.id} 
                className={`relative font-poppins p-2 sm:p-4 flex sm:gap-2 items-center cursor-pointer text-[10px] sm:text-[12px] md:text-[14px]  ${active === item.id ? 'text-primaryWhite bg-primary' : 'text-[#5F6C72] hover:bg-primaryGray'}`}>
                <span>{item.icon}</span>
                <span className=' sm:inline-block hidden'>{item.title}</span>
                {item.id === 'product-reviews' && info?.allOrdersDelivered?.length >= 1 &&
                <span className={`${active === 'product-reviews' ? 'bg-primaryWhite text-primaryBlack' : 'bg-primary text-primaryWhite'} absolute right-[20px] top-[10px] w-6 h-6 rounded-full  font-poppins text-[12px] flex justify-center items-center text-center`}>{info?.allOrdersDelivered?.length}</span>}
              </div>
            ))}
          </div>

            {/* DASHBOARD OVERVIEW */}
            {active === 'dashboard' && <Overview />}

            {/* ORDER HISTORY */}
            {active === 'order-history' && <History /> }

            {/* TRACK ORDER */}
            {active === 'track-order' && navigate('/track-order') }

            {/* PENDING REVIEWS */}
            {active === 'product-reviews' && <ProductReviews />}

            {/* WISHLIST */}
            {active === 'wishlist' && navigate('/wishlist') }

            {/* SETTINGD */}
            {active === 'settings' && <Settings /> }

            {/* SETTINGD */}
            {active === 'logout' && 
              <div>
                {showLogoutPop
                    && <div onClick={() => setShowLogoutPop(false)} className=' fixed top-0 left-0 w-[100vw] min-h-screen bg-black bg-opacity-40 z-30 cursor-pointer transit-left' />
                    
                }
        
                {showLogoutPop
                    && 
                    <div className='fixed top-[30%] left-[10%] md:mx-auto w-[80%] h-[40%] flex flex-col justify-center items-center bg-primaryWhite px-5 md:px-0 z-40'>
                      <div className=' flex items-center sm:gap-3'>
                        <div className=' sm:block hidden'>
                          <ReportIcon style={{fontSize: 46, color: '#DB4444'}} />
                        </div>
                        <div className=' block sm:hidden'>
                          <ReportIcon style={{fontSize: 30, color: '#DB4444'}} />
                        </div>
                          <h2 className=' text-center font-poppins font-medium text-[16px] sm:text-[20px] md:text-[24px]'>Are you sure you want to logout?</h2>
                      </div>
                      <div className=' flex gap-3 mt-5'>
                        <button onClick={() => setShowLogoutPop(false)} className=' text-primaryBlack border-2 border-primaryBlack bg-transparent px-6 py-2 text-center font-poppins font-medium sm:text-[16px] text-[12px]'>Cancel</button>
                        <button onClick={handleLogout} className=' text-primaryWhite bg-primary px-6 py-2 text-center font-poppins sm:text-[16px] text-[12px]'>Proceed</button>
                      </div>
        
                    </div>
                    
                }
      
              </div>
            }

            
          
      </div>
    </div>
  )
}

export default Dashboard



