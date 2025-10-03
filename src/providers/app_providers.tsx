"use client";
import TanstackQueryProvider from "./tanstackquery_provider";
import MuiProvider from "./mui_provider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MuiProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </MuiProvider>
  );
}
