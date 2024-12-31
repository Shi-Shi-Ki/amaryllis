import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import { BasePullDown } from "@/components/atoms/BasePullDown"
import { FieldError } from "react-hook-form"

type Story = StoryObj<typeof BasePullDown>
const meta: Meta<typeof BasePullDown> = {
  title: "components/atoms/BasePullDown",
  component: BasePullDown,
  tags: ["autodocs"],
  argTypes: {
    htmlForId: {
      description: "id値",
    },
    options: {
      description: "プルダウン要素",
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
      description: "プルダウンのプリセットテーマ名",
    },
    componentSize: {
      control: "radio",
      options: [
        GlobalType.SizeType.LARGE,
        GlobalType.SizeType.MEDIUM,
        GlobalType.SizeType.SMALL,
        GlobalType.SizeType.TINY,
      ],
      description: "フォームの大きさ",
    },
    widthSize: {
      control: "radio",
      options: [
        GlobalType.SizeType.LARGE,
        GlobalType.SizeType.MEDIUM,
        GlobalType.SizeType.SMALL,
        GlobalType.SizeType.TINY,
      ],
      description: "横幅",
    },
    hintText: {
      description: "ヒントテキスト",
    },
    register: {
      description: "バリデーション設定",
    },
    errorMessage: {
      description: "バリデーションエラーのメッセージ",
    },
    onChange: {
      description: "プルダウン選択時のハンドラー",
    },
    disabled: {
      control: "boolean",
      description: "非活性の設定",
    },
  },
  args: {
    htmlForId: "dummy_id",
    options: [
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
    ],
    color: GlobalType.ColorType.PRIMARY,
    componentSize: GlobalType.SizeType.MEDIUM,
    widthSize: GlobalType.SizeType.TINY,
    hintText: "項目名など",
    errorMessage: { message: "エラーメッセージ" } as FieldError,
  },
}

export const Primary: Story = {
  args: {
    htmlForId: "primary",
    options: [
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
    ],
    color: GlobalType.ColorType.PRIMARY,
  },
}

export const Secondary: Story = {
  args: {
    htmlForId: "secondary",
    options: [
      {
        element: "red",
      },
      {
        element: "blue",
      },
      {
        element: "yellow",
      },
    ],
    color: GlobalType.ColorType.SECONDARY,
  },
}

export const Accent: Story = {
  args: {
    htmlForId: "accent",
    options: [
      {
        element: "red",
      },
      {
        element: "blue",
      },
      {
        element: "yellow",
      },
    ],
    color: GlobalType.ColorType.ACCENT,
  },
}

export const OnChange: Story = {
  args: {
    htmlForId: "onchange",
    options: [
      {
        element: "red",
      },
      {
        element: "blue",
      },
      {
        element: "yellow",
      },
    ],
    color: GlobalType.ColorType.PRIMARY,
    onChange: (e) => {
      console.log(e.currentTarget.value)
    },
  },
}

export default meta
