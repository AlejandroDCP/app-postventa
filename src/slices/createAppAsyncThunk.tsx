import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "../redux/store";

interface RejectedValue {
  data: unknown;
  error: boolean | string;
  message: string;
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: RejectedValue; // Mejor tipado para errores
}>();

export default createAppAsyncThunk;
