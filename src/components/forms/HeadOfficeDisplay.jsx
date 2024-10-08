import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton';
import { createHeadOfficeMaster, getSpecificHeadOffice } from '../services/MasterService';
import { useParams } from 'react-router-dom';

const HeadOfficeDisplay = () => {

    const { type } = useParams();
  const [headOffice, setHeadOffice] = useState({
    headOfficeName: ''
  });

  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    const loadHeadOffice = async () => {
        try {
            const result = await getSpecificHeadOffice(type);
            console.log(result.data);
            setHeadOffice(result.data);
        } catch (error) {
            console.error(error);
        }
    }
    loadHeadOffice();
  },[]);
  return (
    <>
      <form action="" className='border border-slate-500 w-[50%] h-[10vh]'>
        <div className='text-sm p-3 flex'>
          <label htmlFor="headOfficeName" className='w-[30%]'>Head Office Name</label>
          <span>:</span>
          <input type="text" id='headOfficeName' name='headOfficeName' value={headOffice.headOfficeName} ref={el => inputRefs.current[0] = el} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
        </div>
      </form>
      <RightSideButton />
    </>
  )
}

export default HeadOfficeDisplay