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
  globals: {
    themes: ["light", "dark"],
  },
}

export default preview
