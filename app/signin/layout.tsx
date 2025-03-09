import "../globals.css"
import "material-icons/iconfont/material-icons.css"

export const metadata = {
  title: "Create Next App/signin",
  description: "sign in page",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="card mx-auto w-full max-w-5xl shadow-xl">
      <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">{children}</div>
    </div>
  )
}
