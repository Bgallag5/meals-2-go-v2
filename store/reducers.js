export const reducer = (state, { type, payload }) => {
  let existingItem;
  let updatedItem;
  let existingCart = [];
  let updatedCart = [];

  const calcCartTotal = (items) => {
    let total = items.reduce((acc, cur) => {
      let itemTotal = Number(cur.price.replace("$", "")) * Number(cur.quantity);
      return acc + itemTotal;
    }, 0);
    console.log('TOTAL');
    console.log(total);
    return Number(total.toFixed(2));
  };

  switch (type) {
    default:
      return { ...state };

    case "ADD_TO_CART":
      /*
        dont know why this works:
        - the payload passed in is only the item.id
        - but here the payload is somehow the entire item{}? Dont know why. 
        console.log(payload);
        */

      //get copy of cartItems
      existingCart = [...state.cartItems];
      //search for matching cartItem by id
      existingItem = existingCart.find((el) => el.id == payload.item.id);
      //if no existing item return
      if (!existingItem) {
        //create new object to add quantity
        let newItem = { ...payload.item, quantity: payload.quantity };
        updatedCart = [...state.cartItems, newItem];
        return {
          ...state,
          cartItems: updatedCart,
          totalAmount: calcCartTotal(updatedCart),
        };
      } else if (existingItem) {
        //if item exists increment quantity
        updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + payload.quantity,
        };
        //save cartItems with updated item
        updatedCart = [...existingCart];
        updatedCart[state.cartItems.indexOf(existingItem)] = updatedItem;
        return {
          ...state,
          cartItems: updatedCart,
          totalAmount: calcCartTotal(updatedCart),
        };
      }

    case "SET_APP_MESSAGE":
      const { msg, timer, emoji } = payload;
      return {
        ...state,
        appMessage: {
          msg,
          timer,
          emoji,
        },
      };

    case "CLEAR_APP_MESSAGE":
      return {
        ...state,
        appMessage: {
          msg: "",
          timer: "",
          emoji: "",
        },
      };

    case "DECREMENT_ITEM_QUANTITY":
      //copy cart and find existing item
      existingCart = [...state.cartItems];
      existingItem = existingCart.find((item) => item.id == payload);

      if (!existingItem) {
        return {
          ...state,
        };
      }
      //if decrementing to 0, remove item entirely
      if (existingItem.quantity === 1) {
        updatedCart = existingCart.filter((item) => item.id != payload);

        return {
          ...state,
          cartItems: updatedCart,
          totalAmount: calcCartTotal(updatedCart),
        };
      }

      updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
      updatedCart = [...existingCart];
      updatedCart[state.cartItems.indexOf(existingItem)] = updatedItem;

      return {
        ...state,
        cartItems: updatedCart,
        totalAmount: calcCartTotal(updatedCart),
      };

    case "CLEAR_CART_ITEM":
      existingCart = [...state.cartItems];
      updatedCart = existingCart.filter((item) => item.id != payload);

      return {
        ...state,
        cartItems: updatedCart,
        totalAmount: calcCartTotal(updatedCart),
      };

    case "TOGGLE_CART_MODAL":
      return {
        ...state,
        cartModalOpen: payload,
      };

      case 'ADD_DEAL':

      return {
        ...state,
        deal: {
          itemId: payload.itemId,
          discountPercent: payload.discountPercent
        }
      }
  }
};
