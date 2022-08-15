import React, {useContext} from 'react';
import Hero from '../components/Hero/Hero';
import Categories from '../components/Cards/Categories';
import TopRatedItems from '../components/TopRatedItems/TopRatedItems';
import Deals from '../components/DealsSlider/Deals';


//Homepage
export default function Home(props) {

  return (
    <div className='page__container'>
      <Hero />
      <Categories />
      <TopRatedItems />
      <Deals />
    </div>
  )
}

// //getStaticProps to call our data.js and set state
// export async function getStaticProps(context){


//   console.log(menu);

//   return {
//     props: {
//       menu: menu,
//     }
//   }
// }
