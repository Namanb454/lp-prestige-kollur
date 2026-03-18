import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prestige Kollur",
  description:
    "Experience unparalleled luxury at Prestige Kollur – premium 2, 3 & 4 BHK residences in Kollur, Hyderabad. World-class amenities, breathtaking views, and an address that defines elegance.",
  keywords:
    "Prestige Kollur, luxury apartments Hyderabad, Prestige Group, Kollur, premium residences, real estate Hyderabad",
  openGraph: {
    title: "Prestige Kollur Hyderabad",
    description:
      "Experience unparalleled luxury at Prestige Kollur – premium residences in Kollur, Hyderabad.",
    type: "website",
  },
  icons: {
    icon: "/images/fav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17399506442"
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17399506442');
        `}
      </Script>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1895245891110947');
          fbq('track', 'PageView');
        `}
      </Script>
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="anonymous" />
        <link rel="preload" href="/images/buildingbg.webp" as="image" fetchPriority="high" />
      </head>
      <body className="antialiased" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1895245891110947&ev=PageView&noscript=1"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
