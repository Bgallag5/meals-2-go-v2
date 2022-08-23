import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SidebarItem(props) {

    const {title, icon, path, handleNavigate} = props;

  return (
    <div onClick={() => handleNavigate(path)} className='h-10 px-2 flex flex-row gap-3 items-center cursor-pointer border-b border-black'>
       <FontAwesomeIcon className='w-10 ' icon={icon} /> <h2>{title}</h2>
    </div>
  )
}
