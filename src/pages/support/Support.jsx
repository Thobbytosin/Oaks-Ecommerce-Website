import React, { useEffect, useState } from 'react'
import styles from '../../styles'
import GoToTop from '../../components/GoToTop/GoToTop'
import { PageTag } from '../../components'
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GroupIcon from '@mui/icons-material/Group';
import LayersIcon from '@mui/icons-material/Layers';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import CircleIcon from '@mui/icons-material/Circle';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import EastIcon from '@mui/icons-material/East';
import SmsIcon from '@mui/icons-material/Sms';

const helpLinks = [
    {
        id: 'track-order',
        title: 'Track & Order',
        icon: <LocalShippingIcon style={{fontSize: 20}} />
    }, 

    {
        id: 'reset-password',
        title: 'Reset Password',
        icon: <LockOpenIcon style={{fontSize: 20}} />
    },

    {
        id: 'user-account',
        title: 'User Account',
        icon: <GroupIcon style={{fontSize: 20}} />
    }, 

    {
        id: 'wishlist',
        title: 'Wishlist',
        icon: <LayersIcon style={{fontSize: 20}} />
    },

    {
        id: 'cart',
        title: 'Shopping Cart & Wallet',
        icon: <CardGiftcardIcon style={{fontSize: 20}} />
    },

    {
        id: 'faqs',
        title: 'FAQs',
        icon: <LiveHelpIcon style={{fontSize: 20}} />
    }
]

