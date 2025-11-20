import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/auth-context'
import { Toaster } from '@/components/ui/toaster'
import 'plyr/dist/plyr.css';

const geistSans = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata = {
  title: 'Netfree - Stream Your Favorite Movies & Shows',
  description: 'Watch unlimited movies and TV shows. Start your free trial today.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  generator: 'Radhe Software Solutions',
  keywords: [
    "movies",
    "web series",
    "free movies",
    "hd streaming",
    "latest films",
    "movie streaming website",
    "watch movies online",
    "free movies streaming",
    "HD movie player",
    "online web series",
    "best streaming platform",
    "watch latest movies",
    "online OTT platform",
    "Hollywood movies",
    "Bollywood movies",
    "South Indian movies",
    "dubbed movies online",
    "Hindi web series",
    "English web series",
    "action movies online",
    "thriller movies streaming",
    "comedy movies online",
    "horror movies in HD",
    "watch movies without ads",
    "HD quality streaming",
    "download movies online",
    "fast movie streaming",
    "online video player",
    "free full movies",
    "mobile movie streaming",
    "smart TV movies",
    "tablet movie player",
    "laptop streaming website",
    "top online movies",
    "trending films online",
    "new released movies",
    "watch OTT content free",
    "best movie website 2025",
  ],
  icons: {
    icon: [
      { url: "/hlogo.png", sizes: "32x32", type: "image/png" },
      { url: "/hlogo.png", sizes: "16x16", type: "image/png" }
    ],
    apple: "/hlogo.png"
  },
  openGraph: {
    title: "Watch HD Movies & Web Series Online – Fast & Free Streaming",
    description:
      "Enjoy unlimited movies and web series in Full HD. Stream the latest releases—Hollywood, Bollywood, South Indian, and dubbed content—on a fast and ad-free platform.",
    url: "https://netfree.com",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Movie Streaming Banner",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <html lang="en" suppressHydrationWarning>
    //   <body className={`${geistSans.className} bg-background`}>
    //     <AuthProvider>
    //       {children}
    //       <Toaster />
    //     </AuthProvider>
    //   </body>
    // </html>
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true} className={`${geistSans.className} bg-background`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>

  )
}
