import { createContext, useContext } from 'react'
import { Text, TextInput, type TextInputProps, View } from 'react-native'

import { styles } from './styles'

type FieldContextProps = {
  error?: string
}

const FieldContext = createContext<FieldContextProps>({})

export function Field({
  error,
  children,
}: { error?: string; children: React.ReactNode }) {
  return (
    <FieldContext.Provider value={{ error }}>
      <View style={styles.field}>{children}</View>
    </FieldContext.Provider>
  )
}

Field.Label = function FieldLabel({ children }: { children: React.ReactNode }) {
  return <Text style={styles.inputLabel}>{children}</Text>
}

type FieldInputProps = TextInputProps & {
  LeftIcon?: React.ReactNode
  RightIcon?: React.ReactNode
}

Field.Input = function FieldInput({
  LeftIcon,
  RightIcon,
  style,
  ...props
}: FieldInputProps) {
  const { error } = useContext(FieldContext)

  return (
    <View
      style={[
        styles.inputContainer,
        error && styles.inputError,
        !props.editable && styles.inputDisabled,
      ]}
    >
      {LeftIcon && <View style={styles.leftIcon}>{LeftIcon}</View>}

      <TextInput
        style={[styles.textInput, style]}
        placeholderTextColor="#9ca3af"
        {...props}
      />

      {RightIcon && <View style={styles.rightIcon}>{RightIcon}</View>}
    </View>
  )
}

Field.Error = function FieldError() {
  const { error } = useContext(FieldContext)
  if (!error) return null
  return <Text style={styles.errorText}>{error}</Text>
}
