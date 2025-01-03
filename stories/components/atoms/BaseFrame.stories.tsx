import type { Meta, StoryObj } from "@storybook/react"
import { BaseFrame } from "@/components/atoms/BaseFrame"
import React from "react"
import * as GlobalType from "@/utils/CommonTypes"
import BaseTextField from "@/components/atoms/BaseTextField"
import { Controller, useForm } from "react-hook-form"
import { match } from "ts-pattern"
import * as CommonTypes from "@/utils/CommonTypes"

type Story = StoryObj<typeof BaseFrame>
const meta: Meta<typeof BaseFrame> = {
  title: "components/atoms/BaseFrame",
  component: BaseFrame,
  tags: ["autodocs"],
  argTypes: {
    htmlForId: {
      description: "id値（デフォルトはランダムなuuid）",
    },
    children: {
      description: "任意のDOM要素",
    },
    borderColor: {
      description: "枠線の色",
    },
    classes: {
      description: "任意のクラス",
    },
  },
  args: {
    htmlForId: "sample",
    children: (
      <>
        <div>test_1</div>
        <div>test_2</div>
        <div>test_3</div>
      </>
    ),
    borderColor: CommonTypes.ColorType.PRIMARY,
    classes: ["class1", "class2"],
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
    htmlForId: "border-primary-color",
    borderColor: CommonTypes.ColorType.PRIMARY,
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
    htmlForId: "border-secondary-color",
    borderColor: CommonTypes.ColorType.SECONDARY,
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
    htmlForId: "border-accent-color",
    borderColor: CommonTypes.ColorType.ACCENT,
    children: (
      <>
        <div>test_1</div>
        <div>test_2</div>
        <div>test_3</div>
      </>
    ),
  },
}

export const SetBackGroundColor: Story = {
  args: {
    htmlForId: "set-background-color",
    borderColor: CommonTypes.ColorType.PRIMARY,
    classes: ["bg-base-300", "place-content-center"],
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
      <div>
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
          render={({ field: { ref, ...props }, fieldState: { error } }) => (
            <BaseTextField
              htmlForId="validate"
              register={register("name_field")}
              errorMessage={errors.name_field}
              color={match(errors.name_field?.type)
                .with("required", () => GlobalType.ColorType.ERROR)
                .with("minLength", () => GlobalType.ColorType.WARNING)
                .otherwise(() => GlobalType.ColorType.PRIMARY)}
              placeholder="名前"
              hintText="名前を入力してください"
            />
          )}
        />
      </div>
      <div>
        <button className="btn btn-primary" type="submit">
          submit
        </button>
      </div>
    </form>
  )
}
export const InForms: Story = {
  args: {
    htmlForId: "in-forms",
    children: <RequireInputValidationHook />,
  },
}

export default meta
