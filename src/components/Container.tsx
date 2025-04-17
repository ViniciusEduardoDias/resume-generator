"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import StepSidebar from "./StepSidebar";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/" && pathname !== "/finalizar";

  return (
    <main className="w-4/5 sm:w-3/4 lg:2/3 flex items-start bg-slate-100 m-auto py-2">
      {showSidebar && (
        <aside className="w-64 mr-4">
          <StepSidebar />
        </aside>
      )}
      {children}
    </main>
  );
}
