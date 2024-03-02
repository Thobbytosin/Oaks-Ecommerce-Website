import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

const SearchInputMobile = () => {
    const [searchInput, setSearchInput] = useState("")
    const [filteredProducts, setFilteredProucts] = useState()
    const [info, setInfo] = useState([])
    const navigate = useNavigate()
    
    const getInfo = async () => {
        const q = query(collection(db, "all"), where("all", "==", true))
        const querySnapshot = await getDocs(q)
        const info = querySnapshot.docs.map((doc) => (
            doc.data()
          ))
          
          setInfo(info)
    }
        
    useEffect(() => {
        getInfo()
    }, [])


    
    

    const handleSearch = (e) => {
        const searchTerm = e.target.value
        setSearchInput(searchTerm)

        const filtered = info?.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

        // console.log(filtered)
        setFilteredProucts(filtered)
    }

    const searchQueryButtonHandler = ()=> {
        {searchInput && navigate(`/search/${searchInput}`) }
    }

    const searchQueryHandler = (e) => {
        if(e.key === 'Enter' && searchInput.length > 0) {
            navigate(`/search/${searchInput}`)
        } else if (e.key === 'Escape') {
            setSearchInput("")
        }

    }

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

  return (

    <div>
        <form onSubmit={searchQueryHandler} className='md:hidden flex items-center px-4 py-1 bg-primaryGray w-[100%] '>
                <input 
                    type="text" 
                    name='search' 
                    id='search' 
                    value={searchInput} 
                    onChange={handleSearch} 
                    onKeyUp={searchQueryHandler}
                    placeholder='Search your products' 
                    className='w-full  text-[10px] bg-transparent text-primaryBlack font-poppins ' 
                />
                <button onClick={searchQueryButtonHandler} ><SearchIcon className='' style={{fontSize: '15px'}} /></button>
            </form>
    
            {searchInput &&
                <ul className=' md:hidden flex flex-col absolute -bottom-35 left-0 bg-dimWhite w-full  font-poppins z-20'>
                    {filteredProducts.slice(0, 8).map((item, i) => (
                        <li key={i} className={`font-semibold text-[12px] md:text-[16px] md:p-4 px-4 py-2 ${filteredProducts.length - 1 === i ? 'mb-0' : 'mb-0'} hover:bg-white`}>
                            <Link to={`/product/${item.id}`}>{item.name.toLowerCase()}</Link>
                        </li>
                    ))}
                </ul>
            }

    </div>
  )
}

export default SearchInputMobile