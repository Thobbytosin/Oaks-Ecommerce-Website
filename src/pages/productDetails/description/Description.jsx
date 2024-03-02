import React from 'react'
import styles from '../../../styles'
// import { featureTags } from '../../../constants'

const featureTags = [
    {
        id: 1,
        icon:   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 16.5C16.1421 16.5 19.5 13.1421 19.5 9C19.5 4.85786 16.1421 1.5 12 1.5C7.85786 1.5 4.5 4.85786 4.5 9C4.5 13.1421 7.85786 16.5 12 16.5Z" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 13.5C14.4853 13.5 16.5 11.4853 16.5 9C16.5 6.51472 14.4853 4.5 12 4.5C9.51472 4.5 7.5 6.51472 7.5 9C7.5 11.4853 9.51472 13.5 12 13.5Z" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.5 15V22.5L12 20.25L7.5 22.5V15" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>,
        text: "Free 1 Year Warranty"
    },

    {
        id: 2,
        icon:   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M16.5 7.50002H20.4938C20.6432 7.49904 20.7894 7.54329 20.9132 7.62695C21.037 7.71061 21.1326 7.82977 21.1875 7.96877L22.5 11.25" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.5 13.5H16.5" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.625 20.25C18.8676 20.25 19.875 19.2426 19.875 18C19.875 16.7574 18.8676 15.75 17.625 15.75C16.3824 15.75 15.375 16.7574 15.375 18C15.375 19.2426 16.3824 20.25 17.625 20.25Z" stroke="#DB4444" stroke-width="1.5" stroke-miterlimit="10"/>
                    <path d="M6.375 20.25C7.61764 20.25 8.625 19.2426 8.625 18C8.625 16.7574 7.61764 15.75 6.375 15.75C5.13236 15.75 4.125 16.7574 4.125 18C4.125 19.2426 5.13236 20.25 6.375 20.25Z" stroke="#DB4444" stroke-width="1.5" stroke-miterlimit="10"/>
                    <path d="M15.375 18H8.625" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4.125 18H2.25C2.05109 18 1.86032 17.921 1.71967 17.7803C1.57902 17.6397 1.5 17.4489 1.5 17.25V6.75C1.5 6.55109 1.57902 6.36032 1.71967 6.21967C1.86032 6.07902 2.05109 6 2.25 6H16.5V16.05" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.5 11.25H22.5V17.25C22.5 17.4489 22.421 17.6397 22.2803 17.7803C22.1397 17.921 21.9489 18 21.75 18H19.875" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>,
        text: "Free Shipping & Fasted Delivery"
    },

    {
        id: 3,
        icon:   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22.5656 11.4191L20.25 12.5722L17.25 6.83469L19.5938 5.66281C19.7679 5.57403 19.9701 5.55771 20.1563 5.61742C20.3425 5.67713 20.4975 5.80803 20.5875 5.98156L22.8937 10.3972C22.9405 10.4856 22.9691 10.5824 22.9779 10.682C22.9867 10.7817 22.9755 10.882 22.9449 10.9772C22.9143 11.0724 22.865 11.1606 22.7999 11.2365C22.7348 11.3123 22.6551 11.3744 22.5656 11.4191V11.4191Z" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.75008 12.4779L1.43446 11.3154C1.3453 11.2717 1.26584 11.2105 1.20079 11.1355C1.13575 11.0604 1.08646 10.9731 1.05585 10.8787C1.02524 10.7842 1.01393 10.6845 1.02261 10.5856C1.03128 10.4867 1.05975 10.3906 1.10633 10.3029L3.41258 5.88725C3.5028 5.71384 3.65716 5.58251 3.84277 5.52122C4.02839 5.45993 4.2306 5.47353 4.40633 5.55912L6.75009 6.731L3.75008 12.4779Z" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.25 12.5723L18.75 14.3348L15.3 17.7848C15.206 17.8727 15.092 17.9365 14.968 17.9708C14.8439 18.0051 14.7133 18.0088 14.5875 17.9816L9.15 16.6223C9.05067 16.5946 8.95812 16.5467 8.87812 16.4816L3.75 12.4785" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.7501 14.334L14.6251 11.334L13.4251 12.234C12.9052 12.622 12.2738 12.8317 11.6251 12.8317C10.9763 12.8317 10.345 12.622 9.82508 12.234L9.31883 11.8496C9.23323 11.7845 9.16242 11.702 9.1111 11.6075C9.05978 11.513 9.02911 11.4087 9.02113 11.3014C9.01316 11.1942 9.02805 11.0865 9.06483 10.9854C9.1016 10.8844 9.15942 10.7923 9.23446 10.7152L12.9095 7.04961C12.9785 6.98092 13.0604 6.92652 13.1505 6.88952C13.2406 6.85252 13.3371 6.83365 13.4345 6.83399H17.2501" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.80615 6.73121L11.6155 5.32496C11.7864 5.27595 11.9692 5.28924 12.1312 5.36246L15.3749 6.83433" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.5 19.9594L7.67813 19.2469C7.56313 19.2209 7.45666 19.166 7.36875 19.0875L5.25 17.25" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>,
        text: "100% Money-back guarantee"
    },

    {
        id: 4,
        icon:   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21.1406 12.7503H18.1406C17.7428 12.7503 17.3613 12.9083 17.08 13.1897C16.7987 13.471 16.6406 13.8525 16.6406 14.2503V18.0003C16.6406 18.3981 16.7987 18.7797 17.08 19.061C17.3613 19.3423 17.7428 19.5003 18.1406 19.5003H19.6406C20.0384 19.5003 20.42 19.3423 20.7013 19.061C20.9826 18.7797 21.1406 18.3981 21.1406 18.0003V12.7503ZM21.1406 12.7503C21.1407 11.5621 20.9054 10.3856 20.4484 9.28875C19.9915 8.1919 19.3218 7.1964 18.4781 6.35969C17.6344 5.52297 16.6334 4.86161 15.5328 4.41375C14.4322 3.96589 13.2538 3.74041 12.0656 3.75031C10.8782 3.74165 9.70083 3.96805 8.60132 4.41647C7.5018 4.86488 6.50189 5.52645 5.6592 6.36304C4.81651 7.19963 4.1477 8.19471 3.69131 9.29094C3.23492 10.3872 2.99997 11.5629 3 12.7503V18.0003C3 18.3981 3.15804 18.7797 3.43934 19.061C3.72064 19.3423 4.10218 19.5003 4.5 19.5003H6C6.39782 19.5003 6.77936 19.3423 7.06066 19.061C7.34196 18.7797 7.5 18.3981 7.5 18.0003V14.2503C7.5 13.8525 7.34196 13.471 7.06066 13.1897C6.77936 12.9083 6.39782 12.7503 6 12.7503H3" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>,
        text: "24/7 Customer Support"
    },

    {
        id: 5,
        icon:   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 5.25H3C2.58579 5.25 2.25 5.58579 2.25 6V18C2.25 18.4142 2.58579 18.75 3 18.75H21C21.4142 18.75 21.75 18.4142 21.75 18V6C21.75 5.58579 21.4142 5.25 21 5.25Z" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.75 15.75H18.75" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.25 15.75H12.75" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2.25 9.08398H21.75" stroke="#DB4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>,
        text: "Secure Payment Method"
    },
]



