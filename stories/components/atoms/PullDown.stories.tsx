import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import PullDown from "@/components/atoms/PullDown"

type Story = StoryObj<typeof PullDown>
const meta: Meta<typeof PullDown> = {
  title: "components/atoms/PullDown",
  component: PullDown,
  tags: ["autodocs"],
  argTypes: {
    options: {
      description: "プルダウン要素",
    },
    colorType: {
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
    onChange: {
      description: "プルダウン選択時のハンドラー",
    },
    disabled: {
      control: "boolean",
      description: "非活性の設定",
    },
  },
  args: {
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
    colorType: GlobalType.ColorType.PRIMARY,
    componentSize: GlobalType.SizeType.MEDIUM,
    widthSize: GlobalType.SizeType.TINY,
    hintText: "項目名など",
  },
}

export const Primary: Story = {
  args: {
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
    colorType: GlobalType.ColorType.PRIMARY,
  },
}

export const Secondary: Story = {
  args: {
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
    colorType: GlobalType.ColorType.SECONDARY,
  },
}

export const Accent: Story = {
  args: {
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
    colorType: GlobalType.ColorType.ACCENT,
  },
}

export const OnChange: Story = {
  args: {
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
    colorType: GlobalType.ColorType.PRIMARY,
    onChange: (e) => {
      console.log(e.currentTarget.value)
    },
  },
}

export default meta
