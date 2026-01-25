"use client"
import * as CommonTypes from "@/utils/CommonTypes"
import TextField from "@/components/atoms/TextField"
import { useForm } from "react-hook-form"
import Frame from "@/components/atoms/Frame"
import Image from "next/image"
import Button from "@/components/atoms/Button"
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
    redirect_uri: "http://localhost:3000",
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
          <Frame colorType={CommonTypes.ColorType.PRIMARY} className={"relative z-10"}>
            <div className="flex flex-col items-center">
              <div>
                <h1 className="py-8 text-2xl">ログイン</h1>
              </div>
              <TextField
                colorType={CommonTypes.ColorType.PRIMARY}
                widthSizeType={CommonTypes.SizeType.TINY}
                register={register("userName", {
                  required: "ユーザー名は必須です",
                })}
                placeholder="ユーザー名"
              />
              <TextField
                colorType={CommonTypes.ColorType.PRIMARY}
                widthSizeType={CommonTypes.SizeType.TINY}
                register={register("password", {
                  required: "パスワードは必須です",
                  minLength: { value: 8, message: "8文字以上入力してください" },
                })}
                placeholder="パスワード"
                textType="password"
              />
              <div className="form-control flex flex-col items-center w-full max-w-xs py-8">
                <Button
                  sizeType={CommonTypes.SizeType.MEDIUM}
                  colorType={CommonTypes.ColorType.PRIMARY}
                  onClick={() => {}}
                  className={"w-full"}
                >
                  sign in
                </Button>
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
          </Frame>
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
