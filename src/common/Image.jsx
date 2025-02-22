import React from 'react'

const Image = props => {
  return (
    <div>
      {props.name && props.name === 'like' &&
        <img
          alt='Like'
          className={props.className}
          width={props.width || '100%'}
          height={props.height || '100%'}
          src='https://vk.com/reaction/1-reactions-0-96?c_uniq_tag=0a64c3d34d3a1368b05716ff24f94ff51b2257a2287957423ced36a00b020cb6'
        ></img>
      }
    </div>
  )
}

export default Image