import { SideNav } from "./components/SideBar";

// Layout component for protected routes
export const ProtectedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
};
