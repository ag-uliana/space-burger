import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../services/store";
import { selectUser } from "../services/reducers";
import { selectIsProfileLoading } from "../services/reducers/profileSlice";
import { fetchUserProfile } from "../services/reducers/profileSlice";

export const useProfileData = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUser);
    const isLoading = useSelector(selectIsProfileLoading);
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
