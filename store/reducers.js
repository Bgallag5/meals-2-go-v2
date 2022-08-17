export const reducer = (state, { type, payload }) => {
  let existingItem;
  let updatedItem;
  let existingCart = [];
  let updatedCart = [];

  const calcCartTotal = (items) => {
    let total = items.reduce((acc, cur) => {
      let discount = cur.categoryDiscount || cur.itemDiscount;
      //if no discount
      if (!discount) {
        let itemTotal = cur.price * Number(cur.quantity);
        return acc + itemTotal;
      }
      //if discount, apply to cart total
      else if (discount) {
        let itemTotal = Number(
          cur.price * Number(cur.quantity - 1) +
            cur.price * ((100 - discount) / 100)
        );
        return acc + itemTotal;
      }
    }, 0);
    return Number(total.toFixed(2));
  };

  const applyDeal = (items) => {
    let itemToDiscount = {
      price: 0,
    };
    let applicableItems;
    //if no deal return
    if (!state.deal.discountPercent) return items;

    //clear all properties containing previous discounts for all cartItems
    items.forEach((item) => {
      item.categoryDiscount = undefined;
      item.itemDiscount = undefined;
    });

    //if deal is a category or course deal, find highest priced item in cart and set discount
    if (state.deal.category || state.deal.course) {
      console.log("COURSE:CATEGORY");

      if (state.deal.category) {
        applicableItems = items.filter(
          (el) => el.category === state.deal.category
        );
      } else if (state.deal.course) {
        applicableItems = items.filter((el) => el.course === state.deal.course);
      }

      if (!applicableItems) return items;
      console.log(applicableItems);

      applicableItems.map((item) => {
        //find highest price out of all applicableItems
        if (item.price >= itemToDiscount.price) {
          itemToDiscount = item;
        }
      });
      //set either course or category discount as "categoryDiscount"
      itemToDiscount.categoryDiscount = state.deal.discountPercent;
      updatedCart = [...items];
      updatedCart[items.indexOf(itemToDiscount)] = itemToDiscount;
      return updatedCart;
    }

    //if deal is a course deal
    // else if (state.deal.course){
    //   //get cartItems with matching course
    //   let applicableItems = items.filter(
    //     (el) => el.course === state.deal.course
    //   );
    //   console.log(applicableItems);
    //   if (!applicableItems) return items;

    //   applicableItems.map((item) => {
    //     //find highest price out of all applicableItems
    //     if (
    //       item.price >= itemToDiscount.price
    //     ) {
    //       itemToDiscount = item;
    //     }
    //   });
    //   itemToDiscount.courseDiscount = state.deal.discountPercent;
    //   updatedCart = [...items];
    //   updatedCart[items.indexOf(itemToDiscount)] = itemToDiscount;
    //   return updatedCart;
    // }

    //if deal is an item deal, set itemDiscount on the item
    if (state.deal.itemId) {
      let applicableItem = items.find((item) => item.id == state.deal.itemId);
      if (!applicableItem) return items;
      applicableItem.itemDiscount = state.deal.discountPercent;

      updatedCart = [...items];
      updatedCart[items.indexOf(applicableItem)] = applicableItem;
    }
    return updatedCart;
  };

  //REDUCER
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
        if (state.deal.discountPercent) {
          applyDeal(updatedCart);
        }

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
        if (state.deal.discountPercent) {
          applyDeal(updatedCart);
        }

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

        if (state.deal.discountPercent) {
          applyDeal(updatedCart);
        }

        return {
          ...state,
          cartItems: updatedCart,
          totalAmount: calcCartTotal(updatedCart),
        };
      }

      updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
      updatedCart = [...existingCart];
      updatedCart[state.cartItems.indexOf(existingItem)] = updatedItem;

      if (state.deal.discountPercent) {
        applyDeal(updatedCart);
      }

      return {
        ...state,
        cartItems: updatedCart,
        totalAmount: calcCartTotal(updatedCart),
      };

    case "CLEAR_CART_ITEM":
      existingCart = [...state.cartItems];
      updatedCart = existingCart.filter((item) => item.id != payload);
      if (state.deal.discountPercent) {
        applyDeal(updatedCart);
      }

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

    case "ADD_DEAL":
      return {
        ...state,
        deal: {
          itemId: payload.itemId,
          discountPercent: payload.discountPercent,
          discountType: payload.discountType,
          category: payload.category,
          course: payload.course,
        },
      };

    case "SET_MENU_FILTER":
      return {
        ...state,
        menuFilter: payload,
      };

    case "TOGGLE_COOKIE":
      return {
        ...state,
        userCookie: true,
      };

      case "TOGGLE_LOADING":
        console.log(payload);
        return {
          ...state,
          loading: payload
        }

        case "CLEAR_STATE":
          return {
            ...payload
          }
  }
};
