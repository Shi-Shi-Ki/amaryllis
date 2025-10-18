import React from "react"
import { BaseIcon } from "../atoms/bk/BaseIcon"

export interface ITable<T extends IDrawerContentDetail> {
  tableHeader: Record<string, string>
  tableBodyList: T[]
  handleRowClick: (event: T) => void
}

export interface IDrawerContentDetail {
  id: string
  [key: string]: any
}

function Table<T extends IDrawerContentDetail>({
  tableHeader,
  tableBodyList,
  handleRowClick,
}: ITable<T>) {
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
                        <BaseIcon iconName="zoom_in" htmlForId={"zoom_in_" + item.id} />
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
