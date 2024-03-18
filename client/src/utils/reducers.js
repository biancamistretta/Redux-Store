import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    // Update products in the state with new product data
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    // Add a product to the cart
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    // Add multiple products to the cart
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    // Update the quantity of a product in the cart
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    // Remove a product from the cart
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    // Clear the cart
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    // Toggle the cart open/close state
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    // Update the categories in the state with new category data
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    // Update the current category in the state
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    // Return the current state if the action type doesn't match any cases
    default:
      return state;
  }
};
