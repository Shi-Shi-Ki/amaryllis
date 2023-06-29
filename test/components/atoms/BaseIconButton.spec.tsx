import { BaseIconButton, ColorList, IconList } from "@/components/atoms/BaseIconButton"
import { render } from "@testing-library/react"

describe("Base Icon Button tag test", () => {
  test("case 01", () => {
    render(<BaseIconButton id="test" color={ColorList.PRIMARY} icon={IconList.ADD} />)
  })
})