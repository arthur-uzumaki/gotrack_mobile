import { MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  type TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Field } from '@/components/Input'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/use-auth-hook'
import { AxiosError } from 'axios'
import { useRouter } from 'expo-router'
import { useRef, useState, useTransition } from 'react'
import Toast from 'react-native-toast-message'
import { z } from 'zod/v4'
import { styles } from './styles'

const formSchema = z.object({
  name: z.string().min(4, 'Precisa ter 4 caracteres'),
  email: z.email('E-mail inválido').min(1, 'Precisa colocar um e-mail'),
  password: z.string().min(6, 'Precisa ter 6 caracteres'),
})

type FormSchema = z.infer<typeof formSchema>

export default function Register() {
  const { signup } = useAuth()
  const [isPending, setIsPending] = useState(false)

  const nameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const scrollViewRef = useRef<ScrollView>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  })

  const route = useRouter()

  const scrollToInput = (inputRef: React.RefObject<TextInput | null>) => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current?.measureInWindow((x, y, width, height) => {
          scrollViewRef.current?.scrollTo({
            y: y - 100,
            animated: true,
          })
        })
      }
    }, 100)
  }

  async function handleSignup({ email, name, password }: FormSchema) {
    try {
      setIsPending(true)
      await signup({
        name,
        email,
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        password,
      })

      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Cadastro salvo com sucesso',
        visibilityTime: 2000,
      })

      setTimeout(() => {
        route.navigate('/Login')
      }, 2000)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          Toast.show({
            type: 'error',
            text1: 'Email já cadastrado',
            text2:
              'Este email já está sendo usado. Tente fazer login ou use outro email.',
            visibilityTime: 2000,
          })
          return
        }
      }
      if (error instanceof Error) {
        Toast.show({
          type: 'error',
          text1: 'Servidor indisponível',
          text2:
            'Não foi possível conectar ao servidor. Tente novamente mais tarde.',
          visibilityTime: 2000,
        })
        return
      }

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error ao cadastra tenta de novo por favor.',
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🚗</Text>
            <Text style={styles.headerSubtitle}>Crie sua conta!</Text>
            <Text style={styles.headerDescription}>
              Comece a controlar seus gastos com corridas hoje mesmo
            </Text>
          </View>

          <Card>
            <>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Field error={errors.name?.message}>
                    <Field.Label>Nome Completo</Field.Label>
                    <Field.Input
                      ref={nameInputRef}
                      returnKeyType="next"
                      onSubmitEditing={() => emailInputRef.current?.focus()}
                      value={field.value}
                      onChangeText={field.onChange}
                      autoCorrect
                      spellCheck={false}
                      placeholder="Digite seu nome completo"
                      LeftIcon={
                        <MaterialIcons name="people" size={24} color={'gray'} />
                      }
                    />

                    <Field.Error />
                  </Field>
                )}
              />
            </>

            <>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Field error={errors.email?.message}>
                    <Field.Label>Email</Field.Label>
                    <Field.Input
                      ref={emailInputRef}
                      onSubmitEditing={() => passwordInputRef.current?.focus()}
                      returnKeyType="next"
                      value={field.value}
                      onChangeText={field.onChange}
                      autoCapitalize="none"
                      spellCheck={false}
                      keyboardType="email-address"
                      placeholder="seu@email.com"
                      LeftIcon={
                        <MaterialIcons name="email" size={24} color={'gray'} />
                      }
                    />

                    <Field.Error />
                  </Field>
                )}
              />
            </>

            <>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Field error={errors.password?.message}>
                    <Field.Label>Senha</Field.Label>
                    <Field.Input
                      ref={passwordInputRef}
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit(handleSignup)}
                      onFocus={() => scrollToInput(passwordInputRef)}
                      value={field.value}
                      onChangeText={field.onChange}
                      secureTextEntry
                      placeholder="******"
                      LeftIcon={
                        <MaterialIcons name="lock" size={24} color={'gray'} />
                      }
                    />
                    <Field.Error />
                  </Field>
                )}
              />
            </>

            <Button
              disabled={isPending}
              title={isPending ? 'Registrando' : 'Cadastro'}
              onPress={handleSubmit(handleSignup)}
            />

            <View style={styles.linkContainer}>
              <Text style={styles.linkDescription}>Já tem uma conta?</Text>
              <TouchableOpacity>
                <Link href={'/Login'} style={styles.linkText}>
                  Faça login aqui
                </Link>
              </TouchableOpacity>
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
