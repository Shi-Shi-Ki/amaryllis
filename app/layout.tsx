import "./globals.css"
import "material-icons/iconfont/material-icons.css"
import ThemeChanger from "@/contexts/ThemeChanger"
import NextAuthProvider from "@/providers/NextAuth"
import { auth } from "@/auth"
import ThemeProvider from "@/contexts/ThemeProvider"
import { cookies } from "next/headers"

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const theme = (await cookies()).get("theme")?.value ?? ""
  console.log("layout.tsx theme", theme)

  return (
    <html lang="ja">
      <body>
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <NextAuthProvider>
              <ThemeProvider selectedTheme={theme}>
                <ThemeChanger session={session}>
                  {/* Page content here */}
                  {children}
                </ThemeChanger>
              </ThemeProvider>
            </NextAuthProvider>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  )
}
