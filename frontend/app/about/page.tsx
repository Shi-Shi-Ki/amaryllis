"use client"
import * as CommonTypes from "@/utils/CommonTypes"
import { useForm, SubmitHandler } from "react-hook-form"
import Button from "@/components/atoms/Button"
import TextField from "@/components/atoms/TextField"
import Icon from "@/components/atoms/Icon"
import PullDown, { PullDownElement } from "@/components/atoms/PullDown"
import { match } from "ts-pattern"

export default function About() {
  type Inputs = {
    name: string
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  const pullDownOptions = [
    {
      element: "以下から選択してください",
      value: "",
      selected: true,
      disabled: true,
    },
    {
      element: "red",
    },
    {
      element: "blue",
    },
    {
      element: "yellow",
    },
  ] as PullDownElement[]

  return (
    <>
      <h1>about page!!!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          colorType={CommonTypes.ColorType.PRIMARY}
          sizeType={CommonTypes.SizeType.MEDIUM}
          onClick={() => {
            console.log("primary!")
          }}
        >
          test
        </Button>
        <Button
          colorType={CommonTypes.ColorType.SECONDARY}
          sizeType={CommonTypes.SizeType.MEDIUM}
          onClick={() => {
            console.log("secondary!")
          }}
        >
          test
        </Button>
        <Button
          colorType={CommonTypes.ColorType.ACCENT}
          sizeType={CommonTypes.SizeType.MEDIUM}
          onClick={() => {
            console.log("accent!")
          }}
        >
          test
        </Button>
        <Button colorType={CommonTypes.ColorType.ACCENT} onClick={() => {}}>
          <Icon iconName="home" />
        </Button>
        <TextField
          register={register("name", {
            required: "名前は必須です",
            minLength: { value: 5, message: "5文字以上入力してください" },
          })}
          colorType={match(errors.name?.type)
            .with("required", () => CommonTypes.ColorType.ERROR)
            .with("minLength", () => CommonTypes.ColorType.WARNING)
            .otherwise(() => CommonTypes.ColorType.SECONDARY)}
          placeholder="name"
          hintText="名前を入力してください"
        />
        <PullDown
          options={pullDownOptions}
          colorType={CommonTypes.ColorType.ACCENT}
          widthSize={CommonTypes.SizeType.TINY}
        ></PullDown>
        <input type="submit" />
      </form>
    </>
  )
}
