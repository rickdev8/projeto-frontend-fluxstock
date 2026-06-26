
import Menu from "@/app/components/menus/Menu";
import { AuthProvider } from "../context/context";
import { GetServerSideProps } from "next";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div style={{ display: "flex" }}>
        <Menu />
        <main style={{ flex: 1 }}>{children}</main>
      </div>
    </AuthProvider>
  );
}


