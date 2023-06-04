import _ from 'lodash'

type Map = {
  key: string
  class: string[]
}
const ColorSetting: Map[] = [{
  key: '',
  class: []
}]
const SizeSetting: Map[] = []

export const Button = ({
  children,
  color = 'default',
  size = 'small',
  fullWidth = false,
  disabled = false,
  classes = [],
  onClick,
}: {
  children: React.ReactNode
  color?: 'default' | 'primary' | 'secondary' | 'danger'
  size?: 'large' | 'medium' | 'small'
  fullWidth?: boolean
  disabled?: boolean
  classes?: string[]
  onClick?: (event: any) => void
}): JSX.Element => {
  const _color = _.head(
    ColorSetting.filter((map: Map) => map.key === color).map(
      (map: Map) => map.class
    )
  ) || []

  const _size = _.head(
    SizeSetting.filter((map: Map) => map.key === size).map(
      (map: Map) => map.class
    )
  ) || []
  
  const className = [
    'inline-flex',
    ..._color, // 指定されたカラーのクラス群をマージ
    ..._size,
    ...classes, // 指定されたカスタムクラスをマージ
  ].join(' ')

  const handleSubmit = (event: any) => {
    if (onClick && !disabled) { // disabledになったら、イベントをキャンセル
      onClick(event)
    }
  }

  return (
    <button
      // fullWithやdisabledの場合、クラスを追加する
      className={`${className} ${fullWidth ? 'w-full' : ''} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={handleSubmit}
    >
      {children}
    </button>
  )
}
export default Button