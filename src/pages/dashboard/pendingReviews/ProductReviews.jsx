import { arrayUnion, doc, getDoc,updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../../firebase/firebase.config';
import { AuthContext } from '../../../context/AuthProvider';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Ratings, Spinner } from '../../../components';
import { toast } from "react-toastify";
import GoToTop from '../../../components/GoToTop/GoToTop';
// import { data } from 'autoprefixer';

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
      id: 2,
      name: "2 Star Rating",
      icon: <Ratings color="#FFAD33" ratings={2} />
  },
  {
      id: 1,
      name: "1 Star Rating",
      icon: <Ratings color="#FFAD33" ratings={1} />
  },
]

// when i review, I reduces the length of array by 1 completedOrders and change the hasNotReviewed to false

const ProductReviews = () => {
  const [info, setInfo] = useState([]);
  const {user} = useContext(AuthContext)
  let [allCarts, setAllCarts] = useState([])
  const [showReviewPopup, setShowReviewPopup] = useState(false)
  const [rating, setRating] = useState(5)
  const [dropdown, setDropdown] = useState(false)
  const [message, setMessage] = useState("")
  const [curProduct, setCurProduct] = useState(null)
  let [updatedAllCarts, setUpdatedAllCarts] = useState([])

  const getInfo = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data()
    
    setInfo(data)
  }

  useEffect( () => {
      getInfo()
  }, [info])

  // console.log(info)
  allCarts = info?.allOrdersDelivered
  // console.log(allCarts)



  const handlePopup = (item) => {
    setCurProduct(item.id)
    setShowReviewPopup(true)
    
  }

  const handleDropDown = () => {
      setDropdown(true)
  }

  const handleToggleRatings = (id) => {
      setRating(id)
      setDropdown(false)
  }







  const handlePublishReview = async (item) => {
      // e.preventDefault()
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

          
          let date = new Date()
          const day = date.getDate().toString().padStart(2, '0');
          const month = months[date.getMonth()]
          const year = date.getFullYear()
          const time = date.toLocaleTimeString()

          

      const data = {
          profile: user?.photoURL,
          name: user?.displayName,
          date: `${day} ${month}, ${year}`,
          ratings: rating,
          comment: message,
          userId: user.uid
          
      }

      const updateReviewArray = doc(db, "all", item?.id);
      // console.log(updateReviewArray)

      try {
          await updateDoc(updateReviewArray, {
              "reviews": arrayUnion(data),
          })
          console.log('Success!')
          toast.success(`Thanks for your feedback ${user.displayName}`, {
              position: "top-center"
          })
          
      } catch (error) {
          console.log(error.message)
      }

  }

  const handleSubmit = async (item) => {
      
      handlePublishReview(item)

      setShowReviewPopup(false)
    
      const updated = allCarts?.filter((el) => el?.id !== item?.id)
      
      try {
        await updateDoc(doc(db, 'users', user?.uid), {
          allOrdersDelivered: updated
        })
        allCarts = updated
        console.log('Review Submitted')
      } catch (error) {
        console.log(error.message)
      }
  }
  

  return (
    <div className='w-full sm:w-[75%] font-poppins '>
      <GoToTop />
      {info?.length !== 0 
        ?
          <div>

            <h2 className=' font-semibold text-[18px] md:text-[25px] '>{`Pending Reviews ${allCarts?.length >= 1 ? `(${allCarts?.length})` : '' }`}</h2>

            <div>
              {allCarts?.length >= 1 
              
              ? 
                allCarts?.map((item, i) => (
                  <div key={i + 1} className={`my-4  gap-4 border border-primaryGray p-6 flex justify-between items-start`}>
                    <div className=' flex gap-6'>
                      <div>
                        <img src={item?.img || item?.image || item?.imageProfile} alt="" className=' w-[80px]' />
                      </div>

                      <div>
                        <h2 className=' text-[14px] md:text-[16px] font-medium mb-4 max-w-[480px]'>{item?.name}</h2>
                        <p className=' text-[14px] '>Order Id: <span className=' uppercase'>{item?.orderId}</span></p>
                        <p className=' text-[12px] text-primaryBlue font-medium '>Delivered on {item?.date}</p>
                      </div>

                    </div>
                    <p onClick={() => handlePopup(item)} className={`text-primary font-medium cursor-pointer`}><span><AddIcon /></span> Leave a Rating</p>

                    

                    {showReviewPopup && curProduct === item?.id && <div onClick={() => setShowReviewPopup(false)} className=' fixed top-0 left-0 w-[100vw] min-h-screen bg-black bg-opacity-40 z-30 cursor-pointer transit-left' />}

                    {user?.emailVerified && showReviewPopup && curProduct === item?.id
                      &&
                        <div className=' min-w-[492px] min-h-[440px] bg-primaryWhite rounded-[6px] z-40 fixed top-[25%] left-[35%] p-8 transit-left'>
                            <h2 className=' font-poppins font-semibold text-primaryBlack text-[20px] pb-4 mb-3 border-b border-primaryGray'>Send Us a Feedback</h2>
                            <div className=' mt-4 relative'>
                                    <p className=' font-poppins text-[13px] md:text-[15px] font-medium'>Rating</p>
                                    <div onClick={handleDropDown} className=' w-full min-h-[30px] border border-primaryGray rounded-[3px] mt-2 p-2 bg-dimWhite cursor-pointer flex justify-between'>
                                        {ratings.filter((item) => {
                                            return item.id === rating
                                        }).map((rate) => (
                                            <p key={rate.id} className=' flex items-end gap-4'>
                                                <span>{rate.icon}</span>
                                                <span className=' font-poppins text-[14px]'>{rate.name}</span>
                                            </p>
                                            
                                        ))}

                                        <KeyboardArrowDownIcon />

                                    </div>

                                    { dropdown && <div className=' absolute -bottom-[13rem] left-0 w-full bg-slate-100'>
                                        {ratings.map((item) => (
                                            <div onClick={() => handleToggleRatings(item.id)} key={item.id} className={` flex items-center gap-4 p-2 cursor-pointer ${item.id === rating ? 'bg-primaryBlack text-primaryWhite' : 'hover:bg-gray-200 hover:text-primaryBlack' }`}>
                                                {item.icon}
                                                <p  className=' font-poppins text-[14px]'>{item.name}</p>
                                            </div>
                                        ))}

                                    </div>}

                            </div>

                            <div className=' mt-4'>
                                <div >
                                    <p className=' font-poppins text-[13px] md:text-[15px] font-medium'>Feedback</p>
                                    <textarea name="feedback" id="feedback"  placeholder='Write down your feedback about our product & services' value={message} onChange={(e) => setMessage(e.target.value)} className=' w-full min-h-[130px] bg-dimWhite p-2 font-poppins text-[14px]'></textarea>
                                    
                                    <button type='submit' onClick={() => curProduct === item?.id &&  handleSubmit(item)}  className=' mt-5 w-full text-primaryWhite bg-primary py-3 font-poppins font-medium rounded-[6px] cursor-pointer'>
                                        Publish Review
                                    </button>
                                </div>
                                {/* <input type="text" className=' h-[100px] w-full bg-dimWhite pl-4' placeholder='Write down your feedback about our product & services' /> */}
                            </div>

                        </div>
                
                }
                  </div>
                  
                ))

              :
                <h2 className=' mt-8 text-[14px] md:text-[18px]'>You have no pending reviews.</h2>
              
              }
                
            </div>
          </div>
        : <div className='h-[50vh] flex justify-center items-center'><Spinner /></div>
      
      }
      


    </div>     

  )
}

export default ProductReviews