import React, { useEffect, useRef, useState } from 'react'


function CustomDropdown({
    value,
    onChange,
    options,
    placeholder,
    errors,
    // width = "47%"
}) {
    const [open, setOpen]=useState(false)
    const ref = useRef(null)
    useEffect(()=>{
        const handleClickOutside = (e)=>{
            if(ref.current && !ref.current.contains(e.target)){
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return ()=>{
            document.addEventListener('mousedown', handleClickOutside)
        }
    },[])
  return (
   <div ref={ref} className={`position-relative custom-dropdown ${errors? "":"mb-3"}`} >
     <button type='button' className={`form-control shadow-none d-flex justify-content-between align-items-center  ${errors?"input-error mb-0":""}`} onClick={()=> setOpen(!open)}>
        <span className={value ? "text-dark": "text-muted"}>{value||placeholder}</span>
        <span className='ms-2 '>&#9660;</span>
     </button>

     {open && (
        <ul className=' dropdown-menu menu show w-100 mt-1 shadow-none'>
            {options.length===0 && (
                <li className=' dropdown-item text-muted'>No options</li>
            )}
            {options.map((opt)=>(
                <li key={opt} className=' dropdown-item' style={{ cursor:'pointer' }} onClick={()=>{onChange(opt) 
                setOpen(false)}}>{opt}</li>
            ))}
        </ul>
     )}

     {errors && (
        <span className='text-danger d-block mt-1'>
            {errors}
        </span>
     )}
   </div>
  )
}

export default CustomDropdown
