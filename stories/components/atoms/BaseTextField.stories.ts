import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import { BaseTextField } from "@/components/atoms/BaseTextField"
import { FieldError } from "react-hook-form"

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
        GlobalType.ColorType.DEFAULT,
        GlobalType.ColorType.PRIMARY,
        GlobalType.ColorType.SECONDARY,
        GlobalType.ColorType.ACCENT,
        GlobalType.ColorType.NEUTRAL,
        GlobalType.ColorType.GHOST,
      ],
      description: "色のタイプ値",
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

export default meta
