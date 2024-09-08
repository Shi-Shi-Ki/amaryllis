import { match } from "ts-pattern"
import * as CommonTypes from "@/utils/CommonTypes"
import * as tw from "@/tailwind.config"

/**
 * ボタン配色class名
 * @param color
 * @return class名配列
 */
export const buttonColorClasses = (color: CommonTypes.colorType) =>
  match(color)
    .with(CommonTypes.ColorType.OUTLINE_DEFAULT, () => ["btn-outline"])
    .with(CommonTypes.ColorType.NEUTRAL, () => ["btn-neutral"])
    .with(CommonTypes.ColorType.PRIMARY, () => ["btn-primary"])
    .with(CommonTypes.ColorType.OUTLINE_PRIMARY, () => ["btn-outline", "btn-primary"])
    .with(CommonTypes.ColorType.SECONDARY, () => ["btn-secondary"])
    .with(CommonTypes.ColorType.OUTLINE_SECONDARY, () => ["btn-outline", "btn-secondary"])
    .with(CommonTypes.ColorType.ACCENT, () => ["btn-accent"])
    .with(CommonTypes.ColorType.OUTLINE_ACCENT, () => ["btn-outline", "btn-accent"])
    .with(CommonTypes.ColorType.GHOST, () => ["btn-ghost"])
    .with(CommonTypes.ColorType.LINK, () => ["btn-link"])
    .otherwise(() => [])

/**
 * 入力フォーム配色class名
 * @param color
 * @return class名配列
 */
export const inputColorClasses = (color: CommonTypes.colorType) =>
  match(color)
    .with(CommonTypes.ColorType.PRIMARY, () => ["input-primary"])
    .with(CommonTypes.ColorType.SECONDARY, () => ["input-secondary"])
    .with(CommonTypes.ColorType.ACCENT, () => ["input-accent"])
    .with(CommonTypes.ColorType.GHOST, () => ["input-ghost"])
    .with(CommonTypes.ColorType.ERROR, () => ["input-error"])
    .otherwise(() => [])

/**
 * ボタンサイズclass名
 * @param size
 * @returns class名配列
 */
export const buttonSizeClasses = (size: CommonTypes.sizeType) =>
  match(size)
    .with(CommonTypes.SizeType.TINY, () => ["btn-xs"])
    .with(CommonTypes.SizeType.SMALL, () => ["btn-sm"])
    .with(CommonTypes.SizeType.LARGE, () => ["btn-lg"])
    .otherwise(() => [])

/**
 * 入力フォームの横幅サイズclass名
 * @param size
 * @returns class名配列
 */
export const inputWidthSizeClasses = (size: CommonTypes.sizeType) =>
  match(size)
    .with(CommonTypes.SizeType.TINY, () => ["max-w-xs"])
    .with(CommonTypes.SizeType.SMALL, () => ["max-w-sm"])
    .with(CommonTypes.SizeType.MEDIUM, () => ["max-w-md"])
    .with(CommonTypes.SizeType.LARGE, () => ["max-w-lg"])
    .otherwise(() => [])

/**
 * ボタン形状class名
 * @param shape
 * @returns class名
 */
export const buttonShapeClass = (shape: CommonTypes.shapeType) =>
  match(shape)
    .with(CommonTypes.ShapeType.SQUARE, () => "btn-square")
    .with(CommonTypes.ShapeType.CIRCLE, () => "btn-circle")
    .otherwise(() => "")

/**
 * ボタンアイコン配色
 * @param color
 * @param themeName
 * @returns 色コード
 */
export const buttonIconColorClass = (
  color: CommonTypes.colorType,
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
