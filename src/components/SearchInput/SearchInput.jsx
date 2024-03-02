import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

const SearchInput = () => {
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

        const filtered = info?.filter((product) => product?.name?.toLowerCase().includes(searchTerm?.toLowerCase()))

        // console.log(filtered)
        setFilteredProucts(filtered)
    }

    const searchQueryButtonHandler = (e)=> {
        e.preventDefault()
        {searchInput && navigate(`/search/${searchInput}`) }
    }

    const searchQueryHandler = (e) => {
        e.preventDefault()
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
    <div className=' relative'>
                    {/* SEARCH FORM */}
                    <form onSubmit={searchQueryHandler} className={`hidden sm:flex justify-between items-center px-4 py-2 bg-white sm:w-full md:w-[400px] rounded-[10px]`}>
                        <input 
                            type="text" 
                            name='search' 
                            id='search' 
                            value={searchInput}
                            onChange={handleSearch} 
                            onKeyUp={searchQueryHandler}
                            placeholder='Search your products' className='w-full text-[10px] md:text-[12px] bg-transparent text-primaryBlack font-poppins ' 
                        />
                        <button onClick={searchQueryButtonHandler} ><SearchIcon className='' style={{fontSize: 14}} /></button>
                        
                    </form>

                    {searchInput &&
                        <ul className=' hidden sm:flex flex-col absolute -bottom-35 left-0 bg-dimWhite w-full  font-poppins z-10'>
                            {filteredProducts?.slice(0, 8).map((item, i) => (
                                <li key={i} className={`font-semibold p-4 truncate ${filteredProducts?.length - 1 === i ? 'mb-0' : 'mb-0'} hover:bg-white`}>
                                    <Link to={`/product/${item.id}`}>{item.name.toLowerCase()}</Link>
                                </li>
                            ))}
                        </ul> 
                    }

        
    </div>
  )
}

export default SearchInput