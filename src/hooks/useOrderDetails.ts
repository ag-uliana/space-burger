import { useParams, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { fetchIngredients } from "../services/reducers";
import { useAppDispatch, useAppSelector } from "../types/hooks";

export function useOrderDetails() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const ingredientsData = useAppSelector(state => state.ingredients.items);
  const feedOrders = useAppSelector(state => state.feed.orders || []);
  const profileOrders = useAppSelector(state => state.profileFeed.orders || []);

  const isProfileOrder = location.pathname.startsWith('/profile/orders');
  const orders = isProfileOrder ? profileOrders : feedOrders;
  const order = orders.find(o => o._id === id);

  useEffect(() => {
    if (ingredientsData.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredientsData.length]);

  const ingredientMap = useMemo(() => {
    return ingredientsData.reduce((acc, item) => {
      acc[item._id] = item;
      return acc;
    }, {} as Record<string, typeof ingredientsData[number]>);
  }, [ingredientsData]);

  const ingredientCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    if (order) {
      for (const id of order.ingredients) {
        counts[id] = (counts[id] || 0) + 1;
      }
    }
    return counts;
  }, [order]);

  const ingredients = useMemo(() => {
    if (!order) return [];
    return order.ingredients
      .map(id => ingredientMap[id])
      .filter(Boolean);
  }, [order, ingredientMap]);

  const totalPrice = useMemo(() => {
    return Object.entries(ingredientCounts).reduce((sum, [id, count]) => {
      const item = ingredientMap[id];
      return sum + (item ? item.price * count : 0);
    }, 0);
  }, [ingredientCounts, ingredientMap]);

  return {
    order,
    ingredients,
    ingredientCounts,
    ingredientMap,
    totalPrice,
    isLoading: !order || ingredientsData.length === 0,
  };
}
