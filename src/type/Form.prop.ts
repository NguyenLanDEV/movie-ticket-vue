type Others = {
  [key: string]: string
}

interface FormProps {
  name: string
  accessor: [() => any, (v: any) => any]
  others?: Others
  handler?: (e: any) => void
}

interface TextBoxProps extends FormProps {
  type?: 'text' | 'password' | 'number'
  placeHolder?: string
}

interface SelectProps extends FormProps {
  options?: Array<Option>
  hasFirstEmptyOption?: boolean
  onChange?: (e: any) => void
}

interface RadioProps extends FormProps {
  options: Array<Option>
  hasFirstEmptyOption?: boolean
}

interface CheckBoxGroupProps extends FormProps {
  options: Array<Option>
}

interface CheckBoxProps extends FormProps {
  label?: string
}

interface Option {
  label: string
  value: string | number
}

export type { TextBoxProps, SelectProps, RadioProps, CheckBoxGroupProps, CheckBoxProps, Option }
