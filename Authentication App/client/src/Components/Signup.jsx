import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [signal, setsignal] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/signup", {
            username: username,
            email: email,
            password: password
        }).then((res) => {
            if (res.data.message === "User Already Exists") {
                setsignal("User Already Exists")
            }
            else if (res.data.message === "User Signed Up") {
                navigate("/signin")
            }
        })
    }
    return (
        <div className="h-screen w-screen bg-black flex flex-col justify-center items-center">
            <div className="h-2/3 w-1/4 bg-white rounded-2xl flex flex-col p-5">
                <h1 className="font-bold text-4xl underline mb-10">Sign Up</h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label for="un" className="text-xl">Enter Username :</label>
                    <input value={username} onChange={(e) => setusername(e.target.value)} id="un" type="text" placeholder="Username" className="border-black border-2 h-10 mb-2" required></input>
                    <label for="em" className="text-xl">Enter Email :</label>
                    <input value={email} onChange={(e) => setemail(e.target.value)} id="em" type="email" placeholder="Email" className="border-black border-2 h-10 mb-2" required></input>
                    <label for="pa" className="text-xl">Enter Password :</label>
                    <input value={password} onChange={(e) => setpassword(e.target.value)} id="pa" type="password" placeholder="Password" minLength={8} maxLength={25} className="border-black border-2 h-10 mb-2" required></input>
                    <h1>Already have an account ? <Link className="text-blue-700 underline" to="/signin">Sign In</Link></h1>
                    <button className="mt-5 mb-4 h-10 w-full bg-blue-600 text-white rounded-lg" type="submit">Submit</button>
                    <h1 className="text-red-700 font-bold text-xl">{signal}</h1>
                </form>
            </div>
        </div>
    )
}

export default Signup
