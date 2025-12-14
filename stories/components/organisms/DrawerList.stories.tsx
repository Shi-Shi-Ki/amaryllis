import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import DrawerList, { IDrawerList } from "@/components/organisms/DrawerList"
import { IDrawerContentDetail, INewRecodes, ITable } from "@/components/molecules/Table"
import { IDrawerDetail } from "@/components/organisms/DrawerDetail"
import { JSX, useCallback, useState } from "react"
import { EditableFieldDefinition } from "@/components/molecules/TableRowEdit"

export type IOnAddRow = (newRecord: INewRecodes) => Promise<void>

interface TableEditorProps<T extends IDrawerContentDetail> {
  // 編集対象のフィールド定義の配列 (例: taskName, status)
  editableFields: EditableFieldDefinition<T>[]
  // 新規レコードの保存ハンドラ
  onAddRow: IOnAddRow
  // (オプション) 追加機能の有効/無効
  canAddRow?: boolean
}

interface ITask extends IDrawerContentDetail {
  taskName: string
  status: "Todo" | "Done"
}

const endTasks: ITask[] = [{ id: "end-1", taskName: "これ以上詳細はありません", status: "Done" }]

// ダミーデータ
const createInitialMap = (): Map<string, ITask[]> => {
  const map = new Map<string, ITask[]>()
  map.set("1", [
    { id: "11", taskName: "タスク 1", status: "Todo" },
    { id: "12", taskName: "タスク 2", status: "Done" },
    { id: "13", taskName: "タスク 3", status: "Done" },
  ])
  map.set("11", [
    { id: "101", taskName: "環境構築", status: "Done" },
    { id: "102", taskName: "コンポーネント作成", status: "Todo" },
  ])
  map.set("12", [
    { id: "201", taskName: "テーブル設計", status: "Done" },
    { id: "202", taskName: "RDSの準備", status: "Todo" },
  ])
  map.set("13", [{ id: "0", taskName: "テストケース作成", status: "Todo" }])
  map.set("101", [
    { id: "1001", taskName: "nginxのインストール", status: "Todo" },
    { id: "1002", taskName: "nextjsのインストール", status: "Todo" },
    { id: "1003", taskName: "動作確認", status: "Todo" },
  ])
  map.set("102", [
    { id: "1011", taskName: "buttonコンポーネント", status: "Done" },
    { id: "1012", taskName: "checkboxコンポーネント", status: "Done" },
  ])
  map.set("201", [
    { id: "2001", taskName: "ユーザー情報", status: "Done" },
    { id: "2001", taskName: "購入履歴情報", status: "Done" },
    { id: "2001", taskName: "商品マスター", status: "Todo" },
  ])
  map.set("202", [
    { id: "2011", taskName: "見積もり", status: "Done" },
    { id: "2012", taskName: "インスタンス作成", status: "Todo" },
  ])
  return map
}

// タスク/サブタスク用の編集フィールド定義
const taskEditableFields: EditableFieldDefinition<ITask>[] = [
  {
    key: "taskName",
    isEditable: true,
    validationRules: {
      required: "サブタスク名は必須です",
      maxLength: {
        value: 50,
        message: "50文字以内で入力してください",
      },
    },
    defaultValue: "",
  },
  {
    key: "status",
    isEditable: false,
    validationRules: {},
    defaultValue: "Todo", // 編集不可の初期値
  },
]

