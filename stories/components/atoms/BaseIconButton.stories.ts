import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import { BaseIconButton } from "@/components/atoms/BaseIconButton"

type Story = StoryObj<typeof BaseIconButton>
const meta: Meta<typeof BaseIconButton> = {
  title: "components/atoms/BaseIconButton",
  component: BaseIconButton,
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
    iconName: {
      description: "アイコン名",
    },
    buttonType: {
      control: "radio",
      options: [GlobalType.ButtonType.BUTTON, GlobalType.ButtonType.SUBMIT],
      description: "ボタンのタイプ値",
    },
    disabled: {
      control: "boolean",
      description: "非活性の設定",
    },
    shape: {
      control: "radio",
      options: [GlobalType.ShapeType.SQUARE, GlobalType.ShapeType.CIRCLE],
      description: "ボタンの形状タイプ",
    },
    onClick: {
      description: "ボタン押下時のコールバック関数",
    },
  },
  args: {
    htmlForId: "dummy_id",
    color: GlobalType.ColorType.PRIMARY,
    iconName: "add",
    buttonType: GlobalType.ButtonType.BUTTON,
    disabled: false,
    shape: GlobalType.ShapeType.SQUARE,
  },
}

export const Primary: Story = {
  args: {
    htmlForId: "primary",
    color: GlobalType.ColorType.PRIMARY,
    iconName: "add",
  },
}

export const Secondary: Story = {
  args: {
    htmlForId: "secondary",
    color: GlobalType.ColorType.SECONDARY,
    iconName: "add",
  },
}

export const Accent: Story = {
  args: {
    htmlForId: "accent",
    color: GlobalType.ColorType.ACCENT,
    iconName: "add",
  },
}

export const Disabled: Story = {
  args: {
    htmlForId: "primary",
    color: GlobalType.ColorType.PRIMARY,
    iconName: "add",
    disabled: true,
  },
}

export default meta
