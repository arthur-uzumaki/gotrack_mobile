import React, { useRef, useState } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  type TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { Button } from '@/components/Button'
import { Field } from '@/components/Input'
import { useExpensesContext } from '@/contexts/expenses-context'
import { getGoTrackApi } from '@/http/server'
import { MaterialIcons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import Toast from 'react-native-toast-message'
import { z } from 'zod/v4'
import { styles } from './styles'

const expenseSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(50, 'Título deve ter no máximo 50 caracteres')
    .trim(),
  value: z
    .string()
    .min(1, 'Valor é obrigatório')
    .refine(value => {
      const numericValue = Number.parseFloat(value.replace(',', '.'))
      return !Number.isNaN(numericValue) && numericValue > 0
    }, 'Valor deve ser um número válido maior que zero'),
  service: z.enum(['Uber', '99']),
})

type ExpenseSchema = z.infer<typeof expenseSchema>

interface CreateExpenseProps {
  visible: boolean
  onClose: () => void
}

export function CreateExpense({ visible, onClose }: CreateExpenseProps) {
  const { refetchCurrent } = useExpensesContext()
  const [isCreating, setIsCreating] = useState(false)

  const titleInputRef = useRef<TextInput>(null)
  const valueInputRef = useRef<TextInput>(null)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseSchema>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: '',
      value: '',
      service: 'Uber',
    },
  })

  const services: Array<'Uber' | '99'> = ['Uber', '99']

  function formatCurrency(value: string) {
    const numericValue = value.replace(/\D/g, '')
    if (!numericValue) return ''
    const number = Number.parseFloat(numericValue) / 100
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  function parseCurrencyToNumber(value: string): number {
    if (!value) return 0
    const normalized = value.replace(/\./g, '').replace(',', '.')
    return Number(normalized)
  }

  function handleClose() {
    reset()
    onClose()
  }

  async function handleCreateExpense({ service, title, value }: ExpenseSchema) {
    try {
      setIsCreating(true)
      await getGoTrackApi().postExpenses({
        title,
        service,
        value: parseCurrencyToNumber(value),
      })

      await refetchCurrent()

      Toast.show({
        type: 'success',
        text1: 'Despesa criada',
        text2: 'A despesa foi adicionada com sucesso!',
      })

      handleClose()
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Erro ao criar despesa',
        text2: 'Tente novamente mais tarde',
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={styles.modalContainer}>
            <View style={styles.headerModal}>
              <Text style={styles.title}>Adicionar Gasto</Text>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
                disabled={isCreating}
              >
                <MaterialIcons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Field error={errors.title?.message}>
                    <Field.Label>Título</Field.Label>
                    <Field.Input
                      ref={titleInputRef}
                      placeholder="Ex: Corrida para academia"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      maxLength={50}
                      editable={!isCreating}
                      returnKeyType="next"
                      onSubmitEditing={() => valueInputRef.current?.focus()}
                      LeftIcon={
                        <MaterialIcons
                          name="directions-car"
                          size={20}
                          color="#9ca3af"
                        />
                      }
                    />
                    <Field.Error />
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="value"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Field error={errors.value?.message}>
                    <Field.Label>Valor (R$)</Field.Label>
                    <Field.Input
                      ref={valueInputRef}
                      placeholder="0,00"
                      value={value}
                      onChangeText={text => onChange(formatCurrency(text))}
                      onBlur={onBlur}
                      keyboardType="numeric"
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit(handleCreateExpense)}
                      editable={!isCreating}
                      LeftIcon={<Text style={styles.currencySymbol}>R$</Text>}
                    />
                    <Field.Error />
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="service"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.serviceField}>
                    <Text style={styles.serviceLabel}>Serviço</Text>
                    <View style={styles.serviceContainer}>
                      {services.map(serviceOption => (
                        <TouchableOpacity
                          key={serviceOption}
                          style={[
                            styles.serviceButton,
                            value === serviceOption &&
                              styles.serviceButtonActive,
                          ]}
                          onPress={() => onChange(serviceOption)}
                          disabled={isCreating}
                        >
                          <Text
                            style={[
                              styles.serviceButtonText,
                              value === serviceOption &&
                                styles.serviceButtonTextActive,
                            ]}
                          >
                            {serviceOption}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    {errors.service && (
                      <Text style={styles.errorText}>
                        {errors.service.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </ScrollView>

            <View style={styles.footer}>
              <Button
                title="Cancelar"
                onPress={handleClose}
                variant="outline"
                style={styles.cancelButton}
                disabled={isCreating}
              />

              <Button
                title="Salvar"
                onPress={handleSubmit(handleCreateExpense)}
                variant="primary"
                style={styles.saveButton}
                loading={isCreating}
                disabled={isCreating}
                icon={
                  !isCreating ? (
                    <MaterialIcons name="save" size={20} color="#ffffff" />
                  ) : undefined
                }
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}
