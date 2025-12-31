import { useCallback } from "react"
import { ColorType, SizeType, IBaseRowData, INewRecord } from "@/utils/CommonTypes"
import { useForm, RegisterOptions, SubmitHandler } from "react-hook-form"
import TextField, { TextFieldColor } from "@/components/atoms/TextField"

type DynamicFormInput = Record<string, string>

export interface IEditableField<T extends IBaseRowData> {
  // Tは行データ型 (ITaskなど)。KはTのキー
  // ここのTは不変として扱われるため、呼び元で型アサーションする必要がある
  key: keyof T
  // RHFのバリデーションオプションをそのまま使用
  validationRules: RegisterOptions
  // カラムが編集可能か（ここでは常にtrueを想定するが、将来的な拡張性のため）
  isEditable: boolean
  // 編集不可なカラムの場合のデフォルト値 (例: '未完了')
  defaultValue?: any
}

interface NewRowEditorProps<T extends IBaseRowData> {
  // テーブルのヘッダー情報（カラム名と表示名）
  tableHeader: Record<keyof T, string>
  // 確定ボタン押下時に、編集済みデータを親に渡すコールバック
  onConfirm: (newRecord: INewRecord) => Promise<void>
  // 取消ボタン押下時に、編集状態を終了するコールバック
  onCancel: () => void
  // 親の保存処理が実行中の場合
  isSaving: boolean
  // 編集フィールド
  editableFields: IEditableField<T>[]
}

function TableRowEdit<T extends IBaseRowData>({
  tableHeader,
  onConfirm,
  onCancel,
  isSaving,
  editableFields,
}: NewRowEditorProps<T>) {
  // RHFの初期化
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DynamicFormInput>({
    // デフォルト値を動的に生成
    defaultValues: editableFields.reduce((acc, field) => {
      // 編集対象のフィールドのみをRHFの管理対象とする
      if (field.isEditable) {
        acc[field.key as string] = (field.defaultValue as string) || ""
      }
      return acc
    }, {} as DynamicFormInput),
    mode: "onChange",
  })

  // 確定処理: RHF検証後に親の onConfirm を呼び出す
  const onFormSubmit: SubmitHandler<DynamicFormInput> = useCallback(
    async (data) => {
      // 1. RHFのデータを NewRecord<T> の形式に変換し、編集不可フィールドの初期値を設定
      const fullNewRecord = editableFields.reduce((acc, field) => {
        const key = field.key as string

        if (field.isEditable) {
          // 編集された値
          ;(acc as any)[key] = data[key]
        } else {
          // 編集不可フィールドのデフォルト値
          ;(acc as any)[key] = field.defaultValue
        }
        return acc
      }, {} as INewRecord)

      // 2. 親の保存処理を呼び出す
      await onConfirm(fullNewRecord)
    },
    [onConfirm, editableFields]
  )

  return (
    <tr key="new-row-editor">
      {Object.keys(tableHeader).map((key, index) => {
        const fieldDef = editableFields.find((f) => f.key === key)

        // 編集可能なフィールドで、かつ定義が存在する場合
        const isEditable = fieldDef?.isEditable && fieldDef.key === key
        const hasError = errors[key as string]
        const errorColor: TextFieldColor = hasError ? ColorType.SECONDARY : ColorType.PRIMARY

        // 最初の列: 確定/取消ボタン (Zoomアイコンの場所)
        if (index === 0) {
          return (
            <td key={key}>
              <div className="flex gap-2">
                <button
                  className={`btn btn-sm btn-primary ${isSaving ? "loading" : ""}`}
                  onClick={handleSubmit(onFormSubmit)}
                  disabled={isSaving || !isValid}
                >
                  {isSaving ? "保存中" : "確定"}
                </button>
                <button className="btn btn-sm btn-ghost" onClick={onCancel} disabled={isSaving}>
                  取消
                </button>
              </div>
            </td>
          )
        }

        // 編集可能なカラム
        else if (isEditable) {
          return (
            <td key={key}>
              <TextField
                register={register(key as string, fieldDef!.validationRules)}
                colorType={errorColor}
                componentSizeType={SizeType.SMALL}
                widthSizeType={SizeType.LARGE}
                placeholder={tableHeader[key]}
              />
              {hasError && (
                <p className="text-error text-xs mt-1">{errors[key as string]?.message}</p>
              )}
            </td>
          )
        }

        // 編集不可のカラム
        else {
          const displayValue = fieldDef?.defaultValue || ""
          return (
            <td key={key}>
              <p>{displayValue}</p>
            </td>
          )
        }
      })}
    </tr>
  )
}

export default TableRowEdit
