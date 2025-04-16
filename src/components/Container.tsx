import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <main className="w-4/5 sm:w-3/4 lg:2/3 flex flex-col items-center bg-slate-100 m-auto py-2">
      {children}
    </main>
  );
}
