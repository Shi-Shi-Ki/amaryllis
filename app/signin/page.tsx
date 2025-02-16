"use client"
import * as CommonTypes from "@/utils/CommonTypes"
import BaseTextField from "@/components/atoms/BaseTextField"
import { useForm } from "react-hook-form"
import BaseFrame from "@/components/atoms/BaseFrame"
import { signIn } from "next-auth/react"
import Image from "next/image"
import BaseButton from "@/components/atoms/BaseButton"

export default function About() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    userName: string
    password: string
  }>()

  return (
    <>
      <div>
        <form>
          <BaseFrame htmlForId="login-form" borderColor={CommonTypes.ColorType.PRIMARY}>
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
                onClick={() => signIn("google", {}, { prompt: "login" })}
                priority
              />
            </div>
          </BaseFrame>
        </form>
      </div>
      <div>test</div>
    </>
  )
}
