import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { apiHooks } from "~/utils/api";
import { M_PLUS_1 } from "next/font/google";
import "~/styles/globals.css";

// @see: https://fontawesome.com/docs/web/use-with/react/use-with
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import ThemeContextProvider from "~/components/ThemeContextProvider";
config.autoAddCss = false;

const mPlus1 = M_PLUS_1({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeContextProvider>
      <SessionProvider session={session}>
        <div className={mPlus1.className}>
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ThemeContextProvider>
  );
};

export default apiHooks.withTRPC(MyApp);
