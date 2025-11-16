import React from "react"
import Card, { ICard } from "../molecules/Card"
import Table, { ITable, IDrawerContentDetail } from "../molecules/Table"

export interface IDrawerDetailTable extends IDrawerContentDetail {}

export interface IDrawerDetail {
  cardContent: ICard
  tableContent: ITable<IDrawerDetailTable>
  onDrillDownClick: (item: IDrawerContentDetail) => void
  isLoading?: boolean
}

const DrawerDetail = ({
  cardContent,
  tableContent,
  onDrillDownClick,
  isLoading = false,
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
  }

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
