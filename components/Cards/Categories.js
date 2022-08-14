import React from 'react';
import CategoryCard from './CategoryCard';

export default function Categories() {
  return (
    <div className='flex flex-col sm:flex-row gap-5 w-full h-auto overflow-hidden mb-8'>
        <CategoryCard category={"sandwich"} title={'Burgers'} img={'burger-2.jpg'} />
        <CategoryCard category={"pizza"} title={'Pizza'} img={'pizza-1.jpg'} />
        <CategoryCard category={"salad"} title={'Salads'} img={'salad-2.jpg'} />
    </div>
  )
}
