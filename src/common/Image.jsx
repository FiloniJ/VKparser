import React from 'react'

const urls = {
  like: 'https://vk.com/reaction/1-reactions-0-96?c_uniq_tag=0a64c3d34d3a1368b05716ff24f94ff51b2257a2287957423ced36a00b020cb6',
  comment: './media/comment-icon.png'
}

const Image = props => {
  return (
    <div className='flex align-middle'>
      {props.name &&
        <img
          alt={props.name}
          className={`object-contain ${props.className}`}
          width={props.width || '100%'}
          height={props.height || '100%'}
          src={`${urls[props.name]}`}
        ></img>
      }
    </div>
  )
}

export default Image