import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
// import { BaseIcon } from "@/components/atoms/bk/BaseIcon"
import Icon from "@/components/atoms/Icon"
import Button from "@/components/atoms/Button"

/**
 * https://marella.github.io/material-icons/demo/
 */
type Story = StoryObj<typeof Icon>
const meta: Meta<typeof Icon> = {
  title: "components/atoms/Icon",
  component: Icon,
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
  },
  args: {
    iconName: "home",
    iconColor: GlobalType.ColorType.PRIMARY,
  },
  parameters: {
    docs: {
      description: {
        component:
          "materialアイコンを表示する<br/>一覧はこちら https://marella.github.io/material-icons/demo/",
      },
    },
  },
}

export const WithPrimaryButton: Story = {
  render: () => (
    <>
      <Button
        colorType={GlobalType.ColorType.PRIMARY}
        onClick={() => {}}
        shapeType={GlobalType.ShapeType.CIRCLE}
      >
        <Icon iconName="add" />
      </Button>
    </>
  ),
}

export const WithSecondaryButton: Story = {
  render: () => (
    <>
      <Button
        colorType={GlobalType.ColorType.SECONDARY}
        onClick={() => {}}
        shapeType={GlobalType.ShapeType.CIRCLE}
      >
        <Icon iconName="help" />
      </Button>
    </>
  ),
}

export const WithAccentButton: Story = {
  render: () => (
    <>
      <Button
        colorType={GlobalType.ColorType.ACCENT}
        onClick={() => {}}
        shapeType={GlobalType.ShapeType.CIRCLE}
      >
        <Icon iconName="language" />
      </Button>
    </>
  ),
}

export const AttachFileButton: Story = {
  render: () => (
    <>
      <Button
        colorType={GlobalType.ColorType.DEFAULT}
        onClick={() => {}}
        shapeType={GlobalType.ShapeType.CIRCLE}
      >
        <Icon iconName="attach_file" />
      </Button>
    </>
  ),
}

export const DoneButton: Story = {
  render: () => (
    <>
      <Button
        colorType={GlobalType.ColorType.DEFAULT}
        onClick={() => {}}
        shapeType={GlobalType.ShapeType.CIRCLE}
      >
        <Icon iconName="done" />
      </Button>
    </>
  ),
}

export const DownloadButton: Story = {
  render: () => (
    <>
      <Button
        colorType={GlobalType.ColorType.DEFAULT}
        onClick={() => {}}
        shapeType={GlobalType.ShapeType.CIRCLE}
      >
        <Icon iconName="download" />
      </Button>
    </>
  ),
}

export const EditButton: Story = {
  render: () => (
    <>
      <Button
        colorType={GlobalType.ColorType.DEFAULT}
        onClick={() => {}}
        shapeType={GlobalType.ShapeType.CIRCLE}
      >
        <Icon iconName="edit" />
      </Button>
    </>
  ),
}

export const DeleteButton: Story = {
  render: () => (
    <>
      <Button
        colorType={GlobalType.ColorType.DEFAULT}
        onClick={() => {}}
        shapeType={GlobalType.ShapeType.CIRCLE}
      >
        <Icon iconName="delete" />
      </Button>
    </>
  ),
}

export const ConfigButton: Story = {
  render: () => (
    <>
      <Button
        colorType={GlobalType.ColorType.DEFAULT}
        onClick={() => {}}
        shapeType={GlobalType.ShapeType.CIRCLE}
      >
        <Icon iconName="build" />
      </Button>
    </>
  ),
}

export default meta
