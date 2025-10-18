import React from "react"
import Button, { IButton } from "@/components/atoms/Button"

export interface ICard {
  title: string
  description: string
  completeButton: IButton
}

const Card = ({ title, description, completeButton }: ICard): React.JSX.Element => {
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
