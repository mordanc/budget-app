import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

type Budget = {
  title: string;
  maxBudget: number;
  history?: string[];
};

interface BudgetState {
  value: number;
  budgets: Budget[];
  selectedBudget: Budget | null;
}

const initialState: BudgetState = {
  value: 0,
  budgets: [],
  selectedBudget: null,
};

export const budgetSlice = createSlice({
  name: "budget",
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

    selectBudget: (state, action: PayloadAction<Budget>) => {
      const { title } = action.payload || {};
      const selectedBudget =
        state.budgets.find((budget) => budget.title === title) || null;

      return {
        ...state,
        selectedBudget,
      };
    },
  },
});

export const {
  addBudget,
  removeBudget,
  editBudgetAmount,
  selectBudget,
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

export const selectBudgets = (state: RootState) => state.budgets.budgets;

export const selectBudgetTitles = (state: RootState) =>
  state.budgets.budgets.map(({ title }) => title);

export const selectCurrentBudget = (state: RootState) =>
  state.budgets.selectedBudget;

export default budgetSlice.reducer;
