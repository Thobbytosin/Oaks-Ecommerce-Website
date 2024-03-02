import React, { useCallback, useEffect, useRef, useState } from 'react'
import { banner, bannerMobile, bannerTablet } from '../../../constants/index'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
    const navigate = useNavigate()
    const timerRef = useRef(null);
    const timerRef2 = useRef(null);
    const timerRef3 = useRef(null);
    // console.log(timerRef)

    // console.log(import.meta.env.VITE_APP)

    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentSlidTablet, setCurrentSlidTablet] = useState(8);
    const [currentSlidMobile, setCurrentSlidMobile] = useState(4);
    const [activeUser, setActiveUser] = useState(0)
    const [activeUserMobile, setActiveUserMobile] = useState(4)
    const [activeUserTablet, setActiveUserTablet] = useState(8)
    const [laptopMode, setLatopMode] = useState("block")

    const nextSlide = useCallback(() => {
        setCurrentSlide(currentSlide === 3 ? 0 : currentSlide + 1  )
        setCurrentSlidTablet(currentSlidTablet === 11 ? 8 : currentSlidTablet + 1  )
        setCurrentSlidMobile(currentSlidMobile === 7 ? 4 : currentSlidMobile + 1  )
        setActiveUser(activeUser === 3 ? 0 : activeUser + 1)
        setActiveUserTablet(activeUserTablet === 11 ? 8 : activeUserTablet + 1)
        setActiveUserMobile(activeUserMobile === 7 ? 4 : activeUserMobile + 1)
    }, [currentSlide, activeUser]);

    const nextSlideTablet = useCallback(() => {
        setCurrentSlidTablet(currentSlidTablet === 11 ? 8 : currentSlidTablet + 1  )
        setActiveUserTablet(activeUserTablet === 11 ? 8 : activeUserTablet + 1)
    }, [currentSlidTablet, activeUserTablet]);

    const nextSlideMobile = useCallback(() => {
        setCurrentSlidMobile(currentSlidMobile === 7 ? 4 : currentSlidMobile + 1  )
        setActiveUserMobile(activeUserMobile === 7 ? 4 : activeUserMobile + 1)
    }, [currentSlidMobile, activeUserMobile]);



    

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? 3 : currentSlide - 1)
        setCurrentSlidTablet(currentSlidTablet === 8 ? 11 : currentSlidTablet - 1)
        setCurrentSlidMobile(currentSlidMobile === 4 ? 7 : currentSlidMobile - 1)
    }

    const goToSlide = (index) => {
        setActiveUser(index)
        setActiveUserTablet(index)
        setActiveUserMobile(index)
        setCurrentSlide(index)
        setCurrentSlidTablet(index)
        setCurrentSlidMobile(index)
    }


    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            nextSlide()
            // nextSlideTablet()
        }, 3000)

    }, [nextSlide])

    // useEffect(() => {
    //     if (timerRef2.current) {
    //         clearTimeout(timerRef2.current)
    //     }

    //     timerRef2.current = setTimeout(() => {
    //         nextSlideTablet()
    //         // nextSlideTablet()
    //     }, 3000)

    // }, [nextSlideTablet])

    // useEffect(() => {
    //     if (timerRef3.current) {
    //         clearTimeout(timerRef3.current)
    //     }

    //     timerRef3.current = setTimeout(() => {
    //         nextSlideMobile()
    //         // nextSlideTablet()
    //     }, 3000)

    // }, [nextSlideMobile])



    
  return (
    <div id='hero' className={` w-[100%]  overflow-hidden`}>
        {/* SLIDER */}
        <div className=' relative '>
            {/* SLIDE ARROW KEYS (DESKTOP) */}
            
                <div onClick={prevSlide} className=' absolute left-5 top-[65%] bg-primary  rounded-full h-[25px] w-[25px] sm:w-[30px] sm:h-[30px] md:h-[35px] md:w-[35px] flex justify-center items-center  text-white cursor-pointer slider-direction z-10'><NavigateBeforeIcon style={{fontSize: 20}} /></div>
                <div onClick={nextSlide} className=' absolute right-5 top-[65%] flex justify-center items-center bg-primary rounded-full h-[25px] w-[25px] sm:w-[30px] sm:h-[30px] md:h-[35px] md:w-[35px] text-white cursor-pointer slider-direction z-10'><NavigateNextIcon style={{fontSize: 20}} /></div>
            
                        
            {/* SLIDE (DESKTOP) */}
            
            <div className={`w-[400%] h-[640px] flex`}
                style={{
                    transform: `translateX(-${currentSlide * 25}%)`
                }}
            >   
                    {banner.map((item, i) => (
                        <div key={item.id} className={`hidden md:block w-[100%] h-full relative banner${currentSlide}`}>
                            {item.id === 'img0' && 
                                <div className={`absolute top-[50%] right-[5%] text-primaryBlack z-40`}>
                                    <h2 className=' font-poppins font-semibold text-[40px] max-w-[700px]'>Listen to the <span className=' text-primaryBlue'>amazing</span> music sound.</h2>
                                    <p className=' font-poppins text-[16px] mt-2'>Experience music like never before.</p>
                                    <button onClick={() => navigate('/shop')} className=' font-poppins px-6 py-2 text-primaryWhite bg-primaryBlue rounded-lg text-center mt-4 text-[12px]'>
                                        Shop Now
                                    </button>
                                </div>
                            }
                            {item.id === 'img1' && 
                                <div className={`absolute top-[50%] left-[15%] text-primaryBlack z-40`}>
                                    <h2 className=' font-poppins font-semibold text-[40px] max-w-[600px]'>Up to 20% OFF Voucher</h2>
                                    <p className=' font-poppins text-[16px] mt-2'>It’s more affordable than ever to shop on Oaks!</p>
                                    <button onClick={() => navigate('/shop')} className=' font-poppins p-2 border-b-2 border-primaryBlack text-primaryBlack rounded-lg text-center mt-4 font-semibold uppercase text-[12px]'>
                                        Hurry Now 
                                        <span className=' ml-2'><ArrowRightAltIcon /> </span>
                                    </button>
                                </div>
                            }
                            {item.id === 'img2' && 
                                <div className={`absolute top-[45%] right-[1%] text-primaryWhite z-40`}>
                                    <h2 className='text-gradient font-poppins font-medium text-[40px] max-w-[650px] leading-[4.8rem]'>Elegance and Precision. Discover our new collections.</h2>
                                    <p className=' font-poppins text-[16px] mt-2 text-gradient max-w-[500px]'>Watch as unique as the person who wears it. Explore our timeless dazzling watches.</p>
                                    <button onClick={() => navigate('/shop')} className=' font-poppins py-2 px-6 bg-primaryWhite text-primaryBlack rounded-lg text-center mt-4 font-semibold uppercase text-[12px]'>
                                        Explore
                                        <span className=' ml-2'><ArrowRightAltIcon /> </span>
                                    </button>
                                </div>
                            }
                            {item.id === 'img3' && 
                                <div className={`absolute top-[40%] right-[3%] text-primaryBlack z-40`}>
                                    <h2 className=' font-poppins font-semibold text-[40px] max-w-[600px]'>Limited edition <span className=' text-primary'>sneakers</span> just for you.</h2>
                                    <p className=' font-poppins text-[16px] mt-2'>Find your style! Our reputation shines as brightly as our shoes.</p>
                                    <button onClick={() => navigate('/shop')} className=' font-poppins py-2 px-6 bg-primary text-primaryWhite rounded-lg text-center mt-4  uppercase text-[12px]'>
                                        Buy Now
                                        <span className=' ml-2'><ArrowRightAltIcon /> </span>
                                    </button>
                                </div>
                            }
                        </div>
                    ))}

                    {/* SLIDER Tablet */}
                    {bannerTablet.map((item, i) => (
                        <div  key={item.id} className={`md:hidden sm:block hidden w-[100%] h-full  relative banner${currentSlidTablet}`}>
                            {currentSlidTablet === 8 && 
                                <div className={`absolute top-[48%] right-[5%] text-primaryBlack z-40`}>
                                    <h2 className=' font-poppins font-semibold text-[35px] max-w-[400px]'>Listen to the <span className=' text-primaryBlue'>amazing</span> music sound.</h2>
                                    <p className=' font-poppins text-[14px] mt-2'>Experience music like never before.</p>
                                    <button onClick={() => navigate('/shop')} className=' font-poppins px-4 py-2 text-primaryWhite bg-primaryBlue rounded-lg text-center mt-4 text-[10px]'>
                                        Shop Now
                                    </button>
                                </div>
                            }

                            {currentSlidTablet === 9 && 
                                <div className={`absolute top-[50%] left-[10%] text-primaryBlack z-40`}>
                                    <h2 className=' font-poppins font-semibold text-[35px] max-w-[400px]'>Up to 20% OFF Voucher</h2>
                                    <p className=' font-poppins text-[14px] mt-2 max-w-[300px]'>It’s more affordable than ever to shop on Oaks!</p>
                                    <button onClick={() => navigate('/shop')} className=' font-poppins p-2 border-b-2 border-primaryBlack text-primaryBlack rounded-lg text-center mt-4 text-[10px] font-semibold uppercase'>
                                        Hurry Now 
                                        <span className=' ml-2'><ArrowRightAltIcon /> </span>
                                    </button>
                                </div>
                            }

                            {currentSlidTablet === 10 && 
                                <div className={`absolute top-[45%] left-[8%] text-primaryWhite z-40`}>
                                    <h2 className='text-gradient font-poppins font-medium text-[35px] max-w-[400px] leading-[2.8rem]'>Elegance and Precision. Discover new collections.</h2>
                                    <p className=' font-poppins text-[14px] mt-2 text-gradient max-w-[300px]'>Watch as unique as the person who wears it. Explore our timeless dazzling watches.</p>
                                    <button onClick={() => navigate('/shop')} className=' font-poppins py-2 px-4 bg-primaryWhite text-primaryBlack rounded-lg text-center mt-4 text-[10px] font-semibold uppercase'>
                                        Explore
                                        <span className=' ml-2'><ArrowRightAltIcon /> </span>
                                    </button>
                                </div>
                            }

                            {currentSlidTablet === 11 && 
                                <div className={`absolute top-[40%] right-[5%] text-primaryBlack z-40`}>
                                    <h2 className=' font-poppins font-semibold text-[35px] max-w-[400px]'>Limited edition <span className=' text-primary'>sneakers</span> just for you.</h2>
                                    <p className=' font-poppins text-[14px] mt-2 max-w-[400px]'>Find your style! Our reputation shines as brightly as our shoes.</p>
                                    <button onClick={() => navigate('/shop')} className=' font-poppins py-2 px-4 text-[10px] bg-primary text-primaryWhite rounded-lg text-center mt-4  uppercase'>
                                        Buy Now
                                        <span className=' ml-2'><ArrowRightAltIcon /> </span>
                                    </button>
                                </div>
                            }
                        </div>
                    ))}

                    {/* SLIDER MOBILE */}
                    {bannerMobile.map((item, i) => (
                        <div key={item.id} className={`sm:hidden block w-[100%] h-full relative banner${currentSlidMobile}`}>
                            {currentSlidMobile === 4 && 
                                <div className={`absolute top-[40%] left-[2%] text-primaryBlack z-40 flex flex-col items-center`}>
                                    <h2 className=' font-poppins font-semibold text-[25px] max-w-[350px] text-center'>Listen to the <span className=' text-primaryBlue'>amazing</span> music sound.</h2>
                                    <p className=' font-poppins text-[12px] mt-2 text-center'>Experience music like never before.</p>
                                    <button onClick={() => navigate('/shop')} className=' font-poppins py-1 px-3 text-primaryWhite bg-primaryBlue rounded-lg text-center mt-3 text-[12px]'>
                                        Shop Now
                                    </button>
                                </div>
                            }

                            {currentSlidMobile === 5 && 
                                <div className={`absolute top-[40%] left-[11%] text-primaryBlack z-40 flex flex-col items-center`}>
                                    <h2 className=' font-poppins font-semibold text-[25px] max-w-[350px] text-center'>Up to 20% OFF Voucher</h2>
                                    <p className=' font-poppins text-[12px] mt-2 text-center'>It’s more affordable than ever to shop on Oaks!</p>
                                    <div className=' text-center'>
                                        <button onClick={() => navigate('/shop')} className=' font-poppins p-1 border-b-2 border-primaryBlack text-primaryBlack rounded-lg text-center mt-3 font-semibold uppercase text-[12px]'>
                                            Hurry Now 
                                            <span className=' ml-2'><ArrowRightAltIcon /> </span>
                                        </button>

                                    </div>
                                </div>
                            }

                            {currentSlidMobile === 6 && 
                                <div className={`absolute top-[40%] left-[8%] text-primaryWhite z-40 text-center `}>
                                    <h2 className='text-gradient font-poppins font-medium text-[25px] max-w-[330px] text-center'>Elegance and Precision. Discover new collections.</h2>
                                    <p className='hidden font-poppins text-[12px] mt-2 text-gradient max-w-[250px] mx-auto text-center'>Watch as unique as the person who wears it.</p>
                                    <button onClick={() => navigate('/shop')} className='font-poppins py-1 px-3 bg-primaryWhite text-primaryBlack rounded-lg text-center mt-3 text-[12px] font-semibold uppercase'>
                                        Explore
                                        <span className=' ml-2'><ArrowRightAltIcon /> </span>
                                    </button>
                                </div>
                            }

                            {currentSlidMobile === 7 && 
                                <div className={`absolute top-[40%] right-[5%] text-primaryBlack z-40 text-center`}>
                                    <h2 className=' font-poppins font-semibold text-[25px] max-w-[400px] text-center mx-auto'>Limited edition <span className=' text-primary'>sneakers</span> just for you.</h2>
                                    <p className=' font-poppins text-[12px] mt-2 max-w-[200px] text-center mx-auto'>Find your style! Our reputation shines as brightly as our shoes.</p>
                                    <button onClick={() => navigate('/shop')} className=' font-poppins py-1 px-3 bg-primary text-primaryWhite rounded-lg text-center mt-3 text-[12px] mx-auto  uppercase'>
                                        Buy Now
                                        <span className=' ml-2'><ArrowRightAltIcon /> </span>
                                    </button>
                                </div>
                            }
                        </div>
                    ))}



                
            </div>

            <div className='absolute bottom-10 left-[35%] sm:left-[45%] '>
                <div className=' hidden md:flex justify-center gap-4'>
                    {banner.map((item, i) => (
                        <div  
                            key={item.id} 
                            className={`sm:w-[21px] sm:h-[21px] w-[14px] h-[14px] ${activeUser === item.tag ? 'bg-primary border-2 md:border-4 border-solid border-white' : 'bg-gray-400'} rounded-full cursor-pointer`} 
                            onClick={() => goToSlide(item.tag)}
                        />
                    ))}

                </div>

                <div className=' hidden  md:hidden sm:flex justify-center gap-4'>
                    {bannerTablet.map((item, i) => (
                        <div  
                            key={item.id} 
                            className={`sm:w-[21px] sm:h-[21px] w-[14px] h-[14px] ${activeUserTablet === item.tag ? 'bg-primary border-2 md:border-4 border-solid border-white' : 'bg-gray-400'} rounded-full cursor-pointer`} 
                            // onClick={() => goToSlide(item.tag)}
                        />
                    ))}

                </div>

                <div className=' sm:hidden flex justify-center gap-4'>
                    {bannerMobile.map((item, i) => (
                        <div  
                            key={item.id} 
                            className={`sm:w-[21px] sm:h-[21px] w-[14px] h-[14px] ${activeUserMobile === item.tag ? 'bg-primary border-2 md:border-4 border-solid border-white' : 'bg-gray-400'} rounded-full cursor-pointer`} 
                            // onClick={() => goToSlide(item.tag)}
                        />
                    ))}

                </div>

            </div>            
        </div>
            
    </div>
  )
}

export default HeroBanner