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
 * 配色タイプ
 */
export const ColorType = {
  DEFAULT: "default",
  OUTLINE_DEFAULT: "outline_default",
  NEUTRAL: "neutral",
  PRIMARY: "primary",
  OUTLINE_PRIMARY: "outline_primary",
  SECONDARY: "secondary",
  OUTLINE_SECONDARY: "outline_secondary",
  ACCENT: "accent",
  OUTLINE_ACCENT: "outline_accent",
  GHOST: "ghost",
  LINK: "link",
  ERROR: "error",
} as const
export type colorType = (typeof ColorType)[keyof typeof ColorType]

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
