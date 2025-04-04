import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../types/hooks";
import { selectUser } from "../services/reducers";
import { selectIsProfileLoading } from "../services/reducers/profileSlice";
import { fetchUserProfile } from "../services/reducers/profileSlice";

export const useProfileData = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const isLoading = useAppSelector(selectIsProfileLoading);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (!user && !savedUser && !isFetching) {
        setIsFetching(true);
        dispatch(fetchUserProfile()).finally(() => setIsFetching(false));
        }
    }, [dispatch, user, isFetching]);

    return { user, isLoading, isFetching };
};
