import React, { useContext, useEffect, useState } from 'react'
import styles from '../../../styles'
import { updatePassword, updateProfile } from 'firebase/auth'
import { AuthContext } from '../../../context/AuthProvider'
import { db, storage } from '../../../firebase/firebase.config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Spinner } from '../../../components'
import GoToTop from '../../../components/GoToTop/GoToTop'

const options = [
  {value: '', text: '--Choose an option--'},
  {value: 'lagos', text: 'Lagos'},
  {value: 'oyo', text: 'Oyo'},
  {value: 'ogun', text: 'Ogun'},
];

const Settings = () => {
  
    const [image, setImage] = useState(null)
    const {user} = useContext(AuthContext)
    const [url, setUrl] = useState()
    const [firstName, setFirstName] = useState("")
    const [fullname, setFullname] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [phoneNumber, setPhoneNumnber] = useState("")
    const [phoneNumber2, setPhoneNumnber2] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [info, setInfo] = useState([])
    const [selected, setSelected] = useState(options[0].value)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")



    const getInfo = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data()
      
      setInfo(data)
      // setAllOrders(info?.orders)
    }

    useEffect( () => {
        getInfo()
    }, [])


    const handleImageChange = (e) => {
        if(e.target.files[0]) {
          setImage(e.target.files[0])
        }
      }
      
      updateProfile(user, {photoURL: url}).then(() => {
        // updated
      }).catch((error) => {
        console.log(error.message)
      })
    
      const handleSubmit = () => {
        const imageRef = ref(storage, user.uid + 'png')
    
        uploadBytes(imageRef, image).then(() => {
          getDownloadURL(imageRef).then((url) => {
            setUrl(url)
            // user.photoURL = url
            // location.reload()
          }).catch((error) => {
            console.log(error.message, "error getting the image url")
          })
        }).catch((error) => {
          console.log(error.message)
        })
      }

      const handleSaveChanges = (event) => {
        event.preventDefault()
    
        const information = {
          username: username.length >= 1 && username,
          fullname: fullname.length >= 1 && fullname,
          firstName: firstName.length >= 1 && firstName,
          lastName: lastName.length >= 1 && lastName,
          email: email.length >= 1 && email,
          phoneNumber: phoneNumber.length >= 1 && phoneNumber,
          phoneNumber2: phoneNumber2.length >= 1 && phoneNumber2,
          address: address.length >= 1 && address,
          city: city.length >= 1 && city,
          state: state.length >=1 && state,
          zipCode: zipCode.length >= 1 && zipCode,
    
        }
    
        const updateUserDetails = async () => {
    
         
            const updatUserInfo = doc(db, "users", user?.uid);
      
            await updateDoc(updatUserInfo, {...information});
    
            user.userInfo = true
            user.firstName = firstName
            user.lastName = lastName
            user.phoneNumber = phoneNumber
            user.phoneNumber2 = phoneNumber2
            user.address = address
            user.city = city
            user.state = state
            user.zipCode = zipCode
            user.country = country
          
            await updateProfile(user, {displayName: user.displayName}).then(() => {
              // console.log('Updated', user)
              setShowPayment(true)
              setDetailsInputed(true)
              toast.success(`Profile Updated Successfully`, {
                position: "top-center",
                autoClose: 3000
              })
            }).catch((error) => {
              console.log(error)
            })
            
          
        }
    
        updateUserDetails()    
      }

      const handleChangeStates = (e) => {
        // console.log(e.target.value)
        setSelected(e.target.value)
      }

      const handleChangePassword = async (event) => {
        event.preventDefault()

        const form = event.target
        let oldPassword = form.oldPassword.value
        let newPassword = form.newPassword.value
        let confirmPassword = form.confirmPassword.value

        if (oldPassword !== info?.passcode) {
          setErrorMessage("Incorrect old password")
        } else if (newPassword.length < 6) {
          setErrorMessage("Password should be at least characters")
        } else if (newPassword !== confirmPassword) {
          setErrorMessage("Password do not match. Please check again")
        } else {
          try {
            await updatePassword(user, newPassword )
            console.log('Updated')
          } catch (error) {
            console.log(error.message)
          }
        }
      }




  return (
    <div className={`w-full sm:w-[75%] font-poppins`}>
        {/* ACCOUNT SETTING */}
        <GoToTop />

        {info?.length !== 0 
          ?
        
            <div className=' w-full border border-primaryGray'>
                <div className=' w-full p-6 border-b border-primaryGray text-[12px] md:text-[14px] font-medium'>
                  ACCOUNT SETTING
                </div>

                <div className=' flex md:flex-row flex-col items-start gap-[5rem] px-6 py-10 border-b border-primaryGray'>
                  <div className='relative  h-[230px] flex flex-col justify-between'>
                    <div className=' w-[176px] h-[176px] bg-slate-400 rounded-full overflow-hidden '>
                      <img src={url || user?.photoURL} alt="" className=' object-contain object-center' />
                    </div>
                    <div className=' flex'>
                      <div>
                        <input  type="file" id="profile" name="file" onChange={handleImageChange} />
                        <label htmlFor="profile" id="profile-label" className=''>
                          <span className=' w-[40px] h-[40px] absolute bottom-[55px] left-[1rem] rounded-full bg-primaryGray cursor-pointer flex justify-center items-center text-primaryBlack border-[4px] border-white overflow-hidden'><PhotoCameraBackIcon style={{fontSize: 20}} /></span>

                        </label>

                      </div>

                      <button onClick={handleSubmit} className='w-full text-center bg-primary px-2 py-1 text-[12px] text-primaryWhite block'>UPDATE DISPLAY PICTURE</button>

                    </div>

                  </div>

                  <div className=' w-full'>
                    <div className=' flex justify-between gap-4'>
                      <div className=' w-full'>
                        <label htmlFor="username" className={styles.labelHeading}>USERNAME</label>
                        <input type="text" name='username' id="username" placeholder={`${info?.username}`} value={username} onChange={(e) => setUsername(e.target.value)} required className=' border-primaryGray border rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                      </div>

                      <div className=' w-full'>
                        <label htmlFor="fullname" className={styles.labelHeading}>FULL NAME</label>
                        <input type="text" name='fullname' id="fullname" placeholder={`${info?.fullname}`} value={fullname} onChange={(e) => setFullname(e.target.value)} required className=' border-primaryGray border rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                      </div>
                    </div>

                      {/* FIRST NAME / LAST NAME */}
                    <div className=' flex justify-between gap-4 mt-4'>
                      <div className=' w-full'>
                        <label htmlFor="firstName" className={styles.labelHeading}>FIRST NAME</label>
                        <input type="text" name='firstName' id="firstName" placeholder={`${info?.firstName}`} value={firstName} onChange={(e) => setFirstName(e.target.value)} required className=' border-primaryGray border rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                      </div>

                      <div className=' w-full'>
                        <label htmlFor="lastName" className={styles.labelHeading}>LAST NAME</label>
                        <input type="text" name='lastName' id="lastName" placeholder={`${info?.lastName}`} value={lastName} onChange={(e) => setLastName(e.target.value)} required className=' border-primaryGray border rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                      </div>
                    </div>

                      {/* PHONE NUMBER */}
                                
                      <div className=' w-full mt-4'>
                        <label htmlFor="phoneNumber" className={styles.labelHeading}>PHONE NUMBER</label>
                        <input type="text" name='phoneNumber' id="phoneNumber" placeholder={`${info?.phoneNumber}`} value={phoneNumber} onChange={(e) => setPhoneNumnber(e.target.value)} required className=' border-primaryGray border rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                      </div>

                      {/* STATE AND CITY */}

                      <div className=' w-full flex gap-4 mt-4'>
                        <div className=' w-full'>
                          <label htmlFor="state" className={styles.labelHeading}>STATE</label>
                          <select name="state" id="state" value={selected} onChange={handleChangeStates} className='border-primaryGray border rounded-[6px] p-1.5 text-[10px] md:text-[12px]'>
                            {options.map((el) => (
                              <option key={el.value} value={el.value}>
                                {el.text}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className=' w-full'>
                          <label htmlFor="city" className={styles.labelHeading}>CITY</label>
                          <input type="text" name='city' id="city" placeholder={`${info?.city}`} value={city} onChange={(e) => setCity(e.target.value)} required className=' border-primaryGray border rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                        </div>

                      </div>

                    <div className=' w-full mt-4'>
                        <label htmlFor="address" className={styles.labelHeading}>SHIPPING ADDRESS</label>
                        <input type="text" name='address' id="address" placeholder={`${info?.address}`} value={address} onChange={(e) => setAddress(e.target.value)} required className=' border-primaryGray border rounded-[6px] p-1.5 text-[10px] md:text-[12px] w-full' />
                    </div>

                    <button className=' px-3 py-1 text-[10px] md:text-[12px] bg-primary text-primaryWhite text-center mt-4'>
                      Save Changes
                    </button>
                  </div>
                </div>

              <div className=''>
                <div className=' w-full p-6 border-b border-primaryGray text-[12px] md:text-[14px] font-medium uppercase'>
                    Change Password
                </div>

                <form onSubmit={handleChangePassword}>

                  <div className=' w-full px-6 py-3'>
                          <label htmlFor="old password" className={styles.labelHeading}>OLD PASSWORD</label>
                          <div className=' p-1.5 text-[10px] md:text-[12px] w-full flex justify-between items-center border-darkGray bg-dimWhite'>
                            <input 
                                  type={ showPassword ? "text" : "password"} 
                                  name="oldPassword"
                                  placeholder="Old Password *"
                                  required
                                  className=' bg-transparent  w-full text-primaryBlack '
                              />
                              {showPassword ? <VisibilityIcon onClick={() => setShowPassword(false)} style={{cursor: "pointer"}} /> : <VisibilityOffIcon onClick={() => setShowPassword(true)} style={{cursor: "pointer"}} /> }

                          </div>

                  </div>

                  <div className=' w-full px-6 py-3 '>
                          <label htmlFor="new password" className={styles.labelHeading}>NEW PASSWORD</label>
                          <div className=' p-1.5 text-[10px] md:text-[12px] w-full flex justify-between items-center border-darkGray bg-dimWhite'>
                            <input 
                                  type={ showPassword ? "text" : "password"} 
                                  name="newPassword"
                                  placeholder="New Password *"
                                  required
                                  className=' bg-transparent  w-full text-primaryBlack '
                              />
                              {showPassword ? <VisibilityIcon onClick={() => setShowPassword(false)} style={{cursor: "pointer"}} /> : <VisibilityOffIcon onClick={() => setShowPassword(true)} style={{cursor: "pointer"}} /> }

                          </div>

                  </div>

                  <div className=' w-full px-6 py-3'>
                    <label htmlFor="confirmPassword" className={styles.labelHeading}>CONFIRM NEW PASSWORD</label>
                    <div className=' p-1.5 text-[10px] md:text-[12px] w-full flex justify-between items-center border-darkGray bg-dimWhite'>
                      <input 
                            type={ showPassword ? "text" : "password"} 
                            name="confirmPassword"
                            placeholder="Confirm Password *"
                            required
                            className=' bg-transparent  w-full text-primaryBlack '
                        />
                        {showPassword ? <VisibilityIcon onClick={() => setShowPassword(false)} style={{cursor: "pointer"}} /> : <VisibilityOffIcon onClick={() => setShowPassword(true)} style={{cursor: "pointer"}} /> }

                    </div>

                  </div>
                  {errorMessage && 
                    <div className=' ml-6 text-primary font-poppins font-medium text-[12px] md:text-[14px] mb-3'>
                    {errorMessage}
                    </div>
                  }

                  <button className=' m-6 px-3 py-1 text-[10px] md:text-[12px] bg-primary text-primaryWhite text-center mt-2'>
                    Save Changes
                  </button>
                </form>

              </div>
            </div>

          : <div className='h-[50vh] flex justify-center items-center'><Spinner /></div>
        }
    </div>
  )
}

export default Settings;
