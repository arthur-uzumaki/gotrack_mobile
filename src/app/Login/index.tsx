import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Field } from '@/components/Input'
import { MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { styles } from './styles'

import { getToken } from '@/storage/token-storage'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [biometricsAvailable, setBiometricsAvailable] = useState(false)
  const [tokenExists, setTokenExists] = useState(true)

  // useEffect(() => {
  //   checkBiometricsAvailability()
  // }, [])

  // useState(() => {
  //   checkToken()
  // }, [])

  // async function checkToken() {
  //   const token = await getToken()
  //   if (token) {
  //     setTokenExists(true)
  //   }
  // }
  // const checkBiometricsAvailability = async () => {
  //   try {
  //     // Para usar com react-native-biometrics:
  //     // const { available, biometryType } = await ReactNativeBiometrics.isSensorAvailable()
  //     // setBiometricsAvailable(available)
  //     setBiometricsAvailable(true) // Simulado como disponível
  //   } catch (error) {
  //     setBiometricsAvailable(false)
  //   }
  // }

  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     Alert.alert('Erro', 'Preencha todos os campos')
  //     return
  //   }

  //   if (!email.includes('@')) {
  //     Alert.alert('Erro', 'Digite um email válido')
  //     return
  //   }

  //   setLoading(true)

  //   try {
  //     // Simulação de autenticação - substituir pela sua API
  //     setTimeout(() => {
  //       setLoading(false)
  //       if (email === 'usuario@email.com' && password === '123456') {
  //         onLogin({ email, name: 'Usuário Teste' })
  //       } else {
  //         Alert.alert('Erro', 'Email ou senha incorretos')
  //       }
  //     }, 2000)
  //   } catch (error) {
  //     setLoading(false)
  //     Alert.alert('Erro', 'Falha na conexão. Tente novamente.')
  //   }
  // }

  // const handleBiometricLogin = async () => {
  //   try {
  //     // Para usar com react-native-biometrics:
  //     // const { success } = await ReactNativeBiometrics.simplePrompt({
  //     //   promptMessage: 'Confirme sua identidade'
  //     // })

  //     Alert.alert(
  //       'Autenticação Biométrica',
  //       'Use sua impressão digital ou Face ID',
  //       [
  //         { text: 'Cancelar', style: 'cancel' },
  //         {
  //           text: 'Simular Sucesso',
  //           onPress: () =>
  //             onLogin({
  //               email: 'biometric@user.com',
  //               name: 'Usuário Biométrico',
  //             }),
  //         },
  //       ]
  //     )
  //   } catch (error) {
  //     Alert.alert('Erro', 'Falha na autenticação biométrica')
  //   }
  // }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🚗</Text>
          <Text style={styles.headerSubtitle}>Bem-vindo de volta!</Text>
          <Text style={styles.headerDescription}>
            Faça login para acompanhar seus gastos com corridas
          </Text>
        </View>

        {/* Formulário */}
        <Card>
          <>
            <Field>
              <Field.Label>Email</Field.Label>
              <Field.Input
                placeholder="Digite seu e-mail"
                LeftIcon={
                  <MaterialIcons name="email" size={24} color={'gray'} />
                }
              />
            </Field>
          </>

          <>
            <Field>
              <Field.Label>Senha</Field.Label>
              <Field.Input
                placeholder="******"
                LeftIcon={
                  <MaterialIcons name="lock" size={24} color={'gray'} />
                }
              />
            </Field>
          </>

          <Button title="Entrar" variant="primary" onPress={() => {}} />

          {tokenExists && (
            <TouchableOpacity style={styles.biometricContainer}>
              <MaterialIcons name="fingerprint" size={28} color="white" />
              <Text style={styles.biometricText}>Entrar com biometria</Text>
            </TouchableOpacity>
          )}
          <View style={styles.linkContainer}>
            <Text style={styles.linkDescription}>Não tem uma conta?</Text>
            <TouchableOpacity disabled={loading}>
              <Link href={'/Register'} style={styles.linkText}>
                Cadastre-se aqui
              </Link>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}
