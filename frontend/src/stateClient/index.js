  import { createSlice } from "@reduxjs/toolkit";

  // set the default mode 'sombre' et la fonction de toggle mode
  const initialState = {
    mode: "light",
    userId: "662ffa5fd8f49e6d706ba48e",
  };

  export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
      setMode: (state) => {
        state.mode = state.mode === "light" ? "dark" : "light";
      },
    },
  });

  export const { setMode } = globalSlice.actions;

  export default globalSlice.reducer;