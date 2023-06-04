"use client"
import Button from "@/components/atoms/BaseButton"

export default function About() {
  const handleClick = (e) => console.log(e)
  return (
    <div>
      <h1>about page!!!</h1>
      <Button
        color={"primary"}
        size={"large"}
        fullWidth={true}
        disabled={false}
        onClick={handleClick}
      >
        dummy
      </Button>
    </div>
  )
}
