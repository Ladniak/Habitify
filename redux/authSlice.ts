import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Тип користувача для Redux
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

// Тип стану авторизації
interface AuthState {
  user: User | null;
  loading: boolean;
}

// Початковий стан
const initialState: AuthState = {
  user: null,
  loading: true,
};

// Створюємо slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
    },
  },
});

// Експортуємо дії та редʼюсер
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
