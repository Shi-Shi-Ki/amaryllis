import type { StorybookConfig } from "@storybook/nextjs"
import path from "path"
const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  // https://storybook.js.org/docs/react/builders/webpack#troubleshooting
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../"),
      }
    }
    return config
  },
  previewHead: (head) => `
    ${head}
    ${""}
  `,
}
export default config
