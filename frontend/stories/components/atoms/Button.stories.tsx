import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import Button from "@/components/atoms/Button"

type Story = StoryObj<typeof Button>
const meta: Meta<typeof Button> = {
  title: "components/atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    // htmlForId: {
    //   description: "id値",
    // },
    // color: {
    //   control: "radio",
    //   options: [
    //     GlobalType.ColorType.DEFAULT,
    //     GlobalType.ColorType.PRIMARY,
    //     GlobalType.ColorType.SECONDARY,
    //     GlobalType.ColorType.ACCENT,
    //     GlobalType.ColorType.NEUTRAL,
    //     GlobalType.ColorType.GHOST,
    //   ],
    //   description: "色のタイプ値",
    // },
    colorType: {
      control: "radio",
      options: [
        GlobalType.ColorType.PRIMARY,
        GlobalType.ColorType.SECONDARY,
        GlobalType.ColorType.ACCENT,
        GlobalType.ColorType.GHOST,
      ],
      description: "色のタイプ値",
    },
    children: {
      description: "タグ内の要素、任意のテキストやタグなど",
    },
    onClick: {
      description: "ボタン押下時のコールバック関数",
    },
    // size: {
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
    buttonType: {
      control: "radio",
      options: [GlobalType.ButtonType.BUTTON, GlobalType.ButtonType.SUBMIT],
      description: "ボタンのタイプ値",
    },
    disabled: {
      control: "boolean",
      description: "非活性の設定",
    },
    // classes: {
    //   control: "text",
    //   description: "任意のclass要素",
    // },
    // shape: {
    //   control: "radio",
    //   options: [
    //     GlobalType.ShapeType.NONE,
    //     GlobalType.ShapeType.CIRCLE,
    //     GlobalType.ShapeType.SQUARE,
    //   ],
    //   description: "ボタンの形状タイプ（アイコンとの組み合わせで使用する）",
    // },
  },
  args: {
    // htmlForId: "dummy_id",
    children: "dummy_children",
    // color: GlobalType.ColorType.PRIMARY,
    colorType: GlobalType.ColorType.PRIMARY,
    buttonType: GlobalType.ButtonType.BUTTON,
    // size: GlobalType.SizeType.SMALL,
    sizeType: GlobalType.SizeType.SMALL,
    disabled: false,
    // classes: [],
    // shape: GlobalType.ShapeType.NONE,
  },
  parameters: {
    docs: {
      description: {
        component: "任意の文字列やアイコンを組み合わせて使用する",
      },
    },
  },
}

export const Primary: Story = {
  args: {
    // htmlForId: "primary",
    // color: GlobalType.ColorType.PRIMARY,
    colorType: GlobalType.ColorType.PRIMARY,
    children: "Primary",
  },
}

export const Secondary: Story = {
  args: {
    // htmlForId: "secondary",
    // color: GlobalType.ColorType.SECONDARY,
    colorType: GlobalType.ColorType.SECONDARY,
    children: "Secondary",
  },
}

export const Accent: Story = {
  args: {
    // htmlForId: "accent",
    // color: GlobalType.ColorType.ACCENT,
    colorType: GlobalType.ColorType.ACCENT,
    children: "Accent",
  },
}

export const Default: Story = {
  args: {
    // htmlForId: "default",
    // color: GlobalType.ColorType.DEFAULT,
    colorType: GlobalType.ColorType.DEFAULT,
    children: "Default",
    id: "color_type_default",
  },
}

// export const Natural: Story = {
//   args: {
//     htmlForId: "natural",
//     color: GlobalType.ColorType.NEUTRAL,
//     children: "Natural",
//   },
// }

export const Ghost: Story = {
  args: {
    // htmlForId: "ghost",
    // color: GlobalType.ColorType.GHOST,
    colorType: GlobalType.ColorType.GHOST,
    children: "Ghost",
  },
}

// export const AppendClasses: Story = {
//   args: {
//     htmlForId: "append-classes",
//     color: GlobalType.ColorType.PRIMARY,
//     size: GlobalType.SizeType.LARGE,
//     children: "AppendClasses",
//     classes: ["dummy-1", "dummy-2", "dummy-2"],
//   },
// }

export default meta
