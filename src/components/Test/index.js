import React, { useState } from 'react'

export default function Test() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)

  async function sendMessage()  {
    if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    let emailResponse = await window.Email.send({
      Host : "smtp.google.com",
      Username : "learnethicalhackingfromscratch@gmail.com",
      Password : "Mm11**yugesh",
      To : email,
      From : 'learnethicalhackingfromscratch@gmail.com',
      Subject : "This is the subject",
      Body : "And this is the body"
  })

  console.log({emailResponse})
  }

  return (
    <div>
         <form className = "meta-data-form">
            <label className = "input-label">send a test email </label>
            <input 
              type ="text" 
              placeholder='Enter upto 10 Email Addresses' 
              className = "email-input"
              onChange={(e) => {setEmail(e.target.value); setError(null)}}  
            />

            <div className='blue-button' onClick = {()=> sendMessage()}>Send a Test Message</div>
            <div className="email-error">{error}</div>
        </form>
    </div>
  )
}
