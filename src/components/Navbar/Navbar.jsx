import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import styles from '../../styles'
import { navLinks, navLinksMobile, navLinksUnverified, topCategoriesLinks } from '../../constants'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from "react-toastify";
import { logOut, removeCart } from '../../features/cart/cartSlice';
import Spinner from '../Spinner/Spinner';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';
import { call, down } from '../../constants/images';
import SearchInput from '../SearchInput/SearchInput';
import SearchInputMobile from '../searchInputMobile/SearchInputMobile';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ReportIcon from '@mui/icons-material/Report';


const Navbar = () => {
    // const cartCounter = useSelector((state) => state.cart.cartCount)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const cartSlice = useSelector((state) => state.cart)
    
    const navigate = useNavigate()
    const { id} = useParams();

    const [active, setActive] = useState("home")
    const [toggleCart, setToggleCart] = useState(true);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [show, setShow] = useState("show")
    const [lastScrollY, setLastScrollY] = useState(0)
    const [mobileScroll, setMobileScroll] = useState(false)
    const [showDashboard, setShowDashboard] = useState(false)
    const [showCartlist, setShowCartlist] = useState(false)
    const [activeLink, setActiveLink] = useState("")
    const [showLogoutPop, setShowLogoutPop] = useState(false)




    const dispatch = useDispatch()

    const handleRemoveFromCart = (product) => {
        dispatch(removeCart(product))
    }

    // Check if user is register
    const {user, loading, logout, isUserLoggedIn} = useContext(AuthContext);
    // console.log(user)

    const handleLogout = () => {
        logout().then(() => {
            toast.error("Logged out Successfully", {
                position: "top-center",
                autoClose: 3000
            })
            navigate("/login")
            return location.reload()
              
        }).catch((error) => {
            console.log(error.message)
        })
    }

    const handleNavbar = () => {
        // console.log(lastScrollY)
        if(window.scrollY > 200) {
            if(window.scrollY > lastScrollY && !mobileScroll) {
                setShow("hide");
            } else {
                setShow("show");
            }
            setLastScrollY(window.scrollY)
        } else {
            setShow("top");
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleNavbar)

        return (() => {
            window.removeEventListener("scroll", handleNavbar);
        })
    }, [lastScrollY])
    

    const handleLink = (link) => {
        setActive(link.id)
        setToggleMenu(false)
    }

   

    const handleMobileMenu = () => {
        setToggleMenu(true)
        setMobileScroll(true)
    }

  

    const handleNavigateDashboard = () => {
        navigate('/dashboard')
        setActive("")
        setActiveLink("")
    }

    
  return (
    <nav className={`${show} w-full fixed z-20`}>
        {/* TOP BAR */}
        <div className={`${styles.padding}} account-div w-full bg-primaryBlack  text-center flex flex-col overflow-hidden sm:flex-row justify-evenly items-center py-3 `}>
            <p className=' text-primaryGray text-[9px] sm:text-[10px] md:text-[12px] font-poppins'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span className=' font-semibold text-primaryWhite cursor-pointer ml-2 md:ml-4 underline '><Link to="/shop">Shop Now</Link></span></p>
            
            {user?.emailVerified ?
                    <div className={`${styles.flexBetween} hidden sm:flex  text-primaryWhite font-poppins md:gap-8 sm:gap-4 `}>
                        
                        <button onClick={() => setShowLogoutPop(true)} className=' sm:bg-primary px-3 py-1 text-[12px] md:text-[14px]'>Log Out</button>
                    </div>  
                : 
                    <div className={`${styles.flexBetween} hidden sm:flex  text-primaryWhite font-poppins md:gap-8 sm:gap-4 `}>
                            
                    <button className=' sm:bg-primary px-3 py-1 text-[12px] md:text-[14px]'><Link to="/signup">Create Account</Link></button>
                    <button className=' hover:text-primary py-1'><Link className=' font-semibold text-[12px] md:text-[14px]' to="/login">Log in</Link></button>
            </div>  
            
            }
            {/* mobile */}
            {user?.emailVerified ?
                    <div className={`${styles.flexBetween} sm:hidden block  text-primaryWhite font-poppins md:gap-8 sm:gap-4 mt-4 mb-2`}>
                        
                        <button onClick={() => setShowLogoutPop(true)} className=' bg-primary px-3 py-1 text-[10px] '>Log Out</button>
                    </div>  
                : 
                    <div className={`${styles.flexBetween} sm:hidden flex text-primaryWhite font-poppins gap-4  my-1`}>
                        <button className=' bg-primary px-3 py-1 text-[10px]'><Link to="/signUp">Create Account</Link></button>
                        <button className=' hover:text-primary py-1'><Link className=' font-semibold text-[10px]' to="/signUp">Log in</Link></button>
                    </div>
            
            }

            
        </div>

        {/* END OF TOP BAR */}

        {/* NAVBAR */}
        <div className={`${styles.padding} ${styles.flexJustifyBetween} bg-dimWhite `}>
            <div>
                <p className=' font-inter text-primaryBlack font-bold text-[20px] sm:text-[24px] md:text-[28px]'><Link to='/'>Oaks</Link></p>
            </div>

            {/* LAPTOP */}
            <ul className='hidden md:flex text-[16px] font-poppins text-primaryBlack'>
                {user?.emailVerified && navLinks.map((link, index) => (
                    <li onClick={() => {
                        setActive(link.id)
                        setActiveLink("")
                        }} 
                        key={link.id} 
                        className={`${link.id === id  || link.id === active ? 'font-semibold text-primary' : ''} ${navLinks.length - 1 === index ? 'mr-0' : 'sm:mr-4 md:mr-6' } cursor-pointer uppercase text-[10px] md:text-[12px]`}><Link to={`${link.id === 'home' ? '/' : `/${link.id}`}`}>{link.title}</Link></li>
                ))}
                {!user?.emailVerified && navLinksUnverified.map((link, index) => (
                    <li onClick={() => {
                        setActive(link.id)
                        setActiveLink("")
                        }} 
                        key={link.id} 
                        className={`${link.id === id  || link.id === active ? 'font-semibold text-primary' : ''} ${navLinks.length - 1 === index ? 'mr-0' : 'sm:mr-4 md:mr-6' } cursor-pointer uppercase text-[10px] md:text-[12px]`}><Link to={`${link.id === 'home' ? '/' : `/${link.id}`}`}>{link.title}</Link></li>
                ))}
            </ul>

             {/* TABLET */}
            <ul className='hidden sm:flex md:hidden text-[16px] font-poppins text-primaryBlack'>
                {user?.emailVerified && navLinksMobile.map((link, index) => (
                    <li onClick={() => {
                        setActive(link.id)
                        setActiveLink("")
                        }} 
                        key={link.id} 
                        className={`${link.id === id  || link.id === active ? 'font-semibold text-primary' : ''} ${navLinksMobile.length - 1 === index ? 'mr-0' : 'sm:mr-4 md:mr-8' } cursor-pointer uppercase text-[10px] `}><Link to={`${link.id === 'home' ? '/' : `/${link.id}`}`}>{link.title}</Link></li>
                ))}
                {!user?.emailVerified && navLinksUnverified.map((link, index) => (
                    <li onClick={() => {
                        setActive(link.id)
                        setActiveLink("")
                        }} 
                        key={link.id} 
                        className={`${link.id === id  || link.id === active ? 'font-semibold text-primary' : ''} ${navLinksMobile.length - 1 === index ? 'mr-0' : 'sm:mr-4 md:mr-8' } cursor-pointer uppercase text-[10px]`}><Link to={`${link.id === 'home' ? '/' : `/${link.id}`}`}>{link.title}</Link></li>
                ))}
            </ul>

           

            <div className={`${styles.flexBetween} gap-3 py-2 md:py-0`}>
                
                <div className=' md:block sm:hidden'>
                    <SearchInput />

                </div>

                <div className={`${styles.flexBetween} gap-2 sm:gap-4 md:gap-3 relative`}>
                    {/* MOBILE ICON */}
                    <div 
                        onClick={() => {
                            navigate('/cart')
                            setActiveLink("")
                        }}
                        className=' relative sm:hidden block'>
                        <ShoppingCartOutlinedIcon style={{fontSize: '20px'}} />
                        { toggleCart && <span className='bg-primary text-white rounded-full sm:px-2 sm:py-0.5 px-2 py-[4px]  sm:text-[10px] text-[7px] absolute sm:-left-1 -left-2 sm:-top-2 -top-[4.2px]'>{cartItems.length}</span> }
                    </div>

                    <div onClick={handleMobileMenu} className=' block sm:hidden'>
                        <MenuRoundedIcon style={{fontSize: 18}} />
                    </div>


                    

                    <div 
                        onClick={() => {
                            navigate('/cart')
                            setActiveLink("")
                        }}
                        onMouseOver={() => user && setShowCartlist(true)}
                        className=' cursor-pointer relative hidden sm:block sm:ml-5'
                    >
                        <ShoppingCartOutlinedIcon  style={{fontSize: 20}} />
                        { toggleCart && <span className='bg-primary text-white rounded-full px-1.5 py-0.5 text-[8px] absolute -left-1 -top-1'>{cartItems.length}</span> }

                    </div>
                        {showCartlist && cartItems.length > 0 && 
                            <div onMouseLeave={() => {
                                setShowCartlist(false)
                                setShowDashboard(false)
                                }} 
                                className=' sm:block hidden absolute w-[360px] min-h-[200px] top-[60px] right-[0px] bg-dimWhite rounded-[6px] transition-none p-6'
                            >
                                <div className=' flex justify-between items-center'>
                                    <h2 className=' font-poppins font-semibold text-[12px] sm:text-[14px] md:text-[16px]'>Shopping Cart <span className=' font-normal'>({cartItems.length})</span></h2>
                                    <div onClick={() => setShowCartlist(false)} className=' cursor-pointer'>
                                        <DisabledByDefaultIcon style={{fontSize: 24, color: '#DB4444'}} />

                                    </div>
                                </div>
                                <div className=' mt-5 border-t border-primaryGray pt-3 pb-3'>
                                    {cartItems.map((cart) => (
                                        <div key={cart.id} className=' flex items-center mb-3 hover:bg-primaryWhite cursor-pointer'>
                                            <div className=' md:w-[50px] md:h-[50px] w-[35px] h-[35px] border border-primaryGray flex justify-center items-center mr-4'>
                                                <img src={cart.img || cart.img1} alt="" className='md:w-[30px] w-[20px]' />
                                            </div>
                                            <div className=' w-[220px] font-poppins'>
                                                <p className=' text-[10px] sm:text-[12px] font-medium mb-3 truncate max-w-[250px]'>{cart.name}</p>
                                                <p className=' text-[12px]'>{cart.cartQuantity} x <span className=' text-primaryBlue font-medium'>&#8358; {(cart.price).toLocaleString()}</span></p>
                                            </div>
                                            <p onClick={() => handleRemoveFromCart(cart)} className=' cursor-pointer text-[14px] md:text-[18px] text-primary font-semibold'>X</p>
                                        </div>
                                    ))}
                                    <div>
                                    <div className=' w-full flex justify-center'>
                                        <button onClick={() => navigate('/cart')} className=' border bg-primary text-primaryWhite w-[50%]  text-center text-[12px] font-poppins font-medium py-2 mt-4'>
                                            VIEW CART
                                        </button>
                                        
                                    </div>

                                    </div>
                                </div>
                                
                            </div>
                        }

                    <div onMouseEnter={() => user && setShowDashboard(true)}  className={`cursor-pointer relative block ml-[1.1rem]`}>
                        
                        {/* when user is logged in/out */}
                       {isUserLoggedIn 
                            ?  loading ? <ButtonSpinner color="primaryBlack" /> : <div className=' relative flex gap-2'>
                                    {user.emailVerified 
                                        ?  <div className=' h-[20px] w-[20px] sm:h-[25px] sm:w-[25px] md:h-[30px] md:w-[30px] rounded-full bg-slate-200 text-primary overflow-hidden flex justify-center items-center'>
                                                {user.photoURL ? <img src={user?.photoURL} alt="" className=' object-cover w-full' /> : <AccountCircleIcon  style={{fontSize: 18}} />}
                                            </div>
                                        :   <div className=' h-[20px] w-[20px] sm:h-[25px] sm:w-[25px] md:h-[30px] md:w-[30px] rounded-full bg-slate-200 text-primaryBlack overflow-hidden'>
                                                {user.photoURL ? <img src={user?.photoURL} alt="" className=' object-cover w-full' /> : <AccountCircleIcon  style={{fontSize: '30px'}} />}
                                            </div>
                                    }
                                    {user.emailVerified &&
                                        <div className=' absolute bg-lightGreen rounded-full w-[8px] h-[8px] md:w-[12px] md:h-[12px] sm:h-[10px] sm:w-[10px] sm:left-[20px] left-[15px] -top-[2px] slider-direction ' />
                                    }
                                    
                                    {user.emailVerified && 
                                        <div>
                                            <Link to={'/dashboard'}>
                                                <p className=' font-poppins font-medium text-[10px] sm:text-[8px] md:text-[10px] '>
                                                Welcome, {user?.displayName}
                                                </p>
                                                <p className=' font-poppins text-[6px] sm:text-[6px] md:text-[8px] italic text-darkGray'>Signed in</p>

                                            </Link>
                                        </div>
                                    }
                                </div> 
                            :   <div className=' h-[30px] w-[30px] rounded-full bg-transparent text-primaryBlack'>
                                    <AccountCircleIcon  style={{fontSize: '30px'}} />
                                </div> 
                        }

                        {/* {showDashboard &&
                            <div onMouseLeave={() => {
                                setShowDashboard(false)
                                setShowCartlist(false)
                                }} 
                                className=' absolute w-[200px] top-[58px] -right-[30px] rounded-[6px] bg-primaryWhite transition-none'>
                                <p className='py-3 pl-2 text-[14px] md:text-[16px] font-poppins font-medium transition-none hover:bg-primary hover:text-primaryWhite flex border-b border-primaryGray'>
                                    <span className=' w-[35px]'><PersonOutlineOutlinedIcon /></span>
                                    <span onClick={handleNavigateDashboard}>Dashboard</span>
                                </p>
                                <p onClick={handleLogout} className='py-3 pl-2 text-[14px] md:text-[16px] font-poppins font-medium transition-none hover:bg-primary hover:text-primaryWhite flex border-b border-primaryGray'>
                                    <span className=' w-[35px]'><LoginOutlinedIcon /></span>
                                    <span>Log out</span>
                                </p>
                            </div>
                        } */}
                        
                    </div>

                    
                </div>

                
            </div>
        </div>
        {/* END OF NAVBAR */}

        {/* CATEGORIES BAR */}
        <div className={`w-full bg-[#E4E7E9] flex justify-between items-center font-inter text-[8px] md:text-[10px] ${styles.paddingX} py-2`}>
            <div className=' flex md:gap-6 gap-3'>
                <div className='hidden sm:flex gap-2 items-center font-semibold bg-[#F2F4F5] px-4 py-2 cursor-pointer'>
                    <p>All Category</p>
                    <img src={down} alt="" className=' w-[10px] sm:w-[20px]' />
                </div>
                {topCategoriesLinks.map((el) => (
                    <div onClick={() => {
                        navigate(`/${el.id}`)
                        setActiveLink(el.id)
                        setActive("")
                        }} 
                        key={el.id} className={`flex items-center gap-2 cursor-pointer ${activeLink === el.id && 'text-primaryBlue font-medium'} hover:text-primaryBlue`}>
                        <img src={el.icon} alt="" className=' w-[12px] sm:w-[20px]' />
                        <p>{el.tag}</p>
                    </div>
                ))}

            </div>
            <div className='hidden sm:flex items-center gap-2'>
                <img src={call} alt="" className=' w-[20px]' />
                <p className=' text-[10px]'>+1-234-567-890</p>

            </div>
        </div>
        {/* END OF CATEGORIES BAR */}

        {/* MOBILE NAVMENU */}
        {toggleMenu 
            ? <div onClick={() => setToggleMenu(false)} className={`md:hidden block fixed top-0 left-0 h-full w-full translate-x-0 bg-black z-20 opacity-40`} /> 
            : <div onClick={() => setToggleMenu(false)} className={`md:hidden block fixed top-0 left-0 h-full w-full -translate-x-[100%] bg-black z-20 opacity-40`} /> 
        }

        {toggleMenu 
            ? <ul className={`md:hidden flex flex-col  bg-white w-[80%] translate-x-0 fixed top-[20%] z-30`}>
                    {user?.emailVerified && navLinksMobile.map((link, index) => (
                        <li onClick={() => {
                             handleLink(link)
                             navigate(`${link.id === 'home' ? '/' : link.id}`)
                            }} key={link.id} className={` w-full ${link.id === active ? 'font-semibold text-primary' : ''} ${navLinks.length - 1 === index ? 'mr-0' : 'mb-0' } px-6 py-4  border-slate-400 border-b hover:bg-primary cursor-pointer`}>{link.title}</li>
                    ))}
                    {!user?.emailVerified && navLinksUnverified.map((link, index) => (
                        <li onClick={() => {
                            handleLink(link)
                            navigate(`${link.id === 'home' ? '/' : link.id}`)
                            }} key={link.id} className={` w-full ${link.id === active ? 'font-semibold text-primary' : ''} ${navLinks.length - 1 === index ? 'mr-0' : 'mb-0' } px-6 py-4  border-slate-400 border-b hover:bg-primary cursor-pointer`}>{link.title}</li>
                    ))}
                
                </ul>
            : <ul className={`md:hidden flex flex-col px-6 py-4 bg-white w-[50%] -translate-x-[100%] fixed top-18 z-30`}>
                    {user?.emailVerified && navLinksMobile.map((link, index) => (
                        <li onClick={() => handleLink(link)} key={link.id} className={`${link.id === active ? 'font-semibold text-primary' : ''} ${navLinks.length - 1 === index ? 'mr-0' : 'mb-4' } cursor-pointer`}><Link to={`${link.id === 'home' ? '/' : link.id}`}>{link.title}</Link></li>
                    ))}
                    {!user?.emailVerified && navLinksUnverified.map((link, index) => (
                        <li onClick={() => handleLink(link)} key={link.id} className={`${link.id === active ? 'font-semibold text-primary' : ''} ${navLinks.length - 1 === index ? 'mr-0' : 'mb-4' } cursor-pointer`}><Link to={`${link.id === 'home' ? '/' : link.id}`}>{link.title}</Link></li>
                    ))}
                </ul>
        }

        <SearchInputMobile />

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

    </nav>
  )
}

export default Navbar