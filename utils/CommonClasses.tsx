import { match } from "ts-pattern"
import * as CommonTypes from "@/utils/CommonTypes"
import * as tw from "@/tailwind.config"

/**
 * ボタン配色class名
 * @param color
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
 * ボタンサイズclass名
 * @param size
 * @returns ボタンサイズclass名
 */
export const buttonSizeClasses = (size: CommonTypes.sizeType) =>
  match(size)
    .with(CommonTypes.SizeType.TINY, () => ["btn-xs"])
    .with(CommonTypes.SizeType.SMALL, () => ["btn-sm"])
    .with(CommonTypes.SizeType.LARGE, () => ["btn-lg"])
    .otherwise(() => [])

/**
 * 入力フォームサイズclass名
 * @param size
 * @returns ボタンサイズclass名
 */
export const inputSizeClasses = (size: CommonTypes.sizeType) =>
  match(size)
    .with(CommonTypes.SizeType.TINY, () => ["input-xs"])
    .with(CommonTypes.SizeType.SMALL, () => ["input-sm"])
    .with(CommonTypes.SizeType.MEDIUM, () => ["input-md"])
    .with(CommonTypes.SizeType.LARGE, () => ["input-lg"])
    .otherwise(() => [])

/**
 * ボタン形状class名
 * @param shape
 * @returns ボタン形状class名
 */
export const buttonShapeClass = (shape: CommonTypes.shapeType) =>
  match(shape)
    .with(CommonTypes.ShapeType.SQUARE, () => "btn-square")
    .with(CommonTypes.ShapeType.CIRCLE, () => "btn-circle")
    .otherwise(() => "")

/**
 * ボタンアイコン配色
 * @param color
 * @returns ボタンアイコン配色class名
 */
export const buttonIconColorClass = (color: CommonTypes.colorType, themeName?: string) => {
  let daisyuiColor = null
  if (themeName) {
    daisyuiColor = tw.daisyui.themes[0][`${themeName}`]
  }
  return match(color)
    .with(CommonTypes.ColorType.OUTLINE_DEFAULT, () => "#ffffff")
    .with(CommonTypes.ColorType.NEUTRAL, () => "#ffffff")
    .with(
      CommonTypes.ColorType.PRIMARY,
      () => daisyuiColor ?? daisyuiColor["primary-content"] ?? "#ffffff"
    )
    .with(CommonTypes.ColorType.OUTLINE_PRIMARY, () => "#ffffff")
    .with(
      CommonTypes.ColorType.SECONDARY,
      () => daisyuiColor ?? daisyuiColor["secondary-content"] ?? "#ffffff"
    )
    .with(CommonTypes.ColorType.OUTLINE_SECONDARY, () => "#ffffff")
    .with(
      CommonTypes.ColorType.ACCENT,
      () => daisyuiColor ?? daisyuiColor["accent-content"] ?? "#ffffff"
    )
    .with(CommonTypes.ColorType.OUTLINE_ACCENT, () => "#ffffff")
    .with(CommonTypes.ColorType.GHOST, () => "#ffffff")
    .otherwise(() => "#000000")
}
