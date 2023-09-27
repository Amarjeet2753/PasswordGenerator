import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const [isCopied, setIsCopied] = useState(false);

  const passwordGenerator= useCallback(()=>{

     let pass=""
     let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

     if(numberAllowed) str+="0123456789"
     if(charAllowed) str+="@#$%^&*!)("

     for(let i=1;i<=length;i++){
        let charInd = Math.floor(Math.random()*str.length)
        pass+=str.charAt(charInd)
     }

     setIsCopied(false)
     setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])


  // useRef

  const passwordRef = useRef(null)

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setIsCopied(true)
  },[password])

  useEffect(()=>{
     passwordGenerator();
  },[length,charAllowed,numberAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg text-orange-500 bg-gray-800 my-8 px-4 py-3'>
        <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input className='outline-none w-full py-1 px-3'
            type="text" name="" id="" value={password}
             ref={passwordRef}
            placeholder='Password' readOnly />

          <button className='bg-blue-700 outline-none text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipBoard}> {isCopied ? 'Copied!' : 'Copy'}</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={80}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className='cursor-pointer'
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              className='cursor-pointer'
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>



      </div>
    </>
  )
}

export default App
