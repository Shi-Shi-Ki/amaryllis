import TextField from "@/components/atoms/TextField"
import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"

type Story = StoryObj<typeof TextField>
const meta: Meta<typeof TextField> = {
  title: "components/atoms/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    colorType: {
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
    widthSizeType: {
      description: "横幅",
      control: "radio",
      options: [
        GlobalType.SizeType.TINY,
        GlobalType.SizeType.SMALL,
        GlobalType.SizeType.MEDIUM,
        GlobalType.SizeType.LARGE,
      ],
    },
    componentSizeType: {
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
    disabled: {
      control: "boolean",
      description: "非活性の設定",
    },
  },
  args: {
    widthSizeType: GlobalType.SizeType.MEDIUM,
    componentSizeType: GlobalType.SizeType.MEDIUM,
    colorType: GlobalType.ColorType.PRIMARY,
    textType: GlobalType.TextType.TEXT,
    placeholder: "入力フォーム",
    hintText: "入力フォームです",
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
    colorType: GlobalType.ColorType.PRIMARY,
  },
}

export const Secondary: Story = {
  args: {
    colorType: GlobalType.ColorType.SECONDARY,
  },
}

export const Accent: Story = {
  args: {
    colorType: GlobalType.ColorType.ACCENT,
  },
}

export const Ghost: Story = {
  args: {
    colorType: GlobalType.ColorType.GHOST,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export default meta
