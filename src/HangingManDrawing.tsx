import React from 'react'

const HangingManDrawing:React.FC<{availableRetry: number}> = ({availableRetry}) => {
  return (
    <div className='hanging-man-container'>
      <div style={{
        width: '10px',
        backgroundColor: 'black',
        height: '60px',
        position: 'absolute',
        top: '0',
        right: '55px'
      }}></div>
      {availableRetry <= 5 && 
      <div style={{
        width: '50px',
        position: 'absolute',
        height: '50px',
        top: '60px',
        right: '25px',
        borderRadius:' 100%',
        border: '10px solid black'
      }}>
      </div>}

      {availableRetry <= 4 && 
      <div style={{
        width: '7px',
        height: '100px',
        backgroundColor: 'black',
        position: 'absolute',
        top: '120px',
        right: '55px'
      }}></div>}

{availableRetry <= 3 && 
<div style={{
        width: '100px',
        height: '10px',
        backgroundColor: 'black',
        position: 'absolute',
        top: '160px',
        right: '-40px',
        rotate: '-30deg',
        transformOrigin: 'top left'
      }}></div>
 } 
{availableRetry <= 2 && 

      <div style={{
        width: '100px',
        height: '10px',
        backgroundColor: 'black',
        position: 'absolute',
        top: '160px',
        right: '55px',
        rotate: '30deg',
        transformOrigin: 'top right'
      }}></div>}

{availableRetry <= 1 && 

<div style={{
        width: '80px',
        height: '10px',
        backgroundColor: 'black',
        position: 'absolute',
        top: '212px',
        right: '-25px',
        rotate: '50deg',
        transformOrigin: 'top left'
      }}></div>}
{availableRetry == 0 && 

<div style={{
        width: '80px',
        height: '10px',
        backgroundColor: 'black',
        position: 'absolute',
        top: '212px',
        right: '60px',
        rotate: '-50deg',
        transformOrigin: 'top right'
      }}></div>
    }

       <div style={{
        height: '10px',
        width: '150px',
        backgroundColor: 'black',
        marginLeft: '195px'
      }}></div>
      <div style={{
        width: '10px',
        height: '350px',
        backgroundColor: 'black',
        marginLeft: '195px'
      }}></div>
      <div style={{
        height: '10px',
        backgroundColor: 'black',
        width: '200px',
        marginLeft: '100px'
      }}></div>
    </div>
  )
}

export default HangingManDrawing
