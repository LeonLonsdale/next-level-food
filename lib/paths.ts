export const paths = {
  home: { label: "Home", path: "/" },
  meals: {
    root: { label: "Browse Meals", path: "/meals" },
    oneMeal: (slug: string) => `/meals/${slug}`,
    share: { label: "Share a recipe", path: "/meals/share" },
  },
  community: {
    root: { label: "Foodies Community", path: "/community" },
  },
};

export const navLinks = Object.values(paths)
  .map((link) => ("root" in link ? link.root : undefined))
  .filter((root) => root !== undefined);
