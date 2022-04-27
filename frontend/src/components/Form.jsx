import React, { useState } from 'react'

function Form() {

    const [data,setData] = useState({weight:"",pincode:"",type:""})
    const {weight,pincode,type} = data

    const handleInputChange = (e)=>{
        setData({...data, [e.target.name] : e.target.value})
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        getCharge()
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({weight,pincode,type})
    };
    const getCharge = async() =>{
        let res = await fetch("http://localhost:8080/api/v1/address",requestOptions)
        let data = await res.json()
       if(data.err){
           alert(data.err)
       }else{
        let res = {Totoalcharges : data.TotalCharges}
        alert(JSON.stringify(res))
       }
    }
  return (
    <div>
        <form action="" className='formName' onSubmit={(e)=>submitHandler(e)}>
        <h2>Courier charge calculator</h2>
        <input type="number" name="weight" value={weight} onChange={handleInputChange} placeholder='Weight' required/>
        <input type="number" name="pincode" value={pincode} onChange={handleInputChange} placeholder='pincode' required/>
        <select name="type" value={type} onChange={handleInputChange}>
            <option value="">select</option>
            <option value="Forward">Forward</option>
            <option value="Forward & RTO">Forward & RTO</option>
        </select>
       <button type='submit'>submit</button>
        </form>
    </div>
  )
}

export default Form