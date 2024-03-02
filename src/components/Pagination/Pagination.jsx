import React from 'react'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styles from '../../styles';

const Pagination = ({totalProducts, productsPerPage, activePage, paginate}) => {
    const pageNumbers = []
    for (let index = 1; index <= Math.ceil(totalProducts / productsPerPage); index++) {
        pageNumbers?.push(index)
    }
  return (
    <div className={styles.flexCenter}>
        <div 
            className=' mr-[1rem] cursor-pointer'
            onClick={() => {
                if(activePage === 1) {
                    paginate(activePage)
                } else if (activePage > 1 && activePage <= pageNumbers.length) {
                    paginate(activePage - 1)
                }
            }}
        >
            <NavigateBeforeIcon style={{fontSize: 28}} />
        </div>
        <div className=' flex sm:gap-4 items-center'>
            {pageNumbers?.map((number) => (
                <p 
                    key={number} 
                    className={`${number === activePage ? 'bg-primary text-primaryWhite' : ''} rounded-full sm:h-[40px] sm:w-[40px] h-[20px] w-[20px] flex justify-center items-center font-poppins font-medium cursor-pointer text-[8px] sm:text-[16px]`}
                    onClick={() => paginate(number)}
                >{number}</p>
            ))}

        </div>

        <div 
            className=' ml-[1rem] cursor-pointer'
            onClick={() => {
                if(activePage === pageNumbers.length) {
                    paginate(activePage)
                } else {
                    paginate(activePage + 1)
                }
            }}
        >
            <NavigateNextIcon style={{fontSize: 28}} />
        </div>
    </div>
  )
}

export default Pagination