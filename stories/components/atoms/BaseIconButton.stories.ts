import type { Meta, StoryObj } from "@storybook/react"
import { BaseIconButton, ColorList, IconList } from "@/components/atoms/BaseIconButton"

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
    color: ColorList.PRIMARY,
    icon: IconList.ADD,
  },
}

export const Accent: Story = {
  args: {
    htmlForId: "accent",
    color: ColorList.ACCENT,
    icon: IconList.ADD,
  },
}

export const Plain: Story = {
  args: {
    htmlForId: "plain",
    color: ColorList.PLAIN,
    icon: IconList.ADD,
  },
}

export const Disabled: Story = {
  args: {
    htmlForId: "primary",
    color: ColorList.PRIMARY,
    icon: IconList.ADD,
    disabled: true,
  },
}

export default meta
