interface TextField {
  label: string
  htmlForId: string
  textType?: textType
  disabled?: boolean
  validation?: validation
}

export type validation = {
  pattern?: string
  error: string
}

export const TextTypeList = {
  TEXT: "text",
  EMAIL: "email",
  PASSWORD: "password",
} as const
export type textType = (typeof TextTypeList)[keyof typeof TextTypeList]

export const BaseTextField = ({
  label,
  htmlForId,
  textType = TextTypeList.TEXT,
  disabled,
  validation,
}: TextField): JSX.Element => {
  return (
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      {validation ? (
        <>
          <input
            className="mdl-textfield__input"
            type={textType}
            pattern={validation.pattern}
            id={htmlForId}
            disabled={disabled}
          />
          <span className="mdl-textfield__error">{validation.error}</span>
        </>
      ) : (
        <input
          className="mdl-textfield__input"
          type={textType}
          id={htmlForId}
          disabled={disabled}
        />
      )}
      <label className="mdl-textfield__label" htmlFor={htmlForId}>
        {label}
      </label>
    </div>
  )
}

export default BaseTextField
