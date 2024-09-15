import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import { BaseIcon } from "@/components/atoms/BaseIcon"

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
    buttonColor: {
      description: "ボタンの色タイプ",
    },
    htmlForId: {
      description: "id値（デフォルトはランダムなuuid）",
    },
  },
  args: {
    iconName: "home",
    buttonColor: GlobalType.ColorType.PRIMARY,
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
    buttonColor: GlobalType.ColorType.PRIMARY,
  },
}
export const Secondary: Story = {
  args: {
    iconName: "help",
    buttonColor: GlobalType.ColorType.SECONDARY,
  },
}
export const Accent: Story = {
  args: {
    iconName: "language",
    buttonColor: GlobalType.ColorType.ACCENT,
  },
}

export default meta
