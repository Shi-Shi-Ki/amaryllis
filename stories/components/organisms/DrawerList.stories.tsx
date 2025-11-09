import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import DrawerList from "@/components/organisms/DrawerList"
import { IDrawerContentDetail } from "@/components/molecules/Table"
import { IDrawerDetail } from "@/components/organisms/DrawerDetail"

type Story = StoryObj<typeof DrawerList>

interface IUser extends IDrawerContentDetail {
  name: string
  age: number
}

interface ITask extends IDrawerContentDetail {
  taskName: string
  status: "Todo" | "Done"
}

const userData: IUser[] = [
  { id: "u1", name: "田中 太郎", age: 25 },
  { id: "u2", name: "山田 花子", age: 30 },
  { id: "u3", name: "佐藤 次郎", age: 22 },
]

const tasks: ITask[] = [
  { id: "task-t1", taskName: "初期設定", status: "Done" },
  { id: "task-t2", taskName: "コンポーネント作成", status: "Todo" },
]

const subtasks: ITask[] = [
  { id: "sub-s1", taskName: "Card実装", status: "Done" },
  { id: "sub-s2", taskName: "Table実装", status: "Todo" },
]

const endTasks: ITask[] = [{ id: "end-1", taskName: "これ以上詳細はありません", status: "Done" }]

const buildDetail = (
  item: IDrawerContentDetail,
  nestedList: IDrawerContentDetail[]
): IDrawerDetail => {
  return {
    cardContent: {
      title: `詳細データ: ${item.name || item.taskName || item.id}`,
      description: `ID: ${item.id}\nステータス: ${item.status || "N/A"}`,
      completeButton: {
        children: "ボタン",
        onClick: () => console.log("Close"),
        colorType: GlobalType.ColorType.PRIMARY,
      },
    },
    tableContent: {
      tableHeader: { id: "id", taskName: "サブタスク名", status: "状態" },
      tableBodyList: nestedList,
      handleRowClick: () => {}, // Storybook上で上書きされる
    },
    isFirstPage: false, //todo
    onDrillDownClick: () => {},
  }
}

const mockFetchDetail = async (item: IDrawerContentDetail): Promise<IDrawerDetail> => {
  await new Promise((resolve) => setTimeout(resolve, 300)) // API遅延をシミュレート

  // IDによって返すデータを切り替える
  if (item.id === "u1") {
    // ユーザーu1 -> タスクリスト
    return buildDetail(item, tasks)
  }
  if (item.id === "task-t2") {
    // タスクt2 -> サブタスクリスト
    return buildDetail(item, subtasks)
  }
  if (item.id === "sub-s1" || item.id === "sub-s2") {
    // sub-s1 or sub-s2タスク -> endタスク
    return buildDetail(item, endTasks)
  }
  // 終端データ
  return buildDetail(item, [])
}

const drawerContentProps = {
  tableHeader: { id: "", name: "名前", age: "年齢" },
  tableBodyList: userData,
  handleRowClick: () => alert("click zoom!"),
}

// const initialDrawerDetail: IDrawerDetail = {
//   cardContent: {
//     title: "初期選択情報",
//     description: "リストから項目を選択すると、ここに詳細が表示されます。",
//     completeButton: {
//       children: "完了",
//       onClick: () => console.log("Initial complete"),
//       colorType: GlobalType.ColorType.PRIMARY,
//     },
//   },
//   tableContent: {
//     // tableHeader: { id: "id", name: "関連名", value: "値" },
//     // tableBodyList: [{ id: "d1", name: "住所", value: "東京都" }],
//     tableHeader: {},
//     tableBodyList: [],
//     handleRowClick: () => {},
//   },
//   onDrillDownClick: () => {},
//   isFirstPage: false, //todo
// }

const meta: Meta<typeof DrawerList> = {
  title: "Organisms/DrawerList (Drill Down)",
  component: DrawerList,
  tags: ["autodocs"],
  args: {
    drawerContent: drawerContentProps,
    // initialDrawerDetail: initialDrawerDetail,
    fetchDetailData: mockFetchDetail,
  },
  decorators: [
    (Story) => (
      <div style={{ height: "500px", width: "100%", border: "1px solid #ccc" }}>
        <Story />
      </div>
    ),
  ],
}

export const OpenWithInitialData: Story = {
  name: "開いた状態で表示",
  args: {
    drawerContent: drawerContentProps,
    // drawerDetail: {
    //   cardContent: {
    //     title: "初期データ (田中太郎)",
    //     description: "id: u1\nname: 田中 太郎\nage: 25",
    //     completeButton: {
    //       children: "OK",
    //       onClick: () => console.log("OK"),
    //       colorType: GlobalType.ColorType.PRIMARY,
    //     },
    //   },
    //   tableContent: initialDrawerDetail.tableContent,
    //   onDrillDownClick: () => {}
    // },
  },
  // play関数でドロワーを自動的に開く
  play: async ({ canvasElement, step }) => {
    const drawerToggle = canvasElement.querySelector("#my-drawer") as HTMLInputElement
    if (drawerToggle) {
      drawerToggle.checked = true
    }
  },
}

export default meta
