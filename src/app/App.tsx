import AppProviders from "@app/providers/AppProviders";
import AppRouter from "@app/router/AppRouter";
import { FeedbackWidget } from "@features/feedback";

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
      <FeedbackWidget />
    </AppProviders>
  );
}
