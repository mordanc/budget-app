import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import budgetReducer from "../features/Budgets/budgetSlice";

export const store = configureStore({
  reducer: {
    budgets: budgetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
