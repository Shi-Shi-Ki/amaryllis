"use client"
import * as CommonTypes from "@/utils/CommonTypes"
import BaseTextField from "@/components/atoms/BaseTextField"
import { useForm } from "react-hook-form"
import BaseFrame from "@/components/atoms/BaseFrame"
import Image from "next/image"
import BaseButton from "@/components/atoms/BaseButton"
import { useGoogleLogin } from "@react-oauth/google"
import { useAuth } from "@/components/AuthProvider"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Signin() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    userName: string
    password: string
  }>()

  const router = useRouter()
  const { isAuthenticated, login } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      console.log("route dashboard.")
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  // useGoogleLogin フックを使って認証フローを開始
  const googleLogin = useGoogleLogin({
    flow: "auth-code", // 認可コードフローを指定
    onSuccess: async (codeResponse) => {
      console.log("Auth Code:", codeResponse.code)
      try {
        // todo
        login({ email: "temp_user@example.com" })
      } catch (e) {
        console.error("Error sending code to API:", e)
        alert("ログイン処理中にエラーが発生しました。")
      }
    },
    onError: (errorResponse) => {
      console.error("Google Login Failed:", errorResponse)
      alert("Googleログインに失敗しました。")
    },
  })

  // ログイン済みの場合は、リダイレクトが完了するまで何も表示しない
  if (isAuthenticated) {
    console.log("* before login.")
    return null
  }

  return (
    <>
      <div>
        <form>
          <BaseFrame
            htmlForId="login-form"
            borderColor={CommonTypes.ColorType.PRIMARY}
            classes={["relative", "z-10"]}
          >
            <div className="flex flex-col items-center">
              <div>
                <h1 className="py-8 text-2xl">ログイン</h1>
              </div>
              <BaseTextField
                htmlForId="user-name"
                color={CommonTypes.ColorType.PRIMARY}
                widthSize={CommonTypes.SizeType.TINY}
                register={register("userName", {
                  required: "ユーザー名は必須です",
                })}
                placeholder="ユーザー名"
              />
              <BaseTextField
                htmlForId="password"
                color={CommonTypes.ColorType.PRIMARY}
                widthSize={CommonTypes.SizeType.TINY}
                register={register("password", {
                  required: "パスワードは必須です",
                  minLength: { value: 8, message: "8文字以上入力してください" },
                })}
                placeholder="パスワード"
                textType="password"
              />
              <div className="form-control w-full max-w-xs">
                <BaseButton
                  htmlForId="sign_in_button"
                  size={CommonTypes.SizeType.MEDIUM}
                  color={CommonTypes.ColorType.PRIMARY}
                  onClick={() => {}}
                >
                  sign in
                </BaseButton>
              </div>
              <div className="pt-2">
                <p>
                  ユーザー登録は&nbsp;
                  <a className="link link-primary" href="/signup">
                    こちら
                  </a>
                </p>
              </div>
            </div>
            <div className="pt-2 w-full">
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">OR</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
            </div>
            <div className="flex flex-col items-center py-2">
              <Image
                src="/google_icon.png"
                alt="google login"
                width={32}
                height={32}
                onClick={() => googleLogin()}
                priority
              />
            </div>
          </BaseFrame>
        </form>
      </div>
      <div className="relative h-full overflow-hidden">
        <Image
          src="/accounts/signin-signup_front.jpg"
          alt="signin signup front image"
          fill={true}
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
    </>
  )
}
