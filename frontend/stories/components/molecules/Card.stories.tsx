import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import Card from "@/components/molecules/Card"

type Story = StoryObj<typeof Card>
const meta: Meta<typeof Card> = {
  title: "components/molecules/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "タイトル",
    },
    description: {
      description: "説明文",
    },
    completeButton: {
      description: "ボタンコンポーネント",
    },
  },
  args: {
    title: "タイトル",
    description: "説明文1\n説明文2\n説明文3",
    completeButton: {
      children: <p>submit</p>,
      colorType: GlobalType.ColorType.PRIMARY,
      onClick: () => {
        alert("push submit!")
      },
    },
  },
}

export const Primary: Story = {
  args: {
    title: "サンプルのタイトル",
    description: "説明文1\n説明文2\n説明文3\n",
    completeButton: {
      children: <p>button</p>,
      colorType: GlobalType.ColorType.PRIMARY,
      onClick: () => {
        alert("push submit!")
      },
    },
  },
}

export const Secondary: Story = {
  args: {
    title: "サンプルのタイトル",
    description: "説明文1\n説明文2\n説明文3\n",
    completeButton: {
      children: <p>button</p>,
      colorType: GlobalType.ColorType.SECONDARY,
      onClick: () => {
        alert("push submit!")
      },
    },
  },
}

export const Accent: Story = {
  args: {
    title: "サンプルのタイトル",
    description: "説明文1\n説明文2\n説明文3\n",
    completeButton: {
      children: <p>button</p>,
      colorType: GlobalType.ColorType.ACCENT,
      onClick: () => {
        alert("push submit!")
      },
    },
  },
}

export default meta
