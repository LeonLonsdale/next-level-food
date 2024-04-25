export const paths = {
  navigation: {
    home: { label: "Home", path: "/" },
    meals: { label: "Meals", path: "/meals" },
    community: { label: "Community", path: "/community" },
  },
  dynamic: {
    meal: { path: (mealId: string) => `/meals/${mealId}` },
  },
};
