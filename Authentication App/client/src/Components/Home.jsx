import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get("http://localhost:3001/verify")
    .then((res)=>{
      if(res.data.status){

      }
      else{
        navigate("/signin")
      }
    },[])
  })

  axios.defaults.withCredentials = true
  const handlesignout = () =>{
    axios.get("http://localhost:3001/signout")
    .then((res)=>{
      if(res.data.status){
        navigate("/")
      }
    }).catch((e)=>{
      console.log(`Err :- ${e}`)
    })
  }
  return (
    <div className='h-screen w-screen bg-black flex flex-col items-start text-white'>
      <h1>Home</h1>
      <button className=' w-1/12 h-auto font-bold rounded-xl bg-blue-600' onClick={handlesignout}> Logout</button>
    </div>
  )
}

export default Home
