import { ColorType, IBaseRowData, INewRecord } from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"
import DrawerList, { ColumnRenderers, IDrawerList } from "@/components/organisms/DrawerList"
import { ITable } from "@/components/molecules/Table"
import { IDrawerDetail } from "@/components/organisms/DrawerDetail"
import { useCallback, useState } from "react"
import { IEditableField } from "@/components/molecules/TableRowEdit"
import CheckBox from "@/components/atoms/CheckBox"

interface ITask extends IBaseRowData {
  taskName: string
  status: boolean
}

const tableHeader = { id: "", taskName: "サブタスク名", status: "状態" }

const endTasks: ITask[] = [{ id: "end-1", taskName: "これ以上詳細はありません", status: false }]

// ダミーデータ
// mapのvalueにあるidはそのタスクに含まれるサブタスクのid（map.key）を指す
const createInitialMap = (): Map<string, ITask[]> => {
  const map = new Map<string, ITask[]>()
  map.set("1", [
    { id: "11", taskName: "タスク 1", status: false },
    { id: "12", taskName: "タスク 2", status: true },
    { id: "13", taskName: "タスク 3", status: true },
  ])
  map.set("11", [
    // mapキー1の要素にあるid:11のサブタスク
    { id: "101", taskName: "環境構築", status: true },
    { id: "102", taskName: "コンポーネント作成", status: false },
  ])
  map.set("12", [
    // mapキー1の要素にあるid:12のサブタスク
    { id: "201", taskName: "テーブル設計", status: true },
    { id: "202", taskName: "RDSの準備", status: false },
  ])
  // mapキー1の要素にあるid:13のサブタスク
  map.set("13", [{ id: "0", taskName: "テストケース作成", status: true }])
  // mapキー11の要素にあるid:101のサブタスク
  map.set("101", [
    { id: "1001", taskName: "nginxのインストール", status: true },
    { id: "1002", taskName: "nextjsのインストール", status: false },
    { id: "1003", taskName: "動作確認", status: false },
  ])
  // mapキー11の要素にあるid:102のサブタスク
  map.set("102", [
    { id: "1011", taskName: "buttonコンポーネント", status: true },
    { id: "1012", taskName: "checkboxコンポーネント", status: true },
  ])
  // mapキー12の要素にあるid:201のサブタスク
  map.set("201", [
    { id: "2001", taskName: "ユーザー情報", status: true },
    { id: "2001", taskName: "購入履歴情報", status: true },
    { id: "2001", taskName: "商品マスター", status: false },
  ])
  // mapキー12の要素にあるid:202のサブタスク
  map.set("202", [
    { id: "2011", taskName: "見積もり", status: true },
    { id: "2012", taskName: "インスタンス作成", status: false },
  ])
  return map
}

/**
 * APIのレスポンスウェイトを模倣する
 * @returns
 */
const dummyWaitTime = async () =>
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 300))

// タスク/サブタスク用の編集フィールド定義
const taskEditableFields: IEditableField<ITask>[] = [
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
    defaultValue: false, // 編集不可の初期値
  },
]

/**
 * 詳細ページを開いた（ドリルダウンした）先の要素定義
 * @param parentId
 * @param item
 * @param nestedList
 * @param editableFields
 * @param onAddRowCallback
 * @param canAddRow
 * @returns
 */
const buildDetail = (
  parentId: string,
  item: IBaseRowData,
  nestedList: ITask[],
  editableFields: IEditableField<ITask>[],
  onAddRowCallback: (newRecord: INewRecord, parentId: string) => Promise<void>,
  canAddRow: boolean = true
): IDrawerDetail<ITask> => {
  const itemAsTask = item as Partial<ITask>

  const tableEditorPropsForITable = {
    onAddRow: (newRecord: INewRecord) => onAddRowCallback(newRecord, parentId),
    editableFields: editableFields as IEditableField<IBaseRowData>[],
    canAddRow: canAddRow,
  }

  return {
    cardContent: {
      title: `詳細データ: ${item.name || itemAsTask.taskName || item.id}`,
      description: `ID: ${item.id}\nステータス: ${itemAsTask.status || "N/A"}`,
      completeButton: {
        children: "ボタン",
        onClick: () => console.log("Close"),
        colorType: ColorType.PRIMARY,
      },
    },
    tableContent: {
      tableHeader: { id: "", taskName: "サブタスク名", status: "状態" },
      tableBodyList: nestedList,
      handleRowClick: () => {},
      editableFields: editableFields as IEditableField<IBaseRowData>[],
    },
    onDrillDownClick: () => {},
    ...tableEditorPropsForITable,
  }
}