const Description = ({description, description2}) => {
  return (
    <div className={`${styles.flexItemsStart} md:flex-row gap-3 md:gap-6 flex-col mt-[1.2rem] md:mt-[2rem]`}>
        <div className=' basis-2/4 md:mb-0 mb-[18px]'>
            <h2 className=' mb-4 text-[12px] sm:text-[14px] md:text-[16px] font-inter font-semibold'>Description</h2>
            <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[12px] leading-[28px] max-w-[650px] text-justify'>{description}</p>
            <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[12px] leading-[28px] max-w-[650px] block mt-3 text-justify'>{description2}</p>
        </div>


        <div className='sm:hidden md:block block md:basis-1/4'>
            <h2 className=' mb-3 sm:mb-6 text-[12px] sm:text-[14px] md:text-[16px] font-inter font-semibold'>Feature</h2>
            {featureTags.map((feature) => (
                <div key={feature.id} className={`flex items-center ${feature.id === featureTags.length ? 'mb-0' : 'mb-3 sm:mb-6'}`}>
                    <span className=' w-[35px]'>{feature.icon}</span>
                    <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[12px]  text-primaryBlack'>{feature.text}</p>

                </div>
            ))}
        </div>

        <div className='sm:hidden md:block block md:basis-1/4 sm:mt-0 mt-8'>
            <h2 className=' mb-3 sm:mb-6 text-[12px] sm:text-[14px] md:text-[16px] font-inter font-semibold'>Shipping Information</h2>
            <p className=' font-poppins font-medium text-[8px] sm:text-[10px] md:text-[12px] text-primaryBlack sm:mb-4 mb-2'>Courier: <span className=' font-normal text-neutal'>4-7 days free shipping</span></p>
            <p className=' font-poppins font-medium text-[8px] sm:text-[10px] md:text-[12px] text-primaryBlack sm:mb-4 mb-2'>Local Shipping: <span className=' font-normal text-neutal'>Up to one week. Free</span></p>
            <p className=' font-poppins font-medium text-[8px] sm:text-[10px] md:text-[12px] text-primaryBlack'>Express Shipping: <span className=' font-normal text-neutal'>2-4 days. up to &#8358;5000</span></p>
        </div>

        <div className=' md:hidden sm:flex hidden gap-8'>
            <div className=''>
                <h2 className=' mb-6 text-[12px] sm:text-[14px] md:text-[16px]  font-inter font-semibold'>Feature</h2>
                {featureTags.map((feature) => (
                    <div key={feature.id} className={`flex items-center ${feature.id === featureTags.length ? 'mb-0' : 'sm:mb-6 mb-3'}`}>
                        <span className=' w-[35px]'>{feature.icon}</span>
                        <p className=' font-poppins text-[8px] sm:text-[10px] md:text-[12px] text-primaryBlack'>{feature.text}</p>

                    </div>
                ))}
            </div>

            <div className=''>
                <h2 className=' mb-3 sm:mb-6 text-[12px] sm:text-[14px] md:text-[16px] font-inter font-semibold'>Shipping Information</h2>
                <p className=' font-poppins font-medium text-[8px] sm:text-[10px] md:text-[12px] text-primaryBlack sm:mb-4 mb-2'>Courier: <span className=' font-normal text-neutal'>4-7 days free shipping</span></p>
                <p className=' font-poppins font-medium text-[8px] sm:text-[10px] md:text-[12px] text-primaryBlack sm:mb-4 mb-2'>Local Shipping: <span className=' font-normal text-neutal'>Up to one week. Free</span></p>
                <p className=' font-poppins font-medium text-[8px] sm:text-[10px] md:text-[12px] text-primaryBlack'>Express Shipping: <span className=' font-normal text-neutal'>2-4 days. up to &#8358;5000</span></p>
            </div>
        </div>
    </div>
  )
}

export default Description