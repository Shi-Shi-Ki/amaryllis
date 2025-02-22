import _ from "lodash"

/**
 * テーマタイプ
 */
export const ThemeType = {
  NONE: "",
  LIGHT: "light",
  DARK: "dark",
} as const
export type themeType = (typeof ThemeType)[keyof typeof ThemeType]

/**
 * テーマタイプの検証
 * @param value
 * @returns
 */
export const isValidThemeType = (value: string): value is themeType => {
  return Object.values(ThemeType).includes(value as themeType)
}

/**
 * 配色タイプ
 */
export const ColorType = {
  DEFAULT: "default",
  NEUTRAL: "neutral",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ACCENT: "accent",
  GHOST: "ghost",
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
  OUTLINE_DEFAULT: "outline_default",
  OUTLINE_PRIMARY: "outline_primary",
  OUTLINE_SECONDARY: "outline_secondary",
  OUTLINE_ACCENT: "outline_accent",
  LINK: "link",
} as const
export type colorType = (typeof ColorType)[keyof typeof ColorType]

/**
 * アウトライン系の配色タイプ
 */
export const ColorTypeByOutLines = {
  OUTLINE_DEFAULT: "outline_default",
  OUTLINE_PRIMARY: "outline_primary",
  OUTLINE_SECONDARY: "outline_secondary",
  OUTLINE_ACCENT: "outline_accent",
} as const
export type colorTypeByOutLines = (typeof ColorTypeByOutLines)[keyof typeof ColorTypeByOutLines]

/**
 * サイズタイプ
 */
export const SizeType = {
  TINY: "tiny",
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const
export type sizeType = (typeof SizeType)[keyof typeof SizeType]

/**
 * 形状タイプ
 */
export const ShapeType = {
  SQUARE: "square",
  CIRCLE: "circle",
  NONE: "none",
} as const
export type shapeType = (typeof ShapeType)[keyof typeof ShapeType]

/**
 * ボタンタイプ
 */
export const ButtonType = {
  BUTTON: "button",
  SUBMIT: "submit",
} as const
export type buttonType = (typeof ButtonType)[keyof typeof ButtonType]

/**
 * ボタンMethodタイプ
 */
export const MethodType = {
  GET: "GET",
  POST: "POST",
} as const
export type methodType = (typeof MethodType)[keyof typeof MethodType]

/**
 * テキストフォームタイプ
 */
export const TextType = {
  TEXT: "text",
  EMAIL: "email",
  PASSWORD: "password",
} as const
export type textType = (typeof TextType)[keyof typeof TextType]
