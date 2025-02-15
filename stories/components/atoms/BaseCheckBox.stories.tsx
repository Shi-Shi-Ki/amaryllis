import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import { BaseCheckBox } from "@/components/atoms/BaseCheckBox"

type Story = StoryObj<typeof BaseCheckBox>
const meta: Meta<typeof BaseCheckBox> = {
  title: "components/atoms/BaseCheckBox",
  component: BaseCheckBox,
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
    isDefaultChecked: {
      description: "チェックON/OFF制御",
    },
    onChange: {
      description: "ボタン押下時のコールバック関数",
    },
    size: {
      control: "radio",
      options: [
        GlobalType.SizeType.LARGE,
        GlobalType.SizeType.MEDIUM,
        GlobalType.SizeType.SMALL,
        GlobalType.SizeType.TINY,
      ],
      description: "大きさのタイプ値",
    },
    label: {
      description: "ラベル",
    },
    disabled: {
      control: "boolean",
      description: "非活性の設定",
    },
    classes: {
      control: "text",
      description: "任意のclass要素",
    },
  },
  args: {
    htmlForId: "top",
    label: "test label",
    color: GlobalType.ColorType.PRIMARY,
    size: GlobalType.SizeType.MEDIUM,
  },
}

export const Primary: Story = {
  args: {
    htmlForId: "primary",
    label: "サンプルのチェックボックスです",
    color: GlobalType.ColorType.PRIMARY,
  },
}
export const Secondary: Story = {
  args: {
    htmlForId: "secondary",
    label: "サンプルのチェックボックスです",
    color: GlobalType.ColorType.SECONDARY,
  },
}
export const Accent: Story = {
  args: {
    htmlForId: "accent",
    label: "サンプルのチェックボックスです",
    color: GlobalType.ColorType.ACCENT,
  },
}
export const DefaultChecked: Story = {
  args: {
    htmlForId: "default-checked",
    label: "デフォルトでチェックON",
    isDefaultChecked: true,
    color: GlobalType.ColorType.PRIMARY,
  },
}
export const Disabled: Story = {
  args: {
    htmlForId: "default-checked",
    label: "非活性状態です",
    disabled: true,
    color: GlobalType.ColorType.PRIMARY,
  },
}
export const CheckedEvent: Story = {
  args: {
    htmlForId: "default-checked",
    label: "チェックボックスのイベントハンドリングです",
    color: GlobalType.ColorType.PRIMARY,
    onChange: () => {
      alert("on change!")
    },
  },
}
export const MultiCheckBoxes: Story = {
  render: () => {
    const color = GlobalType.ColorType.SECONDARY
    return (
      <div>
        <BaseCheckBox htmlForId="multi-checkboxes-1" color={color} label="value 1" value="1" />
        <BaseCheckBox htmlForId="multi-checkboxes-2" color={color} label="value 2" value="2" />
        <BaseCheckBox htmlForId="multi-checkboxes-3" color={color} label="value 3" value="3" />
      </div>
    )
  },
}

export default meta
