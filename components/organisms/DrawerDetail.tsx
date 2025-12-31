import React from "react"
import Card, { ICard } from "@/components/molecules/Card"
import Table, { ITable } from "@/components/molecules/Table"
import { IEditableField } from "@/components/molecules/TableRowEdit"
import { IOnAddRow } from "@/stories/components/organisms/DrawerList.stories"
import { IBaseRowData } from "@/utils/CommonTypes"

export interface IDrawerDetail<T extends IBaseRowData = IBaseRowData> {
  cardContent: ICard
  tableContent: ITable<T>
  onDrillDownClick: (item: T) => void
  editableFields: IEditableField<T>[]
  isLoading?: boolean
  onAddRow?: IOnAddRow
  canAddRow?: boolean
}

const DrawerDetail = <T extends IBaseRowData>({
  cardContent,
  tableContent,
  onDrillDownClick,
  editableFields,
  isLoading = false,
  onAddRow,
  canAddRow = true,
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
