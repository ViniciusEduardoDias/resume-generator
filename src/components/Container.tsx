"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import StepSidebar from "./StepSidebar";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  const pathname = usePathname();
  const showSidebar =
    pathname !== "/" && pathname !== "/finalizar" && pathname !== "/download";

  return (
    <main className="w-full sm:w-3/4 lg:w-2/3 flex flex-col md:flex-row justify-center items-center md:items-start bg-slate-100 m-auto py-2">
      {showSidebar && (
        <aside className="w-64 mr-4">
          <StepSidebar />
        </aside>
      )}
      {children}
    </main>
  );
}
