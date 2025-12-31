import React from "react"
import { IDrawerDetail } from "@/components/organisms/DrawerDetail"
import { IBaseRowData } from "@/utils/CommonTypes"

interface IBreadcrumbs<T extends IBaseRowData> {
  history: IDrawerDetail<T>[]
  onNavigate: (index: number) => void
}

const Breadcrumbs = <T extends IBaseRowData>({
  history,
  onNavigate,
}: IBreadcrumbs<T>): React.JSX.Element => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <a onClick={() => onNavigate(-1)}>リスト</a>
        </li>
        {history.map((detail, index) => (
          <li key={index}>
            <a onClick={() => onNavigate(index)}>
              {detail.cardContent.title} {/* 詳細データのタイトルを表示 */}
            </a>
          </li>
        ))}
        {/* 現在の項目はリンクなし */}
        <li>現在の項目</li>
      </ul>
    </div>
  )
}
export default Breadcrumbs
