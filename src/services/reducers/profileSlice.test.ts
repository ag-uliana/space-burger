import profileReducer, {
  fetchUserProfile,
  updateUserProfile,
  initialState
} from './profileSlice';
import type { ProfileState, UserProfile } from './profileSlice';
import { describe, it, expect } from 'vitest';

const mockUser: UserProfile = {
  email: 'user@example.com',
  name: 'John Doe',
};

describe('profileSlice', () => {
  it('возвращает начальное состояние', () => {
    const result = profileReducer(undefined, { type: '@@INIT' });
    expect(result).toEqual(initialState);
  });

  it('обрабатывает fetchUserProfile.pending', () => {
    const result = profileReducer(initialState, {
      type: fetchUserProfile.pending.type,
    });
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('обрабатывает fetchUserProfile.fulfilled', () => {
    const result = profileReducer(initialState, {
      type: fetchUserProfile.fulfilled.type,
      payload: mockUser,
    });
    expect(result.isLoading).toBe(false);
    expect(result.user).toEqual(mockUser);
  });

  it('обрабатывает fetchUserProfile.rejected', () => {
    const error = 'Ошибка запроса';
    const result = profileReducer(initialState, {
      type: fetchUserProfile.rejected.type,
      payload: error,
    });
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe(error);
  });

  it('обрабатывает updateUserProfile.fulfilled', () => {
    const startState: ProfileState = {
      user: { ...mockUser },
      isLoading: false,
      error: null,
    };

    const result = profileReducer(startState, {
      type: updateUserProfile.fulfilled.type,
      payload: { name: 'Updated Name' },
    });

    expect(result.user).toEqual({
      email: mockUser.email,
      name: 'Updated Name',
    });
  });

  it('не обновляет user при updateUserProfile.fulfilled, если user = null', () => {
    const result = profileReducer(initialState, {
      type: updateUserProfile.fulfilled.type,
      payload: { name: 'WillNotSet' },
    });

    expect(result.user).toBeNull();
  });
});
