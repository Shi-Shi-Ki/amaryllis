import { BaseTextField } from "@/components/atoms/BaseTextField"
import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import { Controller, FieldError, useForm } from "react-hook-form"
import { match } from "ts-pattern"

type Story = StoryObj<typeof BaseTextField>
const meta: Meta<typeof BaseTextField> = {
  title: "components/atoms/BaseTextField",
  component: BaseTextField,
  tags: ["autodocs"],
  argTypes: {
    htmlForId: {
      description: "id値",
    },
    color: {
      control: "radio",
      options: [
        GlobalType.ColorType.PRIMARY,
        GlobalType.ColorType.SECONDARY,
        GlobalType.ColorType.ACCENT,
        GlobalType.ColorType.ERROR,
        GlobalType.ColorType.GHOST,
      ],
      description: "色のタイプ値",
    },
    widthSize: {
      description: "横幅",
      control: "radio",
      options: [
        GlobalType.SizeType.TINY,
        GlobalType.SizeType.SMALL,
        GlobalType.SizeType.MEDIUM,
        GlobalType.SizeType.LARGE,
      ],
    },
    componentSize: {
      description: "フォームの大きさ",
      control: "radio",
      options: [
        GlobalType.SizeType.TINY,
        GlobalType.SizeType.SMALL,
        GlobalType.SizeType.MEDIUM,
        GlobalType.SizeType.LARGE,
      ],
    },
    register: {
      description: "バリデーション設定",
    },
    textType: {
      control: "radio",
      options: [GlobalType.TextType.TEXT, GlobalType.TextType.EMAIL, GlobalType.TextType.PASSWORD],
      description: "フォームタイプ",
    },
    placeholder: {
      description: "フォーム内のプレスホルダー値",
    },
    hintText: {
      description: "フォーム上部に表示するメッセージ",
    },
    errorMessage: {
      description: "エラーメッセージ",
    },
    disabled: {
      control: "boolean",
      description: "非活性の設定",
    },
  },
  args: {
    htmlForId: "dummy_id",
    widthSize: GlobalType.SizeType.MEDIUM,
    componentSize: GlobalType.SizeType.MEDIUM,
    color: GlobalType.ColorType.PRIMARY,
    textType: GlobalType.TextType.TEXT,
    placeholder: "入力フォーム",
    hintText: "入力フォームです",
    errorMessage: {
      message: "エラーメッセージです",
    } as FieldError,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component: "入力フィールド<br/>任意のバリデーションやメッセージも設定可能",
      },
    },
  },
}

export const Primary: Story = {
  args: {
    htmlForId: "primary",
    color: GlobalType.ColorType.PRIMARY,
  },
}

export const Secondary: Story = {
  args: {
    htmlForId: "secondary",
    color: GlobalType.ColorType.SECONDARY,
  },
}

export const Accent: Story = {
  args: {
    htmlForId: "accent",
    color: GlobalType.ColorType.ACCENT,
  },
}

export const Ghost: Story = {
  args: {
    htmlForId: "ghost",
    color: GlobalType.ColorType.GHOST,
  },
}

export const Success: Story = {
  args: {
    htmlForId: "success",
    color: GlobalType.ColorType.SUCCESS,
    errorMessage: {
      message: "成功メッセージです",
    } as FieldError,
  },
}

export const Warning: Story = {
  args: {
    htmlForId: "warning",
    color: GlobalType.ColorType.WARNING,
    errorMessage: {
      message: "警告メッセージです",
    } as FieldError,
  },
}

export const Error: Story = {
  args: {
    htmlForId: "error",
    color: GlobalType.ColorType.ERROR,
  },
}

export const Disabled: Story = {
  args: {
    htmlForId: "disabled",
    disabled: true,
  },
}

// https://storybook.eds.equinor.com/?path=/docs/inputs-textfield--docs#validation
// https://zenn.dev/snaka/scraps/88dc593267779a
// https://storybook.js.org/docs/writing-stories#working-with-react-hooks
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
      <button className="btn btn-primary" type="submit">
        submit
      </button>
    </form>
  )
}
export const RequireInputValidation: Story = {
  render: () => {
    return <RequireInputValidationHook />
  },
}

export default meta
