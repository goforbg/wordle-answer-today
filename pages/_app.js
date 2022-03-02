import '../styles/globals.css'
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Script
            async
            strategy="afterInteractive"
            src="https://goforbg-analytics.vercel.app/tracker.js"
            data-ackee-server="https://goforbg-analytics.vercel.app"
            data-ackee-domain-id="0210cc2a-6c3e-4317-ad63-56669fd96c93"
        />
      <Component {...pageProps} />
        </>
        )
}

export default MyApp
