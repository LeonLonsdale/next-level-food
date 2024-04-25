export const paths = {
  home: { label: "Home", path: "/" },
  navigation: {
    meals: { label: "Browse Meals", path: "/meals" },
    community: { label: "Foodies Community", path: "/community" },
  },
  dynamic: {
    meal: { path: (mealId: string) => `/meals/${mealId}` },
  },
};
