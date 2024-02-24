// import React,{useState}from 'react'

// const LoginPage = () => {
//     const[action,setAction]=useState("Login");

//   return (

//     <>
//       <div className='container'>
//         <div className='header'>
//             <div className='text'>{action}</div>
//             <div className='underline'></div>
//         </div>
//         <div className='inputs'>
//             {action==="Login"?<div></div>:
//             <div className='input'>
//                 <input type="text" placeholder='Username' />
//             </div>}
//             <div className='input'>
//                 <input type="email" placeholder='Email-Id' />
//             </div>
//             <div className='input'>
//                 <input type="password" placeholder='Password'/>
//             </div>
//         </div>
//         <div className='forget-password'>Forget Password   
//               <span> Click Here!</span></div>
//         <div className='submit-container'>
//             <button className='submit' onClick={()=>{setAction("Login")}}>Login</button>

//         </div>
      
//     </div>
//     </>
//   )
// }

// export default LoginPage
import React, { useState } from 'react'

const SignupPage = () => {
    const[action,setAction]=useState("SignUp");




  return (
    <div className='container'>
        <div className='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            <div className='input'>
                <input type="text" placeholder='Username' />
            </div>
            <div className='input'>
                <input type="email" placeholder='Email-Id' />
            </div>
            <div className='input'>
                <input type="password" placeholder='Password'/>
            </div>
        </div>
        <div className='submit-container'>
            <button className='submit' onClick={()=>{setAction("SignUp")}}>Sign Up</button>

        </div>
      
    </div>
  )
}

export default SignupPage
