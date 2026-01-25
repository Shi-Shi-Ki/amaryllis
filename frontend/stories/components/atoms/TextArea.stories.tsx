import * as GlobalType from "@/utils/CommonTypes"
import TextArea from "@/components/atoms/TextArea"
import { StoryObj, Meta } from "@storybook/react/*"

type Story = StoryObj<typeof TextArea>
const meta: Meta<typeof TextArea> = {
  title: "components/atoms/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
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
    placeholder: {
      description: "フォーム内のプレスホルダー値",
    },
    hintText: {
      description: "フォーム上部に表示するメッセージ",
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
    widthSizeType: GlobalType.SizeType.MEDIUM,
    componentSizeType: GlobalType.SizeType.MEDIUM,
    color: GlobalType.ColorType.PRIMARY,
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
