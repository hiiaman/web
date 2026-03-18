import { Button } from "@shared/components/ui";

export default function GlobalErrorFallback() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
      <span className="text-6xl">⚠️</span>
      <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
      <p className="text-sm text-gray-500">An unexpected error occurred. Please refresh the page.</p>
      <Button onClick={() => window.location.reload()}>Reload page</Button>
    </div>
  );
}
