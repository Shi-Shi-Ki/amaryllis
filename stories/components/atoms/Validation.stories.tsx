import Validation from "@/components/atoms/Validation"
import TextField from "@/components/atoms/TextField"
import Button from "@/components/atoms/Button"
import * as GlobalType from "@/utils/CommonTypes"
import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Controller, FieldError, useForm } from "react-hook-form"

type Story = StoryObj<typeof Validation>
const meta: Meta<typeof Validation> = {
  title: "components/atoms/Validation",
  component: Validation,
  tags: ["autodocs"],
  argTypes: {
    fieldError: {
      description: "エラーメッセージ",
    },
    validationType: {
      control: "radio",
      options: [
        GlobalType.ColorType.NONE,
        GlobalType.ColorType.SUCCESS,
        GlobalType.ColorType.WARNING,
        GlobalType.ColorType.ERROR,
      ],
      description: "バリデーションメッセージのアイコン",
    },
    children: {
      description: "コンポーネント要素",
    },
  },
  args: {
    validationType: GlobalType.ColorType.ERROR,
    fieldError: {
      message: "バリデーション用メッセージです",
    } as FieldError,
    children: <div>test</div>,
  },
  parameters: {
    docs: {
      description: {
        component:
          "submitボタンを押下するとバリデーションが走る（それ以降はリアルタイムでバリデーションが行われる）",
      },
    },
  },
}

const ErrorIconMessage = () => {
  const {
    register,
    formState: { isSubmitSuccessful },
    handleSubmit,
    control,
  } = useForm<{
    name_field: string
  }>()
  console.log(`isSubmitSuccessful: ${isSubmitSuccessful}`)
  return (
    <form onSubmit={handleSubmit((name_field) => console.log(name_field))}>
      <Controller
        name="name_field"
        control={control}
        rules={{
          required: "必須入力の項目です",
          minLength: {
            value: 10,
            message: "最低10文字以上入力してください",
          },
        }}
        render={({ fieldState: { error } }) => (
          <Validation fieldError={error} validationType={GlobalType.ColorType.ERROR}>
            <TextField
              register={register("name_field")}
              colorType={GlobalType.ColorType.PRIMARY}
              placeholder="名前"
              hintText="名前を入力してください"
            />
          </Validation>
        )}
      />
      <div>
        <Button
          buttonType={GlobalType.ButtonType.SUBMIT}
          colorType={GlobalType.ColorType.PRIMARY}
          onClick={() => alert("submit!")}
        >
          submit
        </Button>
      </div>
    </form>
  )
}
export const Error: Story = {
  render: () => <ErrorIconMessage />,
}

const WarningIconMessage = () => {
  const {
    register,
    formState: { isSubmitSuccessful },
    handleSubmit,
    control,
  } = useForm<{
    name_field: string
  }>()
  console.log(`isSubmitSuccessful: ${isSubmitSuccessful}`)
  return (
    <form onSubmit={handleSubmit((name_field) => console.log(name_field))}>
      <Controller
        name="name_field"
        control={control}
        rules={{
          required: "必須入力の項目です",
          minLength: {
            value: 10,
            message: "最低10文字以上入力してください",
          },
        }}
        render={({ fieldState: { error } }) => (
          <Validation fieldError={error} validationType={GlobalType.ColorType.WARNING}>
            <TextField
              register={register("name_field")}
              colorType={GlobalType.ColorType.PRIMARY}
              placeholder="名前"
              hintText="名前を入力してください"
            />
          </Validation>
        )}
      />
      <div>
        <Button
          buttonType={GlobalType.ButtonType.SUBMIT}
          colorType={GlobalType.ColorType.PRIMARY}
          onClick={() => alert("submit!")}
        >
          submit
        </Button>
      </div>
    </form>
  )
}
export const Warning: Story = {
  render: () => <WarningIconMessage />,
}

const SuccessIconMessage = () => {
  const {
    register,
    formState: { isSubmitSuccessful },
    handleSubmit,
    control,
  } = useForm<{
    name_field: string
  }>()
  console.log(`isSubmitSuccessful: ${isSubmitSuccessful}`)
  return (
    <form onSubmit={handleSubmit((name_field) => console.log(name_field))}>
      <Controller
        name="name_field"
        control={control}
        rules={{
          required: "必須入力の項目です",
          minLength: {
            value: 10,
            message: "最低10文字以上入力してください",
          },
        }}
        render={({ fieldState: { error } }) => (
          <Validation fieldError={error} validationType={GlobalType.ColorType.SUCCESS}>
            <TextField
              register={register("name_field")}
              colorType={GlobalType.ColorType.PRIMARY}
              placeholder="名前"
              hintText="名前を入力してください"
            />
          </Validation>
        )}
      />
      <div>
        <Button
          buttonType={GlobalType.ButtonType.SUBMIT}
          colorType={GlobalType.ColorType.PRIMARY}
          onClick={() => alert("submit!")}
        >
          submit
        </Button>
      </div>
    </form>
  )
}
export const Success: Story = {
  render: () => <SuccessIconMessage />,
}

const NoneIconMessage = () => {
  const {
    register,
    formState: { isSubmitSuccessful },
    handleSubmit,
    control,
  } = useForm<{
    name_field: string
  }>()
  console.log(`isSubmitSuccessful: ${isSubmitSuccessful}`)
  return (
    <form onSubmit={handleSubmit((name_field) => console.log(name_field))}>
      <Controller
        name="name_field"
        control={control}
        rules={{
          required: "必須入力の項目です",
          minLength: {
            value: 10,
            message: "最低10文字以上入力してください",
          },
        }}
        render={({ fieldState: { error } }) => (
          <Validation fieldError={error} validationType={GlobalType.ColorType.NONE}>
            <TextField
              register={register("name_field")}
              colorType={GlobalType.ColorType.PRIMARY}
              placeholder="名前"
              hintText="名前を入力してください"
            />
          </Validation>
        )}
      />
      <div>
        <Button
          buttonType={GlobalType.ButtonType.SUBMIT}
          colorType={GlobalType.ColorType.PRIMARY}
          onClick={() => alert("submit!")}
        >
          submit
        </Button>
      </div>
    </form>
  )
}
export const None: Story = {
  render: () => <NoneIconMessage />,
}

export default meta
