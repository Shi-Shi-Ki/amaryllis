import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import { BaseIcon } from "@/components/atoms/BaseIcon"
import BaseButton from "@/components/atoms/BaseButton"

/**
 * https://marella.me/material-icons/demo/
 */
type Story = StoryObj<typeof BaseIcon>
const meta: Meta<typeof BaseIcon> = {
  title: "components/atoms/BaseIcon",
  component: BaseIcon,
  tags: ["autodocs"],
  argTypes: {
    iconName: {
      description: "アイコン名",
    },
    iconColor: {
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
    htmlForId: {
      description: "id値（デフォルトはランダムなuuid）",
    },
  },
  args: {
    iconName: "home",
    iconColor: GlobalType.ColorType.PRIMARY,
  },
  parameters: {
    docs: {
      description: {
        component:
          "materialアイコンを表示する<br/>一覧はこちら https://marella.me/material-icons/demo/",
      },
    },
  },
}

export const Primary: Story = {
  args: {
    iconName: "add",
    iconColor: GlobalType.ColorType.PRIMARY,
  },
}
export const WithPrimaryButton: Story = {
  render: () => (
    <>
      <BaseButton
        htmlForId="with-primary-button"
        color={GlobalType.ColorType.PRIMARY}
        onClick={() => {}}
        shape={GlobalType.ShapeType.CIRCLE}
      >
        <BaseIcon iconName="add" />
      </BaseButton>
    </>
  ),
}
export const Secondary: Story = {
  args: {
    iconName: "help",
    iconColor: GlobalType.ColorType.SECONDARY,
  },
}
export const WithSecondaryButton: Story = {
  render: () => (
    <>
      <BaseButton
        htmlForId="with-secondary-button"
        color={GlobalType.ColorType.SECONDARY}
        onClick={() => {}}
        shape={GlobalType.ShapeType.CIRCLE}
      >
        <BaseIcon iconName="help" />
      </BaseButton>
    </>
  ),
}
export const Accent: Story = {
  args: {
    iconName: "language",
    iconColor: GlobalType.ColorType.ACCENT,
  },
}
export const WithAccentButton: Story = {
  render: () => (
    <>
      <BaseButton
        htmlForId="with-accent-button"
        color={GlobalType.ColorType.ACCENT}
        onClick={() => {}}
        shape={GlobalType.ShapeType.SQUARE}
      >
        <BaseIcon iconName="language" />
      </BaseButton>
    </>
  ),
}

export default meta
