"use client"
import { BaseIcon } from "@/components/atoms/BaseIcon"
import React, { useState } from "react"

const data = [
  { id: 1, name: "田中 太郎", age: 25, address: "東京都" },
  { id: 2, name: "山田 花子", age: 30, address: "大阪府" },
  { id: 3, name: "佐藤 次郎", age: 22, address: "福岡県" },
  // ... more data
]

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState({} as { [key: string]: any })
  const handleRowClick = (item: { [key: string]: any }) => {
    setSelectedItem(item)
  }

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>名前</th>
              <th>年齢</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} onClick={() => handleRowClick(item)}>
                <td>
                  <label htmlFor="my-drawer" className="btn btn-circle drawer-button">
                    <BaseIcon iconName="zoom_in" htmlForId={"zoom_in_" + item.id} />
                  </label>
                </td>
                <td>{item.name}</td>
                <td>{item.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-[50rem] p-4">
          {/* Sidebar content here */}
          {selectedItem && (
            <>
              <li>
                <p>名前: {selectedItem.name}</p>
              </li>
              <li>
                <p>年齢: {selectedItem.age}</p>
              </li>
              <li>
                <p>住所: {selectedItem.address}</p>
              </li>
              {/* 他の詳細情報 */}
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
