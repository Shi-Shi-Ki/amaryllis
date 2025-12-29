import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import DrawerList, { IDrawerList } from "@/components/organisms/DrawerList"
import { IDrawerContentDetail, INewRecodes, ITable } from "@/components/molecules/Table"
import { IDrawerDetail } from "@/components/organisms/DrawerDetail"
import { JSX, useCallback, useState } from "react"
import { EditableFieldDefinition } from "@/components/molecules/TableRowEdit"

export type IOnAddRow = (newRecord: INewRecodes) => Promise<void>

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
      editableFields: editableFields as EditableFieldDefinition<IDrawerContentDetail>[],
    },
    onDrillDownClick: () => {},
    ...tableEditorPropsForITable,
  }
}

const DrawerListContainer = (args: JSX.IntrinsicAttributes & IDrawerList<IDrawerContentDetail>) => {
  const [listDataMap, setListDataMap] = useState<Map<string, ITask[]>>(createInitialMap())
  const [nextIdCounter, setNextIdCounter] = useState(1)
  const [currentDetail, setCurrentDetail] = useState<IDrawerDetail | null>(null)

  // 編集レコードで確定ボタンを押下した時のアクション
  const mockOnAddRow = useCallback(
    async (newRecord: INewRecodes, parentId: string) => {
      console.log(`Storybook: 新規レコードを保存モック (parentId: ${parentId}):`, newRecord)
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newId = `task-new-${nextIdCounter}`
      setNextIdCounter((prev) => prev + 1)

      const newFullTask: ITask = {
        id: newId,
        ...newRecord,
      } as ITask

      setListDataMap((prevMap) => {
        console.log("prevMap: ", prevMap)
        const targetList = prevMap.get(parentId)
        if (!targetList) {
          return prevMap
        }
        const updatedList = [...targetList, newFullTask]
        const newMapData = new Map(prevMap)
        newMapData.set(parentId, updatedList)

        // 表示中のリストを更新する
        console.log("currentDetail: ", currentDetail)
        setCurrentDetail((prevDetail) => {
          if (!prevDetail) return null
          console.log("prevDetail: ", prevDetail)
          return {
            ...prevDetail,
            tableContent: {
              ...prevDetail.tableContent,
              tableBodyList: newMapData.get(parentId) || prevDetail.tableContent.tableBodyList,
            },
          }
        })

        return newMapData
      })
      console.log(`新しいタスク: ${newRecord.taskName} (${newId}) をリストに追加しました`)
    },
    [nextIdCounter, currentDetail, setCurrentDetail]
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
      const onAddRowForThisLevel = (newRecord: INewRecodes) => mockOnAddRow(newRecord, parentId)
      if (taskData) {
        return buildDetail(parentId, item, taskData, taskEditableFields, onAddRowForThisLevel)
      }
      return buildDetail(parentId, item, endTasks, taskEditableFields, onAddRowForThisLevel, false)
    },
    [listDataMap, mockOnAddRow]
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

  return (
    <DrawerList
      {...args}
      drawerContent={masterTableProps}
      currentDetail={currentDetail}
      setCurrentDetail={setCurrentDetail}
      fetchDetailData={mockFetchDetail}
    />
  )
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
      editableFields: taskEditableFields as EditableFieldDefinition<IDrawerContentDetail>[],
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
