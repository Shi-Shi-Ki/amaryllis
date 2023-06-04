import { Sample } from "@/components/atoms/Sample"
import { render } from "@testing-library/react"

describe("Sampleコンポーネント", () => {
  test("should first", () => {
    const { getByText } = render(<Sample />)
    expect(getByText("Next.js+Jestのサンプルサプリ")).toBeTruthy()
    expect(getByText("設定がすごく楽になりました。")).toBeTruthy()
  })
})
