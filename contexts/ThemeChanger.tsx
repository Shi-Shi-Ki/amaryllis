"use client"
import { useContext } from "react"
import { CommonHeader } from "@/app/CommonHeader"
import { ThemeContext } from "./ThemeProvider"
import { ThemeType } from "@/utils/CommonTypes"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"

export default function ThemeChanger({ children }: { children: React.ReactNode }) {
  const { theme, changer } = useContext(ThemeContext)

  const handleToggle = (e: { target: { checked: boolean } }) => {
    if (e.target.checked) {
      changer(ThemeType.DARK)
    } else {
      changer(ThemeType.LIGHT)
    }
  }

  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin")
    }
  }, [isAuthenticated, router])

  // ログイン済みの場合はコンテンツを表示
  // if (!isAuthenticated) {
  //   console.log("* ThemeChanger isAuthenticated.")
  //   return null // リダイレクトが完了するまで何も表示しない
  // }

  return (
    <>
      <div data-theme={theme}>
        <div className="navbar bg-base-300 w-full mb-5">
          <div className="mx-2 flex-1 px-2">Navbar Title ({user && user.email})</div>
          <div className="flex-none">
            {<CommonHeader />}
            <label className="swap swap-rotate btn btn-circle btn-sm m-2">
              <input type="checkbox" checked={theme === ThemeType.DARK} onChange={handleToggle} />
              <span className="swap-off material-icons">light_mode</span>
              <span className="swap-on material-icons">dark_mode</span>
            </label>
          </div>
        </div>
        {/* Page content here */}
        {children}
      </div>
    </>
  )
}
