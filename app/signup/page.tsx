"use client"
import * as CommonTypes from "@/utils/CommonTypes"
import BaseTextField from "@/components/atoms/BaseTextField"
import { useForm } from "react-hook-form"
import BaseFrame from "@/components/atoms/BaseFrame"

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
      <form>
        <BaseFrame
          htmlForId="login-form"
          borderColor={CommonTypes.ColorType.PRIMARY}
          widthSize={CommonTypes.SizeType.TINY}
        >
          <div className="user-name-form max-w-md">
            <BaseTextField
              htmlForId="user-name"
              color={CommonTypes.ColorType.PRIMARY}
              widthSize={CommonTypes.SizeType.TINY}
              register={register("userName", {
                required: "ユーザー名は必須です",
              })}
              placeholder="ユーザー名"
            />
          </div>
          <div className="password-form max-w-md">
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
          </div>
        </BaseFrame>
      </form>
    </>
  )
}
