import type { StorybookConfig } from "@storybook/nextjs"
import path from "path"
const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    "storybook-addon-theme-changer",
    "@storybook/addon-mdx-gfm",
    "@chromatic-com/storybook"
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  docs: {},

  staticDirs: ["../public"],

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

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
}
export default config
