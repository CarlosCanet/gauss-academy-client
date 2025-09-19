// import "./instrument";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import * as Sentry from '@sentry/react'
import "./index.css";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router";
import { AuthWrapper } from "./context/auth.context.tsx";
import { ThemeWrapper } from "./context/theme.contex.tsx";

const container = document.getElementById("root")!;
// const root = createRoot(container, {
//   // Callback called when an error is thrown and not caught by an ErrorBoundary.
//   onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
//     console.warn('Uncaught error', error, errorInfo.componentStack);
//   }),
//   // Callback called when React catches an error in an ErrorBoundary.
//   onCaughtError: Sentry.reactErrorHandler(),
//   // Callback called when React automatically recovers from errors.
//   onRecoverableError: Sentry.reactErrorHandler(),
// });

const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthWrapper>
        <ThemeWrapper>
          <App />
        </ThemeWrapper>
      </AuthWrapper>
    </BrowserRouter>
  </StrictMode>
);
