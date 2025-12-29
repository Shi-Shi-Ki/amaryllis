import React from "react"
import Card, { ICard } from "@/components/molecules/Card"
import Table, { ITable, IDrawerContentDetail } from "@/components/molecules/Table"
import { EditableFieldDefinition } from "@/components/molecules/TableRowEdit"
import { IOnAddRow } from "@/stories/components/organisms/DrawerList.stories"

export interface IDrawerDetailTable extends IDrawerContentDetail {}

export interface IDrawerDetail {
  cardContent: ICard
  tableContent: ITable<IDrawerDetailTable>
  onDrillDownClick: (item: IDrawerContentDetail) => void
  editableFields: EditableFieldDefinition<IDrawerDetailTable>[]
  isLoading?: boolean
  onAddRow?: IOnAddRow
  canAddRow?: boolean
}

const DrawerDetail = ({
  cardContent,
  tableContent,
  onDrillDownClick,
  editableFields,
  isLoading = false,
  onAddRow,
  canAddRow = true,
}: IDrawerDetail) => {
  const detailCardProps: ICard = {
    ...cardContent,
    isLoading,
  }
  // 内部Tableのクリックは、親(DrawerList)から渡された onDrillDownClick を実行
  const detailTableProps: ITable<IDrawerContentDetail> = {
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
