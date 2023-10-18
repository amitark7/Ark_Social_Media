import {Modal ,useMantineTheme} from '@mantine/core'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ProfileModal({opend,setopend,data}) {
  const theme = useMantineTheme();
  const {password,...other}=data
  const[formData,setFormData]=useState(other)
  const[profileImage,setProfileImage]=useState(null)
  const[coverImage,setCoverImage]=useState(null)
  const dispatch=useDispatch()
  const param=useParams()
  const{user}=useSelector((state)=>state.AuthReducer.authData)


  const handlechange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  
  return (
    <Modal
    title="Introduce yourself!"
    overlaycolor={
      theme.colorScheme === "dark"
      ? theme.colors.dark[9]
      : theme.colors.gray[2]
    }
    size='50%'
    opened={opend}
    onClose={() => setopend(false)}
      overlayopacity={0.95}
    >
      <form className='infoForm'>
          <h3>Your info</h3>
          <div>
                    <input type="text" name="firstName" placeholder='First Name' className='infoInput' value={formData.firstname} onChange={handlechange} />
                    <input type="text" name="lastName" placeholder='Last Name' className='infoInput' value={formData.lastname} onChange={handlechange} />
                </div>
                <div>
                    <input type="text" name="worksAt" placeholder='Works at' className='infoInput' value={formData.worksAt} onChange={handlechange} />
                </div>
                <div>
                    <input type="text" name="livesin" placeholder='Lives In' className='infoInput' value={formData.livesin} onChange={handlechange}/>
                    <input type="text" name="country" placeholder='Country' className='infoInput' value={formData.country} onChange={handlechange}/>
                </div>
                <div>
                  <input type="text" name="relationship" placeholder='RelationShip' className='infoInput' value={formData.relationship} onChange={handlechange}/>
                </div>
                <div>
                  Profile Images
                  <input type="file" name="profileImage" onChange={handlechange}/>
                  Cover Images
                  <input type="file" name="coverImage" onChange={handlechange}/>
                </div>
                <button className="button info-button">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal