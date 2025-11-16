import React from "react"
import Button, { IButton } from "@/components/atoms/Button"

export interface ICard {
  title: string
  description: string
  completeButton: IButton
  isLoading?: boolean
}

const Card = ({
  title,
  description,
  completeButton,
  isLoading = false,
}: ICard): React.JSX.Element => {
  if (isLoading) {
    return <div className="skeleton h-32 shadow-sm w-full"></div>
  }
  return (
    <div className="card bg-base-100 card-xs shadow-sm w-full">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <pre>{description}</pre>
        <div className="justify-end card-actions">
          <Button {...completeButton} />
        </div>
      </div>
    </div>
  )
}

export default Card
