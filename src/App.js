import "./App.css";
import { useReducer } from "react";

const ACTION = {
  IS_ACTIVE: "IS_ACTIVE",
  DEPOSIT: "DEPOSIT",
  WITHDRAW: "WITHDRAW",
  LOAN: "LOAN",
  PAY_LOAN: "PAY_LOAN",
  CLOSE: "CLOSE",
};

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.IS_ACTIVE:
      if (!state.isActive)
        return { ...state, isActive: action.payload, balance: 500 };
      return state;
    case ACTION.DEPOSIT:
      if (state.isActive) return { ...state, balance: state.balance + action.payload };
      return state;
    case ACTION.WITHDRAW:
      if (state.isActive && state.balance >= 50 ) return { ...state, balance: state.balance - action.payload };
      return state;
    case ACTION.LOAN:
      if (state.isActive && state.loan === 0)
        return {
          ...state,
          balance: state.balance + action.payload,
          loan: state.loan + action.payload,
        };
      return state;
    case ACTION.PAY_LOAN:
      if (state.isActive && state.loan !== 0)
        return {
          ...state,
          balance: state.balance - state.loan,
          loan: 0,
        };
      return state;
    case ACTION.CLOSE:
      if (state.isActive && state.loan === 0 && state.balance >= 0)
        return initialState;

      return state;
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);


  const {isActive, balance, loan} = state;

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: ${balance}</p>
      <p>Loan: ${loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: ACTION.IS_ACTIVE, payload: true })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ACTION.DEPOSIT, payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ACTION.WITHDRAW, payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ACTION.LOAN, payload: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ACTION.PAY_LOAN })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type: ACTION.CLOSE})} disabled={!isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}
