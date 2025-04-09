import authReducer, {
    updateAuthUser,
  } from './authSlice';
  
  import {
    register,
    login,
    logout,
    refreshToken,
  } from './authSlice';
  
  import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
  
  const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    error: null,
  };
  
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  describe('authReducer', () => {
    it('возвращает исходное состояние', () => {
      expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
    });
  
    it('обрабатывает updateAuthUser', () => {
      const newUser = { name: 'John', email: 'john@example.com' };
      const state = authReducer(initialState, updateAuthUser(newUser));
      expect(state.user).toEqual(newUser);
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(newUser));
    });
  
    describe('register', () => {
      it('обрабатывает register.pending', () => {
        const state = authReducer(initialState, { type: register.pending.type });
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
      });
  
      it('обрабатывает register.fulfilled', () => {
        const payload = {
          user: { email: 'john@example.com', name: 'John' },
          accessToken: 'token123',
          refreshToken: 'refresh123',
        };
        const state = authReducer(initialState, { type: register.fulfilled.type, payload });
        expect(state.isLoading).toBe(false);
        expect(state.user).toEqual(payload.user);
        expect(state.accessToken).toEqual('token123');
        expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'refresh123');
      });
  
      it('обрабатывает register.rejected', () => {
        const error = 'Ошибка регистрации';
        const state = authReducer(initialState, { type: register.rejected.type, payload: error });
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(error);
      });
    });
  
    describe('login', () => {
      it('обрабатывает login.pending', () => {
        const state = authReducer(initialState, { type: login.pending.type });
        expect(state.isLoading).toBe(true);
      });
  
      it('обрабатывает login.fulfilled', () => {
        const payload = {
          user: { email: 'john@example.com', name: 'John' },
          accessToken: 'token456',
          refreshToken: 'refresh456',
        };
        const state = authReducer(initialState, { type: login.fulfilled.type, payload });
        expect(state.isLoading).toBe(false);
        expect(state.user).toEqual(payload.user);
        expect(state.accessToken).toEqual('token456');
        expect(state.refreshToken).toEqual('refresh456');
      });
  
      it('обрабатывает login.rejected', () => {
        const error = 'Ошибка входа';
        const state = authReducer(initialState, { type: login.rejected.type, payload: error });
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(error);
      });
    });
  
    describe('logout', () => {
      it('обрабатывает logout.fulfilled', () => {
        const prevState = {
          ...initialState,
          user: { email: 'john@example.com', name: 'John' },
          accessToken: 'token',
          refreshToken: 'refresh',
        };
        const state = authReducer(prevState, { type: logout.fulfilled.type });
        expect(state.user).toBeNull();
        expect(state.accessToken).toBeNull();
        expect(state.refreshToken).toBeNull();
        expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
        expect(localStorage.removeItem).toHaveBeenCalledWith('user');
      });
  
      it('обрабатывает logout.rejected', () => {
        const error = 'Ошибка выхода';
        const state = authReducer(initialState, { type: logout.rejected.type, payload: error });
        expect(state.error).toBe(error);
      });
    });
  
    describe('refreshToken', () => {
      it('обрабатывает refreshToken.fulfilled', () => {
        const payload = {
          accessToken: 'newAccessToken',
          refreshToken: 'newRefreshToken',
        };
        const state = authReducer(initialState, { type: refreshToken.fulfilled.type, payload });
        expect(state.accessToken).toBe(payload.accessToken);
        expect(state.refreshToken).toBe(payload.refreshToken);
      });
  
      it('обрабатывает refreshToken.rejected', () => {
        const error = 'Ошибка обновления токена';
        const state = authReducer(initialState, { type: refreshToken.rejected.type, payload: error });
        expect(state.error).toBe(error);
      });
    });
  });
  
