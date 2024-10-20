import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ConfigProvider } from "antd";
// import { dark } from "@clerk/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#70297a",
            borderRadius: 5,
            fontFamily: "Segoe UI Symbol",
            fontSize: 14,
          },
        }}
      >
        <ClerkProvider
          // appearance={{
          //   baseTheme: dark,
          // }}
          publishableKey={PUBLISHABLE_KEY}
          afterSignOutUrl="/"
        >
          <Provider store={store}>
            <App />
          </Provider>
        </ClerkProvider>
      </ConfigProvider>
    </StrictMode>
  </BrowserRouter>
);
