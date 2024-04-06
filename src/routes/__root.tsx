import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import React, { Suspense } from "react";
import Navbar from "../components/layout/Navbar";
import { twMerge } from "tailwind-merge";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

export const Route = createRootRoute({
  component: App,
});

function App() {
  const router = useRouterState();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <main
        className={twMerge(
          "bg-white min-h-screen",
          router.location.pathname === "/" && "bg-lightGreen"
        )}
      >
        <div>
          <Navbar />
        </div>
        <section className="container mx-auto px-6 ">
          <Outlet />
        </section>
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </main>
    </QueryClientProvider>
  );
}
