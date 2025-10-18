import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import CheckBox from "@/components/atoms/CheckBox"

type Story = StoryObj<typeof CheckBox>
const meta: Meta<typeof CheckBox> = {
  title: "components/atoms/CheckBox",
  component: CheckBox,
  tags: ["autodocs"],
  argTypes: {
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
      description: "色のタイプ値",
    },
    isDefaultChecked: {
      description: "チェックON/OFF制御",
    },
    onChange: {
      description: "ボタン押下時のコールバック関数",
    },
    sizeType: {
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
  },
  args: {
    label: "test label",
    colorType: GlobalType.ColorType.PRIMARY,
    sizeType: GlobalType.SizeType.MEDIUM,
  },
}

export const Primary: Story = {
  args: {
    label: "サンプルのチェックボックスです",
    colorType: GlobalType.ColorType.PRIMARY,
  },
}

export const Secondary: Story = {
  args: {
    label: "サンプルのチェックボックスです",
    colorType: GlobalType.ColorType.SECONDARY,
  },
}

export const Accent: Story = {
  args: {
    label: "サンプルのチェックボックスです",
    colorType: GlobalType.ColorType.ACCENT,
  },
}

export const DefaultChecked: Story = {
  args: {
    label: "デフォルトでチェックON",
    isDefaultChecked: true,
    colorType: GlobalType.ColorType.PRIMARY,
  },
}

export const Disabled: Story = {
  args: {
    label: "非活性状態です",
    disabled: true,
    colorType: GlobalType.ColorType.PRIMARY,
  },
}

export const CheckedEvent: Story = {
  args: {
    label: "チェックボックスのイベントハンドリングです",
    colorType: GlobalType.ColorType.PRIMARY,
    onChange: () => {
      alert("on change!")
    },
  },
}

export const MultiCheckBoxes: Story = {
  render: () => {
    const color = GlobalType.ColorType.PRIMARY
    return (
      <div>
        <CheckBox colorType={color} label="value 1" value="1" />
        <CheckBox colorType={color} label="value 2" value="2" />
        <CheckBox colorType={color} label="value 3" value="3" />
      </div>
    )
  },
}

export default meta
