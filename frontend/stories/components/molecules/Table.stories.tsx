import type { Meta, StoryObj } from "@storybook/react"
import Table from "@/components/molecules/Table"

type Story = StoryObj<typeof Table>
const meta: Meta<typeof Table> = {
  title: "components/molecules/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    tableHeader: {
      description: "header部",
    },
    tableBodyList: {
      description: "body部",
    },
    handleRowClick: {
      description: "アイコンクリック時のイベント",
    },
  },
  args: {
    tableHeader: {
      id: "id",
      title: "title",
      elem1: "elem1",
      elem2: "elem2",
      elem3: "elem3",
    },
    tableBodyList: [
      {
        id: "1",
        title: "title",
        elem1: "elem1_1",
        elem2: "elem1_2",
        elem3: "elem1_3",
      },
      {
        id: "2",
        title: "title",
        elem1: "elem2_1",
        elem2: "elem2_2",
        elem3: "elem2_3",
      },
      {
        id: "3",
        title: "title",
        elem1: "elem3_1",
        elem2: "elem3_2",
        elem3: "elem3_3",
      },
      {
        id: "4",
        title: "title",
        elem1: "elem4_1",
        elem2: "elem4_2",
        elem3: "elem4_3",
      },
      {
        id: "5",
        title: "title",
        elem1: "elem5_1",
        elem2: "elem5_2",
        elem3: "elem5_3",
      },
    ],
    handleRowClick: () => {
      alert("on click!")
    },
  },
}

export const Primary: Story = {}

export default meta
