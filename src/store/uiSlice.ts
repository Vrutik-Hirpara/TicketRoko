import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  modalType: string | null;
}

const initialState: UIState = {
  isSidebarOpen: false,
  isModalOpen: false,
  modalType: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setModal: (state, action: PayloadAction<{ isOpen: boolean; type?: string }>) => {
      state.isModalOpen = action.payload.isOpen;
      state.modalType = action.payload.type || null;
    },
  },
});

export const { toggleSidebar, setModal } = uiSlice.actions;
export default uiSlice.reducer;
