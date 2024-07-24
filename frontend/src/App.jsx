
import { useState } from 'react'
import './App.css'

function App() {
 const [userInput,setUserInput] = useState({name:"",mobilenumber:""})
 function handleChange(e){
    setUserInput({...userInput,[e.target.name] : e.target.value})
 }
 async function handleSubmit(e){
   e.preventDefault();
   const callAPI = await fetch('http://127.0.0.1:5000/sendotp',{
    method:"post",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(userInput)
   })
 }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Username:</label>
        <input type="text" id='name' name='name' onChange={handleChange} />
        <label htmlFor="mobilenumber">Mobile Number:</label>
        <input type="text" id='mobilenumber' name='mobilenumber' onChange={handleChange} />
        <button type='submit'>Send OTP</button>
      </form>
    </>
  )
}

export default App
