import type { Preview } from "@storybook/react"
import "material-icons/iconfont/material-icons.css"
import "../app/globals.css"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  globalTypes: {
    themes: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light", // 初期表示で適用したいテーマ
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        showName: true,
      },
    },
  },

  tags: ["autodocs"],

  decorators: [
    (Story, { globals }) => {
      // globals.themesが配列であるか、または文字列であるかをチェック
      let themeValue = "light" // デフォルトテーマ

      if (globals.themes) {
        if (Array.isArray(globals.themes)) {
          // 配列の場合は、最初の要素を取得
          themeValue = globals.themes[0] || "light"
        } else if (typeof globals.themes === "string") {
          // 文字列の場合は、そのまま使用
          themeValue = globals.themes
        }
      }

      // `html`要素に `data-theme` 属性を設定
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", themeValue)
      }
      if (themeValue === "dark") {
        document.body.style.backgroundColor = "#000000"
      } else {
        document.body.style.backgroundColor = "#ffffff"
      }

      // docsページのコンポーネント背景を変更
      const docsStories = document.querySelectorAll(".docs-story")
      docsStories.forEach((el) => {
        const element = el as HTMLElement
        if (themeValue === "dark") {
          element.style.backgroundColor = "#000000"
        } else {
          element.style.backgroundColor = "#ffffff"
        }
      })

      return <Story />
    },
  ],
}

export default preview
