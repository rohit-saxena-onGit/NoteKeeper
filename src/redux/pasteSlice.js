import { createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";

let savedPastes = [];
try {
  const stored = localStorage.getItem("pastes");
  savedPastes = stored ? JSON.parse(stored) : [];
} catch (error) {
  console.error("Failed to parse pastes from localStorage:", error);
  localStorage.removeItem("pastes"); // clear corrupted data
  savedPastes = [];
}

const initialState = {
  pastes: savedPastes,
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("paste Created Successfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated");
      }
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste deleted");
      }
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
