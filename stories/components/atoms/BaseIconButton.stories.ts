import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import { BaseIconButton } from "@/components/atoms/BaseIconButton"

type Story = StoryObj<typeof BaseIconButton>
const meta: Meta<typeof BaseIconButton> = {
  title: "components/atoms/BaseIconButton",
  component: BaseIconButton,
  tags: ["autodocs"],
  argTypes: {},
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

export const Disabled: Story = {
  args: {
    htmlForId: "primary",
    color: GlobalType.ColorType.PRIMARY,
    disabled: true,
  },
}

export default meta
