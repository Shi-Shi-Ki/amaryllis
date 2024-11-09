import * as GlobalType from "@/utils/CommonTypes"
import { BaseTextArea } from "@/components/atoms/BaseTextArea"
import { FieldError } from "react-hook-form"
import { StoryObj, Meta } from "@storybook/react/*"

type Story = StoryObj<typeof BaseTextArea>
const meta: Meta<typeof BaseTextArea> = {
  title: "components/atoms/BaseTextArea",
  component: BaseTextArea,
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
    placeholder: {
      description: "フォーム内のプレスホルダー値",
    },
    hintText: {
      description: "フォーム上部に表示するメッセージ",
    },
    errorMessage: {
      description: "エラーメッセージ",
    },
    rows: {
      control: "text",
      description: "行数",
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

export const Error: Story = {
  args: {
    htmlForId: "error",
    color: GlobalType.ColorType.ERROR,
  },
}

export const Ghost: Story = {
  args: {
    htmlForId: "ghost",
    color: GlobalType.ColorType.GHOST,
  },
}

export default meta
