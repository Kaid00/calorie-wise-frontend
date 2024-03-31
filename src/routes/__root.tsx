import { createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import Navbar from "../components/layout/Navbar";

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
  component: () => (
    <main className="bg-lightGreen min-h-screen">
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
  ),
});
