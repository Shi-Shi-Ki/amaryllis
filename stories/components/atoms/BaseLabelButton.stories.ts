import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import { BaseLabelButton } from "@/components/atoms/BaseLabelButton"

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
    color: GlobalType.ColorType.PRIMARY,
    label: "button",
  },
}

export const Accent: Story = {
  args: {
    htmlForId: "accent",
    color: GlobalType.ColorType.ACCENT,
    label: "button",
  },
}

export const Disabled: Story = {
  args: {
    htmlForId: "primary",
    color: GlobalType.ColorType.PRIMARY,
    label: "button",
    disabled: true,
  },
}

export default meta
