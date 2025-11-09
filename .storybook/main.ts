import type { StorybookConfig } from "@storybook/nextjs"
import path from "path"
const config: StorybookConfig = {
  core: {
    // 永続キャッシュを有効化
    builder: "@storybook/builder-webpack5",
    disableTelemetry: true,
    enableCrashReports: true,
  },

  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // {
    //   name: "@storybook/addon-postcss",
    //   options: {
    //     postcssLoaderOptions: {
    //       implementation: require("postcss"),
    //     },
    //   },
    // },
    "storybook-addon-theme-changer",
    "@storybook/addon-mdx-gfm",
    "@chromatic-com/storybook",
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  docs: {},

  staticDirs: ["../public"],

  // https://storybook.js.org/docs/react/builders/webpack#troubleshooting
  webpackFinal: async (config) => {
    if (config.cache === false) {
      config.cache = {
        type: "filesystem",
        buildDependencies: {
          config: [__filename],
        },
      }
    }

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../"),
      }
    }
    // CSSローダーの設定を修正
    const cssRule = config.module?.rules?.find(
      (rule) =>
        rule && typeof rule === "object" && rule.test instanceof RegExp && rule.test.test(".css")
    )

    if (cssRule && typeof cssRule === "object" && Array.isArray(cssRule.use)) {
      const cssLoaderConfig = cssRule.use.find(
        (loader) =>
          loader &&
          typeof loader === "object" &&
          loader.loader &&
          loader.loader.includes("css-loader")
      )

      if (cssLoaderConfig && typeof cssLoaderConfig === "object") {
        const currentOptions = cssLoaderConfig.options

        // optionsがオブジェクトであることを確認
        if (typeof currentOptions === "object" && currentOptions !== null) {
          // optionsプロパティがネストされている可能性を考慮して修正
          // ここで、currentOptionsがobjectであることを保証
          cssLoaderConfig.options = {
            ...(currentOptions.options || currentOptions),
            import: true,
            url: true,
          }
        } else {
          // optionsがオブジェクトではない場合は、単純に新しいオプションを設定
          // 例: options: 'string' の場合
          cssLoaderConfig.options = {
            import: true,
            url: true,
          }
        }
      }
    }
    return config
  },

  previewHead: (head) => `
    ${head}
    ${""}
  `,

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
}
export default config
