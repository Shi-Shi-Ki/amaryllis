import React, { useState, useCallback } from "react"
import Table, { ITable, IDrawerContentDetail } from "../molecules/Table"
import DrawerDetail, { IDrawerDetail } from "./DrawerDetail"

export interface IDrawerList<T extends IDrawerContentDetail> {
  drawerContent: ITable<T>
  initialDrawerDetail: IDrawerDetail
  fetchDetailData: (data: IDrawerContentDetail) => Promise<IDrawerDetail>
}

function DrawerList<T extends IDrawerContentDetail>({
  drawerContent,
  initialDrawerDetail,
  fetchDetailData,
}: IDrawerList<T>) {
  const [currentDetail, setCurrentDetail] = useState<IDrawerDetail>(initialDrawerDetail)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleDrillDown = useCallback(
    async (itemData: IDrawerContentDetail) => {
      // ドロワーを開く（既に開いていればそのまま）
      if (!isDrawerOpen) {
        setIsDrawerOpen(true)
      }
      // データをフェッチ
      try {
        // fetchDetail を使用して、クリックされたアイテムの詳細を取得
        const newDetail = await fetchDetailData(itemData)
        // 状態を更新 -> DrawerDetailが新しい内容で再描画される
        setCurrentDetail(newDetail)
      } catch (error) {
        console.error("詳細データの取得に失敗しました:", error)
      }
    },
    [isDrawerOpen, fetchDetailData]
  )

  const masterTableProps: ITable<T> = {
    ...drawerContent,
    // 外部リストのクリックも handleDrillDown で処理
    handleRowClick: handleDrillDown as (event: T) => void, // TはIDrawerContentDetailの派生なので型キャスト可能
  }

  return (
    <div className="drawer drawer-end">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={() => setIsDrawerOpen(!isDrawerOpen)}
      />
      <div className="drawer-content">
        <Table {...masterTableProps} />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="bg-base-200 text-base-content min-h-full p-4 w-full md:w-2/3 flex flex-col items-center">
          <DrawerDetail {...currentDetail} onDrillDownClick={handleDrillDown} />
        </div>
      </div>
    </div>
  )
}
export default DrawerList
