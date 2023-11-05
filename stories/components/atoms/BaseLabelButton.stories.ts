import type { Meta, StoryObj } from "@storybook/react"
import { BaseLabelButton, ColorList } from "@/components/atoms/BaseLabelButton"

type Story = StoryObj<typeof BaseLabelButton>
const meta: Meta<typeof BaseLabelButton> = {
  title: "components/atoms/BaseLabelButton",
  component: BaseLabelButton,
  tags: ["autodocs"],
  argTypes: {},
}

export const Primary: Story = {
  args: {
    htmlForId: "primary",
    color: ColorList.PRIMARY,
    label: "button",
  },
}

export const Accent: Story = {
  args: {
    htmlForId: "accent",
    color: ColorList.ACCENT,
    label: "button",
  },
}

export const Plain: Story = {
  args: {
    htmlForId: "plain",
    color: ColorList.PLAIN,
    label: "button",
  },
}

export const Disabled: Story = {
  args: {
    htmlForId: "primary",
    color: ColorList.PRIMARY,
    label: "button",
    disabled: true,
  },
}

export default meta
