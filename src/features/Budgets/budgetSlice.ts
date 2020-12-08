import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

type Budget = {
  title: string;
  maxBudget: number;
};

interface CounterState {
  value: number;
  budgets: Budget[];
}

const initialState: CounterState = {
  value: 0,
  budgets: [],
};

export const budgetSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addBudget: (state, action: PayloadAction<Budget>) => {
      return { ...state, budgets: [...state.budgets, action.payload] };
    },
    removeBudget: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        budgets: [
          ...state.budgets.filter((budget) => budget.title !== action.payload),
        ],
      };
    },
    editBudgetAmount: (state, action: PayloadAction<Budget>) => {
      const { title, maxBudget } = action.payload;
      const newBudgets = state.budgets.map((budget) => {
        if (budget.title === title) {
          return { ...budget, maxBudget };
        }
        return budget;
      });
      return {
        ...state,
        budgets: newBudgets,
      };
    },
  },
});

export const {
  addBudget,
  removeBudget,
  editBudgetAmount,
} = budgetSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectCount = (state: RootState) => state.counter.value;

export const selectBudgets = (state: RootState) => state.budgets.budgets;

export default budgetSlice.reducer;
