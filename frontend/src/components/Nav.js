import React from 'react';
//import data
import {nav} from '../data'

const Nav = () => {
  return <nav>
    <ul className='flex gap-x-10'>
      {nav.map((item,index)=>{
        //destructure item
        const {href , name} =item;
        return(
          <li key={index}>
            <a className= ' text-sm font-bodyfont hover:text-accent transition'
             href={href}>
              {name}
            </a>
          </li>
        );
      })}

    </ul>
  </nav>;
};

export default Nav;
