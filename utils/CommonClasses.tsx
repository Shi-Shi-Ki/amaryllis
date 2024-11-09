import { match } from "ts-pattern"
import * as CommonTypes from "@/utils/CommonTypes"
import * as tw from "@/tailwind.config"

/**
 * 先頭にcomponent名を付けた配色class名
 * @param componentName
 * @param color
 * @returns component名を付加した配色class名
 */
export const addPrefixComponentNameByColor = (
  componentName: string,
  color: CommonTypes.colorType
) => `${componentName}-${color}`

/**
 * 先頭にcomponent名を付けたサイズclass名
 * @param componentName
 * @param size
 * @returns component名を付加したサイズclass名
 */
export const addPrefixComponentNameBySize = (componentName: string, size: CommonTypes.sizeType) =>
  `${componentName}-${convertSizeClassName(size)}`

/**
 * 最大横幅サイズのclass名
 * @param size
 * @returns 横幅サイズのclass名
 */
export const maxWidthElement = (size: CommonTypes.sizeType) =>
  match(size)
    .with(CommonTypes.SizeType.TINY, () => "max-w-xs")
    .with(CommonTypes.SizeType.SMALL, () => "max-w-sm")
    .with(CommonTypes.SizeType.MEDIUM, () => "max-w-md")
    .with(CommonTypes.SizeType.LARGE, () => "max-w-lg")
    .otherwise(() => "")

export const inputColorClasses = (color: CommonTypes.colorType) =>
  match(color)
    .with(CommonTypes.ColorType.NEUTRAL, () => "input-neutral")
    .with(CommonTypes.ColorType.PRIMARY, () => "input-primary")
    .with(CommonTypes.ColorType.SECONDARY, () => "input-secondary")
    .with(CommonTypes.ColorType.ACCENT, () => "input-accent")
    .with(CommonTypes.ColorType.GHOST, () => "input-ghost")
    .with(CommonTypes.ColorType.ERROR, () => "input-error")
    .otherwise(() => [])

/**
 * ボタンアイコン配色
 * @param color
 * @param themeName
 * @returns 色コード
 */
export const buttonIconColorClass = (
  color: CommonTypes.colorType | CommonTypes.colorTypeByOutLines,
  themeName?: CommonTypes.themeType
) => {
  let daisyuiColor = null
  if (themeName) {
    daisyuiColor = tw.daisyui.themes[0][`${themeName}`]
  }
  return match(color)
    .with(CommonTypes.ColorType.OUTLINE_DEFAULT, () => "#ffffff")
    .with(CommonTypes.ColorType.NEUTRAL, () => "#ffffff")
    .with(CommonTypes.ColorType.PRIMARY, () => daisyuiColor["primary-content"] ?? "#ffffff")
    .with(CommonTypes.ColorType.OUTLINE_PRIMARY, () => "#ffffff")
    .with(CommonTypes.ColorType.SECONDARY, () => daisyuiColor["secondary-content"] ?? "#ffffff")
    .with(CommonTypes.ColorType.OUTLINE_SECONDARY, () => "#ffffff")
    .with(CommonTypes.ColorType.ACCENT, () => daisyuiColor["accent-content"] ?? "#ffffff")
    .with(CommonTypes.ColorType.OUTLINE_ACCENT, () => "#ffffff")
    .with(CommonTypes.ColorType.GHOST, () => "#ffffff")
    .otherwise(() => "#000000")
}

/**
 * テーマごとのシンプルな反転色
 * @param themeName
 * @return 色コード
 */
export const simpleThemeColorName = (themeName: CommonTypes.themeType) => {
  return match(themeName)
    .with(CommonTypes.ThemeType.LIGHT, () => "#000000")
    .with(CommonTypes.ThemeType.DARK, () => "#ffffff")
    .otherwise(() => "#000000")
}

const convertSizeClassName = (size: CommonTypes.sizeType) =>
  match(size)
    .with(CommonTypes.SizeType.TINY, () => "xs")
    .with(CommonTypes.SizeType.SMALL, () => "sm")
    .with(CommonTypes.SizeType.MEDIUM, () => "md")
    .with(CommonTypes.SizeType.LARGE, () => "lg")
    .otherwise(() => "")
