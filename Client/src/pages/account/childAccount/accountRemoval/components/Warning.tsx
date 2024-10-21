import React from 'react'
import AppIcons from '../../../../../components/ui/icon';

function Warning({title, describe}) {
  return (
    <div className='my-3'>
      <div className='flex gap-2'>
      <AppIcons.WarningIcon/>
      <h3 className='text-red-500 font-bold'>{title} </h3> 
      </div>
        <p>
        {describe}
        </p>
    </div>
  )
}

export default Warning