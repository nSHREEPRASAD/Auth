import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
const Signin = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [signal, setsignal] = useState("")
    const navigate = useNavigate()

    axios.defaults.withCredentials = true
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/signin", {
            email: email,
            password: password
        }).then((res) => {
            if(res.data.message === "Incorrect Email" || res.data.message === "Incorrect Password"){
                setsignal("Incorrect Email or Password")
            }
            else if (res.data.message === "User Signed In") {
                navigate("/home")
            }
        }).catch((e)=>{
            console.log(`Error : ${e}`)
        })
    }
    return (
        <div className="h-screen w-screen bg-black flex flex-col justify-center items-center">
            <div className=" h-3/5 w-1/4 bg-white rounded-2xl flex flex-col p-5">
                <h1 className="font-bold text-4xl underline mb-10">Sign In</h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label for="em" className="text-xl">Enter Email :</label>
                    <input value={email} onChange={(e) => setemail(e.target.value)} id="em" type="email" placeholder="Email" className="border-black border-2 h-10 mb-2"></input>
                    <label for="pa" className="text-xl">Enter Password :</label>
                    <input value={password} onChange={(e) => setpassword(e.target.value)} id="pa" type="password" placeholder="Password" className="border-black border-2 h-10 mb-2"></input>
                    <h1>Don't have an account ? <Link className="text-blue-700 underline" to="/">Sign Up</Link></h1>
                    <button className="mt-5 h-10 w-full bg-blue-600 text-white rounded-lg" type="submit">Submit</button>
                    <h1 className="text-red-700 font-bold text-xl mt-4">{signal}</h1>
                </form>
            </div>
        </div>
    )
}

export default Signin