const Support = () => {
    const [info, setInfo] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredProducts, setFilteredProucts] = useState();
    let [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    const getInfo = async () => {
        const q = collection(db, "faqs")
        const querySnapshot = await getDocs(q)
        const info = querySnapshot.docs.map((doc) => (
            doc.data()
          ))
          
          setInfo(info)
        }
        
        useEffect(() => {
          getInfo()
        }, [])

        // console.log(info)
        const detail = info.map((el) => el?.products)
        const allFaqs = detail.flat()
        const allTopics = allFaqs?.map((item) => item.title)
        topics = allTopics

        // console.log(topics)

        const handleSearch = (e) => {
            const keyword = e.target.value
            setSearchInput(keyword)

            const fileterd = allFaqs?.filter((question) => question?.title.toLowerCase().includes(keyword.toLowerCase()) )

            setFilteredProucts(fileterd)
        }

        // console.log(filteredProducts)

        useEffect(() => {
            document.body.addEventListener('click', () => {
                setSearchInput("")
            })
          
            return () => {
              document.body.removeEventListener('click', () => {
                setSearchInput("")
              })
            }
        })

        const searchQueryButtonHandler = ()=> {
            {searchInput && navigate(`/faqs/search/${searchInput}`) }
        }

        const searchQueryHandler = (e) => {
            if(e.key === 'Enter' && searchInput.length > 0) {
                navigate(`/faqs/search/${searchInput}`)
            } else if (e.key === 'Escape') {
                setSearchInput("")
            }
    
        }
    
  return (
    <div className={`${styles.newPageSection}`}>
        <GoToTop />
        <div className={styles.padding}>
            <PageTag prevPage="Home" curPage='Customer Support'  />

        </div>
        <div className={`${styles.padding} font-poppins w-[100%] md:w-full md:bg-opacity-100 bg-opacity-50 support-banner  min-h-[340px] flex flex-col justify-center relative`}>
            <p className=' text-[14px] text-center py-2.5 text-primaryBlack font-medium bg-gold w-[40%] sm:w-[20%] md:w-[10%]'>HELP CENTER</p>
            <h2 className=' font-semibold md:text-[32px] text-[28px] mt-4'>How can we help you!</h2>
            <form className='flex items-center px-4 py-2 bg-white w-[95%] sm:w-[60%] md:w-[740px] border border-primaryGray mt-8'>
                <div className=' text-primary mr-4'><SearchIcon className='' style={{fontSize: '20px'}} /></div>
                <input 
                    type="text" 
                    name='search' 
                    id='search' 
                    value={searchInput}
                    onChange={handleSearch}
                    onKeyUp={searchQueryHandler}
                    placeholder='Enter your question or keyword' className='w-full text-[12px] sm:text-[14px] md:text-[16px] bg-transparent text-primaryBlack font-poppins ' 
                />  
                <button onClick={searchQueryButtonHandler} className=' bg-primary text-primaryWhite   px-3 md:px-6 md:py-2.5 py-1.5 text-center md:text-[16px] sm:text-[14px] text-[12px]'>
                    SEARCH
                </button>
                
            </form>

            {searchInput && 
                <ul className=' flex flex-col gap-4 absolute top-[20%] sm:-bottom-[6rem] left-0 bg-dimWhite w-[60%] md:w-[40%]  font-poppins z-10'>
                    {filteredProducts?.map((item) => (
                        <li key={item.id} className=' p-4 cursor-pointer hover:bg-primaryWhite'>
                            <Link to={`/faqs/${item.title}`} >{item.title}?</Link>
                        </li>
                    ))}
                </ul>
            }

        </div>

        <div className={`${styles.marginY} pb-[5rem] border-b border-primaryGray`}>
            <h2 className=' text-center font-poppins text-[30px] md:text-[32px] font-semibold'>What can we assist you with today?</h2>
            <div className=' w-[70%] mx-auto flex justify-center items-center flex-wrap gap-4 mt-8'>
                {helpLinks.map((item) => (
                    <div 
                        onClick={() => navigate(`/${item.id}`)}
                        key={item.id} 
                        className='w-[260px] md:-[312px] h-[80px] border border-primary border-opacity-25 text-center flex justify-center items-center gap-3 cursor-pointer'
                    >
                        <span className=' block text-primary'>{item.icon}</span>
                        <p className=' block font-poppins text-[14px]'>{item.title}</p>

                    </div>
                ))}

            </div>
        </div>

        <div className=' font-poppins'>
            <h2 className=' text-center text-[24px] font-semibold '>Popular Topics</h2>
            <div className=' w-[100%] sm:w-[80%] mx-auto flex flex-wrap gap-4 mt-8 px-[3rem]'>
                {topics?.slice(6, 15).map((topic, index) => (
                    <div key={index + 1} className=' w-full md:w-[342px] flex items-center gap-3 hover:text-primary cursor-pointer'>
                        <span><CircleIcon style={{fontSize: 4}} /> </span>
                        <p className=' text-[12px]'>{topic}</p>
                    </div>
                ))}
            </div>
            
        </div>

        <div className={`${styles.paddingY} bg-[#F2F4F5] flex flex-col justify-center items-center mt-10 text-center md:py-0 p-8`}>
            <h2 className=' px-6 py-2 bg-primaryBlue text-primaryWhite text-center font-poppins text-[14px] md:w-[12%] sm:w-[20%] w-[40%] mx-auto'>CONTACT US</h2>
            <h1 className=' font-poppins font-semibold md:text-[28px] text-[22px] mt-8'>Don’t find your answer. <br />You can contact us.</h1>
            <div className=' flex sm:flex-row flex-col gap-[2rem] mt-10'>
                <div className=' bg-primaryWhite p-8 card-shadow'>
                    <div className=' flex items-start gap-4'>
                        <div className=' text-primaryBlue bg-[#EAF6FE] text-center p-3 '>
                            <RingVolumeIcon style={{fontSize: 26}} />
                        </div>
                        <div className=' text-left'>
                            <h3 className='text-left text-[12px] sm:text-[14px] md:text-[16px] font-poppins font-semibold mb-2'>Call us now</h3>
                            <p className='text-[8px] sm:text-[10px] md:text-[12px] font-poppins text-neutral max-w-[330px] text-left mb-3'>
                                We are available online from 9:00 AM to 5:00 PM (GMT95:45) Talk with use now.
                            </p>
                            <p className=' text-[12px] sm:text-[16px] md:text-[20px] font-poppins font-medium text-left mb-4'>
                                +123-456-7890
                            </p>
                            <button className=' bg-primaryBlue text-primaryWhite font-poppins font-medium text-center px-3 py-1 text-[10px] md:text-[12px]'>
                                <span className=' mr-2'>CALL NOW</span>
                                <EastIcon style={{fontSize: 15}} />
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className=' bg-primaryWhite p-8 card-shadow'>
                    <div className=' flex items-start gap-4'>
                        <div className=' text-lightGreen bg-[#EAF7E9] text-center p-3 '>
                            <SmsIcon style={{fontSize: 26}} />
                        </div>
                        <div className=' text-left'>
                            <h3 className='text-left text-[12px] sm:text-[14px] md:text-[16px] font-poppins font-semibold mb-2'>Chat with us</h3>
                            <p className=' text-[8px] sm:text-[10px] md:text-[12px] font-poppins text-neutral max-w-[330px] text-left mb-3 '>
                                We are available online from 9:00 AM to 5:00 PM (GMT95:45) Talk with use now.
                            </p>
                            <p className=' text-[12px] sm:text-[14px] md:text-[16px] font-poppins font-medium text-left mb-4'>
                                +123-456-7890
                            </p>
                            <button className=' bg-lightGreen text-primaryWhite font-poppins font-medium text-center px-3 py-1 text-[10px] md:text-[12px]'>
                                <span className=' mr-2'>CONTACT US</span>
                                <EastIcon style={{fontSize: 15}} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Support