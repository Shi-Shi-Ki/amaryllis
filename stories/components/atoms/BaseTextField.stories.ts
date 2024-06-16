import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import { BaseTextField } from "@/components/atoms/BaseTextField"

type Story = StoryObj<typeof BaseTextField>
const meta: Meta<typeof BaseTextField> = {
  title: "components/atoms/BaseTextField",
  component: BaseTextField,
  tags: ["autodocs"],
  argTypes: {},
}

export const TextField: Story = {
  args: {
    htmlForId: "text",
  },
}

export const NumberValidation: Story = {
  args: {
    htmlForId: "number",
  },
}

export const PasswordField: Story = {
  args: {
    htmlForId: "password",
    textType: GlobalType.TextType.PASSWORD,
  },
}

export const Disabled: Story = {
  args: {
    htmlForId: "disabled",
    disabled: true,
  },
}

export default meta