const buildDetail = (
  parentId: string,
  item: IDrawerContentDetail,
  nestedList: ITask[],
  editableFields: EditableFieldDefinition<ITask>[],
  onAddRowCallback: (newRecord: INewRecodes, parentId: string) => Promise<void>,
  canAddRow: boolean = true
): IDrawerDetail => {
  const itemAsTask = item as Partial<ITask>

  const tableEditorPropsForITable = {
    onAddRow: (newRecord: INewRecodes) => onAddRowCallback(newRecord, parentId),
    editableFields: editableFields as EditableFieldDefinition<IDrawerContentDetail>[],
    canAddRow: canAddRow,
  }

  return {
    cardContent: {
      title: `詳細データ: ${item.name || itemAsTask.taskName || item.id}`,
      description: `ID: ${item.id}\nステータス: ${itemAsTask.status || "N/A"}`,
      completeButton: {
        children: "ボタン",
        onClick: () => console.log("Close"),
        colorType: GlobalType.ColorType.PRIMARY,
      },
    },
    tableContent: {
      tableHeader: { id: "", taskName: "サブタスク名", status: "状態" },
      tableBodyList: nestedList,
      handleRowClick: () => {},
    },
    onDrillDownClick: () => {},
    ...tableEditorPropsForITable,
  }
}

const DrawerListContainer = (args: JSX.IntrinsicAttributes & IDrawerList<IDrawerContentDetail>) => {
  const [listDataMap, setListDataMap] = useState<Map<string, ITask[]>>(createInitialMap())
  const [nextIdCounter, setNextIdCounter] = useState(1)

  // 編集レコードで確定ボタンを押下した時のアクション
  const mockOnAddRow = useCallback(
    async (newRecord: INewRecodes, parentId: string) => {
      console.log("Storybook: 新規レコードを保存モック:", newRecord)
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newId = `task-new-${nextIdCounter}`
      setNextIdCounter((prev) => prev + 1)

      const newFullTask: ITask = {
        id: newId,
        ...newRecord,
      } as ITask

      setListDataMap((prevMap) => {
        const targetList = prevMap.get(parentId)
        if (!targetList) {
          return prevMap
        }
        const updatedList = [...targetList, newFullTask]
        const newMapData = new Map(prevMap)
        newMapData.set(parentId, updatedList)
        return newMapData
      })
      console.log(`新しいタスク: ${newRecord.taskName} (${newId}) をリストに追加しました`)
    },
    [nextIdCounter]
  )

  // レコード追加に必要なオブジェクト
  const editingProps = {
    editableFields: taskEditableFields,
    canAddRow: true,
  }

  // 各レコードの詳細ボタンから次に表示するリストを表示する
  const mockFetchDetail = useCallback(
    async (item: IDrawerContentDetail): Promise<IDrawerDetail> => {
      // APIの待ち時間を模倣
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 300))
      console.log(`* get record data. (id: ${item.id})`)
      const parentId = item.id
      const taskData = listDataMap.get(parentId)
      if (taskData) {
        return buildDetail(parentId, item, taskData, taskEditableFields, mockOnAddRow)
      }
      return buildDetail(parentId, item, endTasks, taskEditableFields, mockOnAddRow, false)
    },
    [listDataMap, editingProps]
  )

  // ファーストビューに表示するタスクリストのオブジェクト
  const firstDataId = "1"
  const masterTableProps: ITable<ITask> = {
    ...args.drawerContent,
    tableBodyList: listDataMap.get(firstDataId) || [],
    editableFields: editingProps.editableFields,
    onAddRow: (newRecord) => mockOnAddRow(newRecord, firstDataId),
    canAddRow: true,
  }

  return <DrawerList {...args} drawerContent={masterTableProps} fetchDetailData={mockFetchDetail} />
}

const meta: Meta<typeof DrawerList> = {
  title: "Organisms/DrawerList (Drill Down)",
  component: DrawerListContainer as any,
  tags: ["autodocs"],
  args: {
    drawerContent: {
      tableHeader: { id: "", taskName: "サブタスク名", status: "状態" },
      tableBodyList: createInitialMap().get("1") || [],
      handleRowClick: () => alert("click zoom!"),
    },
    fetchDetailData: () => Promise.resolve({} as IDrawerDetail),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "500px", width: "100%", border: "1px solid #ccc" }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof DrawerList>

export const Default: Story = {}

export const OpenWithInitialData: Story = {
  name: "開いた状態で表示",
  // todo
}
