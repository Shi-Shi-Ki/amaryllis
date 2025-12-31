import React, { useState, useCallback, useEffect, SetStateAction, Dispatch } from "react"
import Table, { ITable } from "../molecules/Table"
import DrawerDetail, { IDrawerDetail } from "./DrawerDetail"
import Breadcrumbs from "../atoms/Breadcrumbs"
import { IEditableField } from "../molecules/TableRowEdit"
import { IBaseRowData } from "@/utils/CommonTypes"

export interface IDrawerList<T extends IBaseRowData> {
  drawerContent: ITable<T>
  currentDetail: IDrawerDetail<T> | null
  setCurrentDetail: Dispatch<SetStateAction<IDrawerDetail<T> | null>>
  fetchDetailData: (data: T) => Promise<IDrawerDetail<T>>
}

function DrawerList<T extends IBaseRowData>({
  drawerContent,
  currentDetail,
  setCurrentDetail,
  fetchDetailData,
}: IDrawerList<T>) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [historyStack, setHistoryStack] = useState<IDrawerDetail<T>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  /**
   * 詳細ページ（drawer）を閉じた時のイベント
   */
  useEffect(() => {
    if (!isDrawerOpen) {
      // パンくずリストの内容をクリアする
      setHistoryStack([])
      setCurrentDetail(null)
    }
  }, [isDrawerOpen, setHistoryStack, setCurrentDetail])

  /**
   * レコードの詳細ボタンを押下した時のイベント
   */
  const handleDrillDown = useCallback(
    async (itemData: T) => {
      console.log("* call handleDrillDown")
      if (!isDrawerOpen) {
        setIsDrawerOpen(true)
      }
      console.log("1 - currentDetail: ", currentDetail)
      try {
        // ローディング中フラグを立てる
        setIsLoading(true)
        // fetchDetailDataを使用してクリックされたアイテムの詳細を取得
        const newDetail = await fetchDetailData(itemData)
        console.log("itemData: ", itemData)
        // 現在のデータを履歴にプッシュ
        if (currentDetail) {
          setHistoryStack((prev) => {
            console.log("prev: ", prev)
            console.log("2 - currentDetail: ", currentDetail)
            return [...prev, currentDetail]
          })
        }
        console.log("newDetail: ", newDetail)
        // 状態を更新 -> DrawerDetailが新しい内容で再描画される
        setCurrentDetail(newDetail)
      } catch (error) {
        console.error("詳細データの取得に失敗しました:", error)
      } finally {
        // ローディング中フラグを下す
        setIsLoading(false)
        console.log("end loading.")
      }
    },
    [
      isDrawerOpen,
      setIsDrawerOpen,
      setHistoryStack,
      fetchDetailData,
      setIsLoading,
      currentDetail,
      setCurrentDetail,
    ]
  )

  /**
   * パンくずリストのリンクを押下した時のイベント
   */
  const handleNavigate = useCallback(
    (index: number) => {
      // 1. 選択された履歴のデータを取り出す
      const targetDetail = historyStack[index]
      // 2. 履歴スタックを切り詰める
      // (クリックされたインデックスの要素 + その前の要素)まで残し、それ以降を削除
      const newHistory = historyStack.slice(0, index)
      // 3. currentDetail を対象のデータに戻す
      console.log("handleNavigate - targetDetail: ", targetDetail)
      setCurrentDetail(targetDetail)
      // 4. 履歴を更新
      console.log("handleNavigate - newHistory: ", newHistory)
      setHistoryStack(newHistory)
      // 5. index = -1 (リストのルート)に戻る特別な処理が必要な場合も、このロジックで制御
    },
    [historyStack, setHistoryStack, setCurrentDetail]
  )

  /**
   * Tableコンポーネントの引数
   */
  const masterTableProps: ITable<T> = {
    ...drawerContent,
    // 外部リストのクリックも handleDrillDown で処理
    handleRowClick: handleDrillDown, // TはIDrawerContentDetailの派生なので型キャスト可能
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
          <Breadcrumbs history={historyStack} onNavigate={handleNavigate} />
          {currentDetail && (
            <DrawerDetail
              {...currentDetail}
              onDrillDownClick={handleDrillDown}
              isLoading={isLoading}
              onAddRow={currentDetail.onAddRow ?? drawerContent.onAddRow}
              editableFields={drawerContent.editableFields as IEditableField<IBaseRowData>[]}
              canAddRow={currentDetail.tableContent.canAddRow || drawerContent.canAddRow}
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default DrawerList
