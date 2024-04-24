import MainHeader from "@/components/main-header/main-header";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
