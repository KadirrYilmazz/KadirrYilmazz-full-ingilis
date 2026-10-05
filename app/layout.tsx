import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata={title:"FULL İNGİLİŞ — LGS Kelime",description:"LGS İngilizce kelimelerini görsel hafıza, tekrar ve testlerle öğren."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body>{children}</body></html>}