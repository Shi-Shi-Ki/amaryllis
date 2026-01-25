"use client"
import * as CommonTypes from "@/utils/CommonTypes"
import TextField from "@/components/atoms/TextField"
import { useForm } from "react-hook-form"
import Frame from "@/components/atoms/Frame"
import Image from "next/image"
import Button from "@/components/atoms/Button"

export default function Signup() {
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
      <div className="relative h-full overflow-hidden">
        <Image
          src="/accounts/signin-signup_front.jpg"
          alt="signin signup front image"
          fill={true}
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
      <div>
        <form>
          <Frame colorType={CommonTypes.ColorType.PRIMARY} className={"relative z-10"}>
            <div className="flex flex-col items-center">
              <div>
                <h1 className="py-8 text-2xl">新規登録</h1>
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
              <div className="form-control w-full max-w-xs">
                <Button
                  sizeType={CommonTypes.SizeType.MEDIUM}
                  colorType={CommonTypes.ColorType.PRIMARY}
                  onClick={() => {}}
                >
                  sign up
                </Button>
              </div>
              <div className="pt-2">
                <p>
                  ログインは&nbsp;
                  <a className="link link-primary" href="/signin">
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
                onClick={() => {}}
                priority
              />
            </div>
          </Frame>
        </form>
      </div>
    </>
  )
}
