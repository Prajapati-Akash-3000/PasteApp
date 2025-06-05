import { createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from 'react-hot-toast';

//satet of pastes
const initialState = {
  pastes: localStorage.getItem("pastes")  //pastes is a value name
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",  //Slice Name
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      const titles = state.pastes.map(p => p.title);  //Extract all the titles from the data
      if(titles.includes(paste.title)){  //add a check -> paste already exist
        toast.error("Already Exist", {
          position: 'top-right',
        });
      }
      else {
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Created Successfully", {
          position: 'top-right'
        });
      }
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item)=> item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated", {
          position: 'top-right'
        });
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];

      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if(index >= 0) {
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste deleted", {
          position: 'top-right'
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
