import React, { useReducer } from "react";
import { reducer } from "./reducers";
import { menu } from "../pages/api/dummy-data";

export const GlobalContext = React.createContext();

const preLoadedState = {
  cartItems: [],
  totalAmount: "",
  menuItems: menu,
  menuFilter: undefined,
  deal: {
    itemId: undefined,
    discountPercent: undefined,
    discountType: undefined,
    category: undefined,
    course: undefined
  },
  cartModalOpen: false,
  searchResults: [],
  appMessage: {
    msg: undefined,
    timer: undefined,
    color: undefined,
    emoji: undefined,
  },
  user: {
    isLoggedIn: false,
    email: undefined,
    idToken: undefined,
  },
  userCookie: false,
  loading: false,
};

//create app context provider
const Provider = (props) => {
  //declare state as a reducer
  const [state, dispatch] = useReducer(reducer, preLoadedState);
  
  //WRITE ALL FUNCTIONS TO DISPATCH STATE UPDATES HERE
  
  const setAppMessage = (msg, timer, emoji) => {
      dispatch({type: 'SET_APP_MESSAGE', payload: {msg, timer, emoji}})
    }
    const clearAppMessage = () => {
        dispatch({type: 'CLEAR_APP_MESSAGE'})
    }
    const addToCart = (item, quantity) => {
        dispatch({type: 'ADD_TO_CART', payload: {item, quantity}});
      }
    const decrementCartItem = (id) => {
        dispatch({type: "DECREMENT_ITEM_QUANTITY", payload: id})
    }
    const toggleCartModal = (cartIsOpen) => {
        dispatch({type: "TOGGLE_CART_MODAL", payload: cartIsOpen})
    }
    const deleteCartItem = (id) => {
        dispatch({type: 'CLEAR_CART_ITEM', payload: id})
    }
    const setDeal = (deal) => {
      dispatch({type: 'ADD_DEAL', payload: deal});
      dispatch({type: 'SET_APP_MESSAGE', payload: {msg: 'Deal Claimed', timer: 2, emoji: "👍"}})
    }
    const setMenuFilter = (filter) => {
      dispatch({type: 'SET_MENU_FILTER', payload: filter})
    }
    const toggleCookie = () => {
      dispatch({type: "TOGGLE_COOKIE"})
    }
    const toggleLoading = (isLoading) => {
      dispatch({type: "TOGGLE_LOADING", payload: isLoading})
    }
    const clearState = () => {
      dispatch({type: "CLEAR_STATE", payload: preLoadedState})
    }
    

    //define app context values - state and global functions
    const appContext = {
        //state
      cartItems: state.cartItems,
      totalAmount: state.totalAmount,
      cartModalOpen: state.cartModalOpen,
      menuItems: state.menuItems,
      appMessage: state.appMessage,
      user: state.user,
      deal: state.deal,
      menuFilter: state.menuFilter,
      userCookie: state.userCookie,
      loading: state.loading,
      //store dispatch functions
      addToCart,
      setAppMessage,
      clearAppMessage,
      decrementCartItem,
      toggleCartModal,
      deleteCartItem,
      setDeal,
      setMenuFilter,
      toggleCookie,
      toggleLoading,
      clearState,
      //helper functions
    };


  return (
    <GlobalContext.Provider value={appContext}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default Provider;
