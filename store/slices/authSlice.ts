// file: store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = { 
  token: string | null; 
  email: string | null; 
  name: string | null;
  isAuthenticated: boolean;
};

const getInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    const email = localStorage.getItem('auth_email');
    const name = localStorage.getItem('auth_name');
    return {
      token,
      email,
      name,
      isAuthenticated: !!token
    };
  }
  return { token: null, email: null, name: null, isAuthenticated: false };
};

const initialState: AuthState = getInitialState();

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string; email: string; name: string }>) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isAuthenticated = true;
      
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', action.payload.token);
        localStorage.setItem('auth_email', action.payload.email);
        localStorage.setItem('auth_name', action.payload.name);
      }
    },
    logout(state) {
      state.token = null;
      state.email = null;
      state.name = null;
      state.isAuthenticated = false;
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_email');
        localStorage.removeItem('auth_name');
      }
    },
  },
});
export const { setCredentials, logout } = slice.actions;
export const authReducer = slice.reducer;
