import axios from 'axios'
import React, { useEffect, useState } from 'react'

//use states




const MainPage = () => {

  const [date, setDate] = useState(null)
  const [sourceCurrency, setSourceCurrency] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')
  const [exchangeAmount, setExchangeAmount] = useState(0)
  const [targetAmount, setTargetAmount] = useState(0)
  const [currencyNames, setCurrencyNames] = useState([])

const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.get(`http://localhost:5000/convert`, {
        params:{
          date,
          sourceCurrency,
          targetCurrency,
          exchangeAmount
        }
        //to complete 
      });
      setTargetAmount(response.data);

    } catch (error) {
      console.error(error)
    }

  }

  useEffect( ( ) => {
    const getCurrencyNames = async () => {
      try {
          const response = await axios.get('http://localhost:5000/getAllCurencies')
          setCurrencyNames(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getCurrencyNames()
  })

  return (
    <div className='flex flex-col justify-center items-center'>
        <div>
            <h1 className='text-green-600 text-6xl  mx-4 lg:mx-32 p-6'>Currency Exchange</h1>
            <p className='text-lg mx-4 lg:mx-32 px-6 pb-6 opacity-70'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam velit et delectus architecto mollitia vel sit nisi fugiat praesentium saepe, quod, aliquam rerum aspernatur asperiores consequuntur officia, veniam libero iste!
            </p>
        </div>
        <section  className='w-full lg:w-1/2'>
        <form onSubmit={onSubmit} className='p-4'>
          <div className='mb-5'>
            <label htmlFor={date} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Date</label>
            <input required onChange={(e) => setDate(e.target.value)} type="date" name={date} id={date} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'/>
          </div>

          <div className='mb-5'>
            <label htmlFor={sourceCurrency} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Source Currency</label>
            <select required onChange={(e) => setSourceCurrency(e.target.value)} name={sourceCurrency} id={sourceCurrency} value={sourceCurrency} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'>
              <option value="">Select Currency</option>
              {Object.keys(currencyNames).map((currency) => (
                <option className='p-1' key={currency} value={currency}>{currencyNames[currency]}</option>
              ))}
            </select>
          </div>
          
          <div className='mb-5'>
            <label htmlFor={targetCurrency} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Target Currency</label>
            <select required onChange={(e) => setTargetCurrency(e.target.value)} name={targetCurrency} id={targetCurrency} value={targetCurrency} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'>
              <option value="">Select Currency</option>
              {Object.keys(currencyNames).map((currency) => (
                <option className='p-1' key={currency} value={currency}>{currencyNames[currency]}</option>
              ))}
            </select>
          </div>

          <div className='mb-5'>
            <label htmlFor={exchangeAmount} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Exchange Amount</label>
            <input onChange={(e) => setExchangeAmount(e.target.value)} type="text" name={exchangeAmount} id={exchangeAmount} value={exchangeAmount} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' placeholder="Enter Amount" required/>
          </div>
          <div>
            <button  className='bg-green-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-700'>
              Convert Currency
            </button>
          </div>
        </form>
        </section>
        
        {sourceCurrency} {exchangeAmount} = {targetAmount} {targetCurrency}
        
    </div>
  )
}

export default MainPage