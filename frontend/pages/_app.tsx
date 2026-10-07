import "@/styles/globals.css";
import "@/styles/assets/css/bootstrap.min.css";
import "@/styles/assets/css/all-fontawesome.min.css";
import "@/styles/assets/css/feather.min.css";
import "@/styles/assets/css/animate.min.css";
import "@/styles/assets/css/magnific-popup.min.css";
import "@/styles/assets/css/amplitude.css";
import "@/styles/assets/css/style.css";
import type { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
