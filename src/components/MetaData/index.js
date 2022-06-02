import React from 'react'
import './index.css'

export default function MetaData() {
  return (
    <div>
        <form className = "meta-data-form">
            <label className = "input-label">campain name </label>
            <input type ="text" placeholder='Enter your campaign name' className = "email-input"/>

            <label className = "input-label">subject </label>
            <input type ="text" placeholder='Enter your subject'className='email-input'/>

            <label className = "input-label">preview text </label>
            <input type ="text" placeholder='Enter your preview text'className='email-input'/>

            <label className = "input-label">from </label>
            <input type ="text" placeholder='Select sender'className='email-input'/>
        </form>
    </div>
  )
}
