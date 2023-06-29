type validation = {
  pattern: string,
  error: string
}

const BaseTextField = ({
  label,
  validatePattern
}: {
  label: string,
  validatePattern?: validation
}): JSX.Element => {
  return (
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      {validatePattern ? (
        <>
          <input className="mdl-textfield__input" type="text" pattern={validatePattern.pattern} id="sample4" />
          <span className="mdl-textfield__error">{validatePattern.error}</span>
        </>
      ) : (
        <input className="mdl-textfield__input" type="text" id="sample4" />
      )}
      <label className="mdl-textfield__label" htmlFor="sample4">{label}</label>
    </div>
  )
}

export default BaseTextField