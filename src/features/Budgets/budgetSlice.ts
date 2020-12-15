import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { AppThunk, RootState } from "../../app/store";

type BudgetHistory = {
  description: string;
  amount: number;
};

type Budget = {
  title: string;
  maxBudget: number;
  history?: BudgetHistory[];
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

    addBudgetHistory: (state, action: PayloadAction<any>) => {
      const { title, description, amount } = action.payload;

      const budgets = state.budgets.map((budget) => {
        if (budget.title === title) {
          return {
            ...budget,
            history: [...(budget.history || []), { description, amount }],
          };
        }
        return budget;
      });

      return { ...state, budgets };
    },
  },
});

export const {
  addBudget,
  removeBudget,
  editBudgetAmount,
  selectBudget,
  addBudgetHistory,
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

export const selectBudgetByName = (title) => (state: RootState) =>
  state.budgets.budgets.find((budget) => budget.title === title) || null;

export default budgetSlice.reducer;
