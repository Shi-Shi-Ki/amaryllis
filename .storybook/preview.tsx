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
      defaultValue: ["light", "dark"],
    },
  },

  tags: ["autodocs"]
}

export default preview
