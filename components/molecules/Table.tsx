import React from "react"
import Icon from "@/components/atoms/Icon"

export interface ITable<T extends IDrawerContentDetail> {
  tableHeader: Record<string, string>
  tableBodyList: T[]
  handleRowClick: (event: T) => void
  isLoading?: boolean
}

export interface IDrawerContentDetail {
  id: string
  [key: string]: any
}

function Table<T extends IDrawerContentDetail>({
  tableHeader,
  tableBodyList,
  handleRowClick,
  isLoading = false,
}: ITable<T>) {
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
                        // htmlFor="my-drawer"
                        className="btn btn-circle drawer-button"
                        // onClick={() => handleRowClick(item)}
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
        </tbody>
      </table>
    </div>
  )
}

export default Table
