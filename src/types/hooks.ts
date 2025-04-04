import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import type { AppDispatch } from '../services/store';
import { RootState } from '../services/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
