import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../services/store";
import { fetchUserProfile } from "../services/reducers/profileSlice";

export const useProfileData = () => {
const dispatch = useDispatch<AppDispatch>();
const user = useSelector((state: RootState) => state.auth.user);
const isLoading = useSelector((state: RootState) => state.profile.isLoading);
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
