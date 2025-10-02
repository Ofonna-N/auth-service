"use client";
import TanstackQueryProvider from "./tanstackquery_provider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
}
