import React from "react"
import Card, { ICard } from "@/components/molecules/Card"
import Table, { IOnAddRow, ITable } from "@/components/molecules/Table"
import { IEditableField } from "@/components/molecules/TableRowEdit"
import { IBaseRowData } from "@/utils/CommonTypes"
import { ColumnRenderers } from "@/components/organisms/DrawerList"

export interface IDrawerDetail<T extends IBaseRowData = IBaseRowData> {
  cardContent: ICard
  tableContent: ITable<T>
  onDrillDownClick: (item: T) => void
  editableFields: IEditableField<T>[]
  isLoading?: boolean
  onAddRow?: IOnAddRow
  canAddRow?: boolean
  columnRenderers?: ColumnRenderers<T>
}

const DrawerDetail = <T extends IBaseRowData>({
  cardContent,
  tableContent,
  onDrillDownClick,
  editableFields,
  isLoading = false,
  onAddRow,
  canAddRow = true,
  columnRenderers,
}: IDrawerDetail<T>) => {
  const detailCardProps: ICard = {
    ...cardContent,
    isLoading,
  }
  // 内部Tableのクリックは、親(DrawerList)から渡された onDrillDownClick を実行
  const detailTableProps: ITable<T> = {
    ...tableContent,
    handleRowClick: onDrillDownClick,
    isLoading: isLoading,
    onAddRow: onAddRow,
    editableFields: editableFields,
    canAddRow: canAddRow,
    columnRenderers,
  }
  console.log("DrawerDetail) detailTableProps: ", detailTableProps)

  return (
    <>
      <div className="w-full">
        <Card {...detailCardProps} />
      </div>
      <div className="w-full mt-8">
        <Table {...detailTableProps} />
      </div>
    </>
  )
}
export default DrawerDetail
