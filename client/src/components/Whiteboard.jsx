import React, { useEffect, useRef, useState } from 'react'
import { FaPencil } from "react-icons/fa6";
import { FaEraser } from "react-icons/fa";


const Whiteboard = () => {
    const myRef=useRef(null)
    const isDrawing=useRef(false)
    const [tool,setTool]=useState('pen')

    useEffect(()=>{
       console.log(myRef.current)
       const ctx=myRef.current.getContext('2d')
       console.log('context',ctx)
    },[])

    const startDrawing=(e)=>{
        isDrawing.current=true
        const ctx=myRef.current.getContext('2d')
            const rect = myRef.current.getBoundingClientRect();
            const scaleX = myRef.current.width / rect.width;
            const scaleY = myRef.current.height / rect.height;
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;
        if(tool=='erase'){
            ctx.globalCompositeOperation='destination-out'
            ctx.lineWidth=15
        }else{
        ctx.globalCompositeOperation = 'source-over'; 
        ctx.strokeStyle = 'black';
        ctx.lineWidth=1
        }
     
        ctx.beginPath()
        ctx.moveTo(x,y)

    }
    const draw=(e)=>{
        if(!isDrawing.current) return;
        const ctx=myRef.current.getContext('2d')
        const rect = myRef.current.getBoundingClientRect();
        const scaleX = myRef.current.width / rect.width;
        const scaleY = myRef.current.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        ctx.lineTo(x,y)
        ctx.stroke()
    }
    const stopDrawing=(e)=>{
        isDrawing.current=false
        const ctx=myRef.current.getContext('2d')
        ctx.closePath()
    }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-3'>
    <div className='min-w-24 w-[10%] flex justify-between text-3xl px-5 py-2.5 bg-blue-300 rounded-md gap-4'>
        <FaPencil onClick={()=>setTool('pen')} className={`cursor-pointer ${tool=='pen'?'bg-white rounded-md p-1':''}`}/>
        <FaEraser onClick={()=>setTool('erase')} className={`cursor-pointer ${tool=='erase'?'bg-white rounded-md p-1':''}`}/>
    </div>
    <div className='flex items-center justify-center'>
        <canvas onMouseDown={startDrawing} onMouseMove={draw} onMouseLeave={stopDrawing} onMouseUp={stopDrawing} ref={myRef} className='w-[900px] h-[600px] border-2 bg-white rounded-md'></canvas>
    </div>
    </div>
  )
}

export default Whiteboard