const DrawerListContainer = (args: IDrawerList<ITask>) => {
  const [listDataMap, setListDataMap] = useState<Map<string, ITask[]>>(createInitialMap())
  const [currentDetail, setCurrentDetail] = useState<IDrawerDetail<ITask> | null>(null)

  /**
   * 編集レコードで確定ボタンを押下した時のアクション
   */
  const mockOnAddRow = useCallback(
    async (newRecord: INewRecord, parentId: string) => {
      console.log(`Storybook: 新規レコードを保存モック (parentId: ${parentId}):`, newRecord)
      // APIの待ち時間を模倣
      await dummyWaitTime()

      const newTaskId = crypto.randomUUID() // 本来はRDSのユニークID
      const newFullTask: ITask = {
        id: newTaskId,
        ...newRecord,
      } as ITask

      /** レコードの追加処理 */
      setListDataMap((prevMap) => {
        console.log("prevMap: ", prevMap)
        const targetList = prevMap.get(parentId)
        if (!targetList) {
          return prevMap
        }
        const updatedList = [...targetList, newFullTask]
        const newMapData = new Map(prevMap)
        newMapData.set(parentId, updatedList)

        /** 表示中のリストを更新する */
        console.log("currentDetail: ", currentDetail)
        setCurrentDetail((prevDetail) => {
          if (!prevDetail) {
            return null
          }
          console.log("prevDetail: ", prevDetail)
          return {
            ...prevDetail,
            tableContent: {
              ...prevDetail.tableContent,
              tableBodyList: updatedList,
            },
          }
        })

        return newMapData
      })
      console.log(`新しいタスク: ${newRecord.taskName} (${newTaskId}) をリストに追加しました`)
    },
    [currentDetail, setCurrentDetail, setListDataMap]
  )

  const handleStatusChange = useCallback(
    (taskId: string, parentId: string, status: boolean) => {
      setListDataMap((prevMap) => {
        const newMap = new Map(prevMap)
        const list = newMap.get(parentId)
        if (!list) {
          return prevMap
        }
        const updatedList = list.map((task) =>
          task.id === taskId ? { ...task, status: status } : task
        )
        console.log("handleStatusChange) updatedList: ", updatedList)
        newMap.set(parentId, updatedList)
        setCurrentDetail((prevDetail) => {
          if (!prevDetail) {
            return null
          }
          return {
            ...prevDetail,
            tableContent: {
              ...prevDetail.tableContent,
              tableBodyList: updatedList,
            },
          }
        })
        return newMap
      })
    },
    [setListDataMap, setCurrentDetail]
  )

  // レコード追加に必要なオブジェクト
  const editingProps = {
    editableFields: taskEditableFields,
    canAddRow: true,
  }

  /**
   * 各レコードの詳細ボタンから次に表示するリストを表示する
   */
  const mockFetchDetail = useCallback(
    async (item: ITask): Promise<IDrawerDetail<ITask>> => {
      // APIの待ち時間を模倣
      await dummyWaitTime()
      console.log(`* get record data. (id: ${item.id})`)
      const parentId = item.id
      const taskDataList = listDataMap.get(parentId)
      const onAddRowForThisLevel = (newRecord: INewRecord) => mockOnAddRow(newRecord, parentId)
      // 詳細ボタンを押下した際に親IDに紐づくデータを渡す、行追加機能（バリデーション、行追加アクション）を返す
      if (taskDataList) {
        return buildDetail(parentId, item, taskDataList, taskEditableFields, onAddRowForThisLevel)
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

  /**
   * タスクIDから親IDを取得する（ここは本来APIとして提供する機能）
   * @param taskId
   */
  const getParentIdByTaskId = async (taskId: string) => {
    // APIのタイムラグを模倣
    await dummyWaitTime()
    // 本来はここでtaskIdをリクエストに渡して親IDを得る
    // storybookではダミーデータから算出して返す形にする
    for (const [parentId, values] of listDataMap) {
      if (values.some((t) => t.id === taskId)) {
        return parentId
      }
    }
    return null
  }

  const taskRenderers: ColumnRenderers<ITask> = {
    status: (value, row) => (
      <CheckBox
        label={value ? "完了" : "未完了"}
        value={row.id}
        colorType={ColorType.PRIMARY}
        // checked={value} // ITask.status (boolean) をそのまま渡す
        isDefaultChecked={value}
        onChange={async () => {
          // どの親リストに属しているか等のコンテキストに応じて更新
          // ここでは簡易的に taskId を渡して制御
          console.log(`Task ${row.id} changed to ${!value}`)
          // parentIdを特定するロジックをここに挟む
          const parentId = await getParentIdByTaskId(row.id)
          if (!parentId) {
            throw new Error(`not found parent id. (task_id: ${row.id})`)
          }
          console.log(`change status. (parentId: ${parentId}, value: ${!value})`)
          handleStatusChange(row.id, parentId, !value)
        }}
      />
    ),
  }

  return (
    <DrawerList<ITask>
      {...args}
      drawerContent={masterTableProps}
      currentDetail={currentDetail}
      setCurrentDetail={setCurrentDetail}
      fetchDetailData={mockFetchDetail}
      columnRenderers={taskRenderers}
    />
  )
}

const meta: Meta<typeof DrawerList> = {
  title: "components/organisms/DrawerList (Drill Down)",
  component: DrawerListContainer,
  tags: ["autodocs"],
  args: {
    drawerContent: {
      tableHeader: tableHeader,
      tableBodyList: createInitialMap().get("1") || [],
      handleRowClick: () => alert("click zoom!"),
      editableFields: taskEditableFields as IEditableField<IBaseRowData>[],
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
