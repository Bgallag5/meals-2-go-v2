export const reducer = (state, { type, payload }) => {
  let existingItem;
  let updatedItem;
  let existingCart = [];
  let updatedCart = [];

  const calcCartTotal = (items) => {
    let total = items.reduce((acc, cur) => {
      let discount = cur.categoryDiscount || cur.itemDiscount;
      if (!discount) {
        let itemTotal =
          Number(cur.price.replace("$", "")) * Number(cur.quantity);
        return acc + itemTotal;
      } else if (discount) {
        let itemTotal = Number(
          cur.price.replace("$", "") * Number(cur.quantity - 1) +
            cur.price.replace("$", "") * ((100 - discount) / 100)
        );
        return acc + itemTotal;
      }
    }, 0);
    console.log("TOTAL");
    console.log(total);
    return Number(total.toFixed(2));
  };

  const applyDeal = (items) => {
    let itemToDiscount = {
      price: "$0",
    };
    //if no deal return
    if (!state.deal) return items;
    console.log("HAVE A DEAL");

    //clear all properties containing previous discounts for all cartItems
    items.forEach((item) => {
      item.categoryDiscount = undefined;
      item.itemDiscount = undefined;
    });

    //if deal is a category deal, find one item in catgory and set discount
    if (state.deal.category) {
      let applicableItems = items.filter(
        (el) => el.category === state.deal.category
      );
      // console.log(applicableItems);
      applicableItems.map((item) => {
        //clear discount on all items
        item.categoryDiscount = undefined;
        //find highest price of all applicableItems
        if (
          Number(item.price.replace("$", "")) >
          Number(itemToDiscount.price.replace("$", ""))
        ) {
          itemToDiscount = item;
        }
      });
      if (!itemToDiscount) return items;
      itemToDiscount.categoryDiscount = state.deal.discountPercent;
      updatedCart = [...items];
      updatedCart[items.indexOf(itemToDiscount)] = itemToDiscount;
      return updatedCart;
    }
    //if deal is an item deal, set itemDiscount on the item
    else if (state.deal.itemId) {
      let applicableItem = items.find((item) => item.id == state.deal.itemId);
      if (!applicableItem) return items;
      applicableItem.itemDiscount = state.deal.discountPercent;

      updatedCart = [...items];
      updatedCart[items.indexOf(applicableItem)] = applicableItem;
      return updatedCart;
    }
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
        if (state.deal){
          applyDeal(updatedCart)
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
        if (state.deal){
          applyDeal(updatedCart)
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

        if (state.deal){
          applyDeal(updatedCart)
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

      return {
        ...state,
        cartItems: applyDeal(updatedCart),
        totalAmount: calcCartTotal(updatedCart),
      };

    case "CLEAR_CART_ITEM":
      existingCart = [...state.cartItems];
      updatedCart = existingCart.filter((item) => item.id != payload);
      if (state.deal){
        applyDeal(updatedCart)
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
        },
      };
  }
};
