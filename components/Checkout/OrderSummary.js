import React, {useContext} from 'react';
import { GlobalContext } from '../../store/GlobalStore';
import CartItem from '../Cart/CartItem';


export default function OrderSummary() {

    const {totalAmount, cartItems, deal} = useContext(GlobalContext);



  return (
    <div className='w-full h-auto flex flex-col'>
        {cartItems && cartItems.map(item => {
            return(
                <CartItem item={item} />
            );
        })}
        <div>
        <span className='flex flex-row gap-4 w-full items-center justify-center h-32 text-3xl'>
            Total: <h2 className='text-orange-600'>${Number(totalAmount).toFixed(2)}
                </h2>
            </span>
        </div>
    </div>
  )
}
