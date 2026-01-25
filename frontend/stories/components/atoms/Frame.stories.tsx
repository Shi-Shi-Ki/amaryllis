import type { Meta, StoryObj } from "@storybook/react"
import Frame from "@/components/atoms/Frame"
import Button from "@/components/atoms/Button"
import Validation from "@/components/atoms/Validation"
import React from "react"
import * as GlobalType from "@/utils/CommonTypes"
import TextField from "@/components/atoms/TextField"
import { Controller, useForm } from "react-hook-form"
import * as CommonTypes from "@/utils/CommonTypes"

type Story = StoryObj<typeof Frame>
const meta: Meta<typeof Frame> = {
  title: "components/atoms/Frame",
  component: Frame,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "任意のDOM要素",
    },
    colorType: {
      description: "枠線の色",
    },
    widthSize: {
      description: "横幅のサイズ",
    },
  },
  args: {
    children: (
      <>
        <div>test_1</div>
        <div>test_2</div>
        <div>test_3</div>
      </>
    ),
    colorType: CommonTypes.ColorType.PRIMARY,
    widthSize: CommonTypes.SizeType.MEDIUM,
  },
  parameters: {
    docs: {
      description: {
        component: "入力フォームやボタンのデザイン上のグループ化に使用する",
      },
    },
  },
}

export const BorderPrimaryColor: Story = {
  args: {
    colorType: CommonTypes.ColorType.PRIMARY,
    children: (
      <>
        <div>test_1</div>
        <div>test_2</div>
        <div>test_3</div>
      </>
    ),
  },
}

export const BorderSecondaryColor: Story = {
  args: {
    colorType: CommonTypes.ColorType.SECONDARY,
    children: (
      <>
        <div>test_1</div>
        <div>test_2</div>
        <div>test_3</div>
      </>
    ),
  },
}

export const BorderAccentColor: Story = {
  args: {
    colorType: CommonTypes.ColorType.ACCENT,
    children: (
      <>
        <div>test_1</div>
        <div>test_2</div>
        <div>test_3</div>
      </>
    ),
  },
}

const RequireInputValidationHook = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<{
    name_field: string
  }>()
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
export const InForms: Story = {
  args: {
    children: <RequireInputValidationHook />,
  },
}

export default meta
