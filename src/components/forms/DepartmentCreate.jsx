import React, { useEffect, useRef, useState } from 'react'
import { createDepartmentMaster } from '../services/MasterService';
import RightSideButton from '../right-side-button/RightSideButton';
// import { useLocation } from 'react-router-dom';

const DepartmentCreate = () => {
  const [department, setDepartment] = useState({
    departmentName: ''
  });

  const inputRefs = useRef([]);
  // const location = useLocation();
  // const preventConfirm = location.state?.preventConfirm;

  const handleInputChange = e => {
    const {name,value} = e.target;
    setDepartment(prevState => ({...prevState, [name]: value}));
  }

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  },[]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
        const response = await createDepartmentMaster(department);
        console.log('Department created successfully!', response.data);

        setDepartment({
            departmentName: ''
        });

        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }

    } catch (error) {
        console.error('Error creating department master:', error);
    }
};

  const handleKeyDown = (e,index) => {
    const key = e.key;

    if (key === 'Enter'){
      e.preventDefault();     // Prevent default form submission on Enter
      // Show confirmation prompt
      const userConfirmed = window.confirm('Do you want to confirm this submit?');
      if (!userConfirmed) return;
      // Check if the current input has a value
      if (e.target.value.trim() !== ''){
        // Check if it's the last input field
        if (index === inputRefs.current.length - 1){
          handleSubmit(e);   // Submit the form
        }
      }
    }
  }

  
  return (
    <>
      <form className='border border-slate-500 w-[50%] h-[10vh]' onSubmit={handleSubmit}>
        <div className='text-sm p-3 flex'>
          <label htmlFor="departmentName" className='w-[30%]'>Department Name</label>
          <span>:</span>
          <input type="text" id='departmentName' name='departmentName' value={department.departmentName} ref={el => (inputRefs.current[0] = el)} onKeyDown={e => handleKeyDown(e, 0)} onChange={handleInputChange} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
        </div>
      </form>
      <RightSideButton />
    </>
  )
}

export default DepartmentCreate