import type { Meta, StoryObj } from "@storybook/react"
import { BaseTextField, TextTypeList } from "@/components/atoms/BaseTextField"

type Story = StoryObj<typeof BaseTextField>
const meta: Meta<typeof BaseTextField> = {
  title: "components/atoms/BaseTextField",
  component: BaseTextField,
  tags: ["autodocs"],
  argTypes: {},
}

export const TextField: Story = {
  args: {
    label: "text",
    htmlForId: "text",
  },
}

export const NumberValidation: Story = {
  args: {
    label: "number",
    htmlForId: "number",
    validation: {
      pattern: "-?[0-9]*(.[0-9]+)?",
      error: "数値を入力してください",
    },
  },
}

export const PasswordField: Story = {
  args: {
    label: "password",
    htmlForId: "password",
    textType: TextTypeList.PASSWORD,
  },
}

export const Disabled: Story = {
  args: {
    label: "disabled",
    htmlForId: "disabled",
    disabled: true,
  },
}

export default meta
