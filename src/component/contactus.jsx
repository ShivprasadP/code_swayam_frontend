import React from 'react';

const Contactus = () => {
  return (
    <div id='contact' className='bg-white mx-auto mt-[100px] max-w-lg rounded-lg shadow-lg p-8'>
      <h2 className='text-4xl font-bold text-amber-500 text-center'>
        Contact Us
      </h2>
      <form className='space-y-6'>
        <div className='flex flex-col'>
          <label htmlFor='name' className='text-lg text-green-950 font-medium'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800'
            required
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='no' className='text-lg text-green-950 font-medium'>
            Mobile No
          </label>
          <input
            type='number'
            id='no'
            name='no'
            className='mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800'
            required
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='email' className='text-lg text-green-950 font-medium'>
            Email ID
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800'
            required
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='text' className='text-lg text-green-950 font-medium'>
            Feedback (If any)
          </label>
          <textarea
            id='text'
            name='text'
            className='mt-2 p-3 border border-gray-300 rounded-md h-28 focus:outline-none focus:ring-2 focus:ring-green-800'
          ></textarea>
        </div>
        <button
          type='submit'
          className='w-full text-lg font-semibold text-white bg-gradient-to-b from-amber-400 to-orange-400 text-white py-3 rounded-md '
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contactus;
