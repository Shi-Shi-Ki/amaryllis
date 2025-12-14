import { useState, useCallback } from "react"
import Icon from "@/components/atoms/Icon"
import TableRowEdit, { EditableFieldDefinition } from "@/components/molecules/TableRowEdit"
import { IOnAddRow } from "@/stories/components/organisms/DrawerList.stories"

export interface ITable<T extends IDrawerContentDetail> {
  tableHeader: Record<string, string>
  tableBodyList: T[]
  handleRowClick: (event: T) => void
  isLoading?: boolean
  onAddRow?: IOnAddRow
  editableFields?: EditableFieldDefinition<T>[]
  canAddRow?: boolean
}

export interface IDrawerContentDetail extends INewRecodes {
  id: string
}

export interface INewRecodes {
  [key: string]: any
}

function Table<T extends IDrawerContentDetail>({
  tableHeader,
  tableBodyList,
  handleRowClick,
  isLoading = false,
  onAddRow,
  editableFields,
  canAddRow = true,
}: ITable<T>) {
  // 新しいレコードが編集中かどうか
  const [isAdding, setIsAdding] = useState(false)
  // 保存中の状態を追加
  const [isSaving, setIsSaving] = useState(false)

  const handleStartAdding = useCallback(() => {
    if (!canAddRow) return
    console.log("handleStartAdding) editableFields:", editableFields)
    setIsAdding(true)
  }, [canAddRow])

  const handleConfirmAdd = useCallback(
    // async (newRecordData: NewRecord<T>) => {
    async (newRecordData: INewRecodes) => {
      if (!onAddRow) return

      setIsSaving(true)
      try {
        await onAddRow(newRecordData) // RHFで検証済みのデータが渡される
        setIsAdding(false)
      } catch (e) {
        console.error("保存失敗", e)
      } finally {
        setIsSaving(false)
      }
    },
    [onAddRow]
  )
  console.log("Table) editableFields:", editableFields)

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <div className="skeleton h-8 w-full mb-2"></div>
        <div className="space-y-2">
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
        </div>
      </div>
    )
  }
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        {tableHeader && (
          <thead>
            <tr>
              {Object.values(tableHeader).map((item, idx) =>
                idx == 0 ? <th key={idx}></th> : <th key={idx}>{item}</th>
              )}
            </tr>
          </thead>
        )}
        <tbody>
          {tableBodyList.map((item) => (
            <tr key={item.id}>
              {Object.keys(tableHeader).map((key, headerIdx) => {
                if (headerIdx == 0) {
                  return (
                    <th key={key}>
                      <label
                        className="btn btn-circle drawer-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRowClick(item)
                        }}
                      >
                        <Icon iconName="zoom_in" />
                      </label>
                    </th>
                  )
                }
                return <td key={key}>{item[key]}</td>
              })}
            </tr>
          ))}
          {isAdding && canAddRow && editableFields && (
            <TableRowEdit
              tableHeader={tableHeader}
              onConfirm={handleConfirmAdd}
              onCancel={() => setIsAdding(false)}
              isSaving={isSaving}
              editableFields={editableFields}
            />
          )}
        </tbody>
      </table>
      {canAddRow && !isAdding && (
        <button
          className="btn btn-sm btn-success mt-4"
          onClick={handleStartAdding}
          disabled={isSaving} // 保存中はボタンを無効化
        >
          行を追加
        </button>
      )}
      {canAddRow && isAdding && !isSaving && (
        <button className="btn btn-sm btn-ghost mt-4" disabled>
          編集中...
        </button>
      )}
    </div>
  )
}

export default Table
