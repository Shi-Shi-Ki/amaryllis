import "../globals.css"
import "material-icons/iconfont/material-icons.css"

export const metadata = {
  title: "Create Next App/dashboard",
  description: "dash board page",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
