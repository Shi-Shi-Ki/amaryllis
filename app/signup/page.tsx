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
      <div>test</div>
      <div>
        <form>
          <BaseFrame
            htmlForId="login-form"
            borderColor={CommonTypes.ColorType.PRIMARY}
            classes={["flex", "flex-col", "items-center"]}
          >
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
          </BaseFrame>
        </form>
      </div>
    </>
  )
}
