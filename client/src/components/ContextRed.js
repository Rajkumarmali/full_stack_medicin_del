import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, img: action.img }];

      case "REMOVE":
        const newArr = [...state]
        newArr.splice(action.index, 1)
        return newArr;

        case 'ADD_APPOINTMENT':
            return {
                ...state,
                appointments: [...state.appointments, action.doctor]
            };

        case "DROP":
          const empArray = []
          return empArray
    default:
      return state;
  }
};

export const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

