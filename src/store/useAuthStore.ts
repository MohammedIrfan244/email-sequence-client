import {create} from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useAuthStore = create<AuthState>((set)=>({
    token:localStorage.getItem('token') || null,
    isAuthenticated: localStorage.getItem('token') !== null,
    setToken: (token: string) => {
      localStorage.setItem('token', token);
      set({ token, isAuthenticated: true });
    },
    clearToken: () => {
      localStorage.removeItem('token');
      set({ token: null, isAuthenticated: false });
    },
}))

export default useAuthStore;