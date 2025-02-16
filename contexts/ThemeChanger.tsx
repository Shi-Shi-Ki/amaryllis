"use client"
import { useContext } from "react"
import { CommonHeader } from "@/app/CommonHeader"
import { Session } from "next-auth"
import { ThemeContext } from "./ThemeProvider"
import { ThemeType } from "@/utils/CommonTypes"

export default function ThemeChanger({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  const { theme, changer } = useContext(ThemeContext)

  const handleToggle = (e: { target: { checked: boolean } }) => {
    console.log(`*** checked: ${e.target.checked}`)
    if (e.target.checked) {
      changer("dark")
    } else {
      changer("light")
    }
  }

  return (
    <>
      <div data-theme={theme}>
        <div className="navbar bg-base-300 w-full mb-5">
          <div className="mx-2 flex-1 px-2">
            Navbar Title {session && `(${session.user?.email})`}
          </div>
          <div className="flex-none">
            {session && <CommonHeader />}
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
