import { Outlet } from "react-router-dom";
import { PageHeader } from "../page-header";
import { PageFooter } from "../page-footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <PageFooter />
    </div>
  );
}
