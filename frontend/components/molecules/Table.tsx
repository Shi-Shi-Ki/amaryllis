import { useState, useCallback } from "react"
import Icon from "@/components/atoms/Icon"
import TableRowEdit, { IEditableField } from "@/components/molecules/TableRowEdit"
import { IBaseRowData, INewRecord } from "@/utils/CommonTypes"
import { ColumnRenderers } from "@/components/organisms/DrawerList"

export type IOnAddRow = (newRecord: INewRecord) => Promise<void>

export interface ITable<T extends IBaseRowData> {
  tableHeader: Record<keyof T, string>
  tableBodyList: T[]
  handleRowClick: (event: T) => void
  isLoading?: boolean
  onAddRow?: IOnAddRow
  editableFields: IEditableField<T>[]
  canAddRow?: boolean
  columnRenderers?: ColumnRenderers<T>
}

function Table<T extends IBaseRowData>({
  tableHeader,
  tableBodyList,
  handleRowClick,
  isLoading = false,
  onAddRow,
  editableFields,
  canAddRow = true,
  columnRenderers,
}: ITable<T>) {
  // 新しいレコードが編集中かどうか
  const [isAdding, setIsAdding] = useState(false)
  // 保存中の状態を追加
  const [isSaving, setIsSaving] = useState(false)

  const handleStartAdding = useCallback(() => {
    if (!canAddRow) {
      return
    }
    console.log("handleStartAdding) editableFields:", editableFields)
    setIsAdding(true)
  }, [canAddRow, editableFields, setIsAdding])

  const handleConfirmAdd = useCallback(
    async (newRecordData: INewRecord) => {
      if (!onAddRow) {
        return
      }

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
    [onAddRow, setIsSaving, setIsAdding]
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
                const renderer = columnRenderers?.[key as keyof T]
                const cellValue = item[key as keyof T]
                return <td key={key}>{renderer ? renderer(cellValue, item) : item[key]}</td>
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
