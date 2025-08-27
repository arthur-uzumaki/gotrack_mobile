import { zodResolver } from '@hookform/resolvers/zod'
import * as LocalAuthentication from 'expo-local-authentication'
import { useRouter } from 'expo-router'
import { useEffect, useRef, useState, useTransition } from 'react'
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
import { MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { styles } from './styles'

import { useAuth } from '@/hooks/use-auth-hook'
import { getToken } from '@/storage/token-storage'
import Toast from 'react-native-toast-message'
import { z } from 'zod/v4'

const formSchema = z.object({
  email: z.email('E-mail inválido').min(1, 'Precisa colocar todos os campos'),
  password: z.string().min(1, 'Precisa colocar todos os campos'),
})

type FormSchema = z.infer<typeof formSchema>

export default function Login() {
  const [tokenExists, setTokenExists] = useState(false)
  const { signin } = useAuth()
  const route = useRouter()
  const [isPending, startTransition] = useTransition()

  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const scrollViewRef = useRef<ScrollView>(null)

  const scrollToInput = (inputRef: React.RefObject<TextInput | null>) => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current?.measureInWindow((x, y, width, height) => {
          scrollViewRef.current?.scrollTo({
            y: y - 30,
            animated: true,
          })
        })
      }
    }, 100)
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    async function checkToken() {
      try {
        const tokens = await getToken()
        if (tokens?.accessToken) {
          setTokenExists(true)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setTokenExists(false)
      }
    }

    checkToken()
  }, [])

  async function handleBiometricSignin() {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync()
      const isEnrolled = await LocalAuthentication.isEnrolledAsync()

      if (!hasHardware || !isEnrolled) {
        Toast.show({
          type: 'error',
          text1: 'Biometria indisponível',
          text2:
            'Seu dispositivo não suporta biometria ou não há dados cadastrados.',
        })
        return
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autentique-se para entrar',
        fallbackLabel: 'Use sua senha',
        disableDeviceFallback: false,
        cancelLabel: 'Cancelar',
      })

      if (result.success) {
        const tokens = await getToken()
        if (tokens?.accessToken) {
          route.navigate('/Dashboard')
        } else {
          Toast.show({
            type: 'error',
            text1: 'Token não encontrado',
            text2: 'Faça login normalmente para registrar seu token.',
          })
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Autenticação falhou',
          text2: 'Não foi possível autenticar via biometria.',
        })
      }
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Ocorreu um erro ao tentar autenticar.',
      })
    }
  }

  async function handleSignin({ email, password }: FormSchema) {
    startTransition(async () => {
      try {
        await signin({ email, password })
        return route.navigate('/Dashboard')
      } catch (error) {
        console.log(error)

        if (error instanceof Error) {
          if (error.message.includes('Network')) {
            Toast.show({
              type: 'error',
              text1: 'Servidor indisponível',
              text2:
                'Não foi possível conectar ao servidor. Tente novamente mais tarde.',
            })
            return
          }
        }

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Senha ou e-mail incorretos.',
        })
      }
    })
  }

  useEffect(() => {
    async function checkTokenAndPermission() {
      try {
        const tokens = await getToken()
        if (tokens?.accessToken) {
          setTokenExists(true)

          const hasHardware = await LocalAuthentication.hasHardwareAsync()
          const isEnrolled = await LocalAuthentication.isEnrolledAsync()

          if (!hasHardware || !isEnrolled) {
            Toast.show({
              type: 'info',
              text1: 'Biometria não habilitada',
              text2:
                'Cadastre sua biometria no dispositivo para usar o login rápido.',
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    checkTokenAndPermission()
  }, [])

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
            <Text style={styles.headerSubtitle}>Bem-vindo de volta!</Text>
            <Text style={styles.headerDescription}>
              Faça login para acompanhar seus gastos com corridas
            </Text>
          </View>

          <Card>
            <>
              <Controller
                name="email"
                control={control}
                render={({ field }) => {
                  return (
                    <Field error={errors.email?.message}>
                      <Field.Label>Email</Field.Label>
                      <Field.Input
                        ref={emailInputRef}
                        onSubmitEditing={() =>
                          passwordInputRef.current?.focus()
                        }
                        returnKeyType="next"
                        keyboardType="email-address"
                        spellCheck={false}
                        autoCapitalize="none"
                        value={field.value}
                        onChangeText={field.onChange}
                        placeholder="Digite seu e-mail"
                        LeftIcon={
                          <MaterialIcons
                            name="email"
                            size={24}
                            color={'gray'}
                          />
                        }
                      />
                      <Field.Error />
                    </Field>
                  )
                }}
              />
            </>

            <>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Field error={errors.password?.message}>
                    <Field.Label>Senha</Field.Label>
                    <Field.Input
                      ref={passwordInputRef}
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit(handleSignin)}
                      onFocus={() => scrollToInput(passwordInputRef)}
                      secureTextEntry
                      value={field.value}
                      onChangeText={field.onChange}
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
              title="Entrar"
              variant="primary"
              onPress={handleSubmit(handleSignin)}
            />

            {tokenExists && (
              <TouchableOpacity
                style={styles.biometricContainer}
                onPress={handleBiometricSignin}
              >
                <MaterialIcons name="fingerprint" size={28} color="white" />
                <Text style={styles.biometricText}>Entrar com biometria</Text>
              </TouchableOpacity>
            )}
            <View style={styles.linkContainer}>
              <Text style={styles.linkDescription}>Não tem uma conta?</Text>
              <TouchableOpacity disabled={isPending}>
                <Link href={'/Register'} style={styles.linkText}>
                  Cadastre-se aqui
                </Link>
              </TouchableOpacity>
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
