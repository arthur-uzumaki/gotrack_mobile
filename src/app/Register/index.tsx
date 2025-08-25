import { MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Field } from '@/components/Input'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // const validateForm = () => {
  //   if (!name.trim()) {
  //     Alert.alert('Erro', 'Nome é obrigatório')
  //     return false
  //   }

  //   if (!email.trim()) {
  //     Alert.alert('Erro', 'Email é obrigatório')
  //     return false
  //   }

  //   if (!email.includes('@') || !email.includes('.')) {
  //     Alert.alert('Erro', 'Digite um email válido')
  //     return false
  //   }

  //   if (!password) {
  //     Alert.alert('Erro', 'Senha é obrigatória')
  //     return false
  //   }

  //   if (password.length < 6) {
  //     Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres')
  //     return false
  //   }

  //   if (!confirmPassword) {
  //     Alert.alert('Erro', 'Confirmação de senha é obrigatória')
  //     return false
  //   }

  //   if (password !== confirmPassword) {
  //     Alert.alert('Erro', 'As senhas não coincidem')
  //     return false
  //   }

  //   return true
  // }

  // const handleRegister = async () => {
  //   if (!validateForm()) {
  //     return
  //   }

  //   setLoading(true)

  //   try {
  //     // Simulação de cadastro - substituir pela sua API
  //     setTimeout(() => {
  //       setLoading(false)
  //       Alert.alert('Sucesso!', 'Conta criada com sucesso. Seja bem-vindo!', [
  //         {
  //           text: 'OK',
  //           onPress: () =>
  //             onRegister({
  //               email: email.trim(),
  //               name: name.trim(),
  //             }),
  //         },
  //       ])
  //     }, 2000)
  //   } catch (error) {
  //     setLoading(false)
  //     Alert.alert('Erro', 'Falha ao criar conta. Tente novamente.')
  //   }
  // }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🚗</Text>
          <Text style={styles.headerSubtitle}>Crie sua conta!</Text>
          <Text style={styles.headerDescription}>
            Comece a controlar seus gastos com corridas hoje mesmo
          </Text>
        </View>

        {/* Formulário */}
        <Card>
          <>
            <Field>
              <Field.Label>Nome Completo</Field.Label>
              <Field.Input
                placeholder="Digite seu nome completo"
                LeftIcon={
                  <MaterialIcons name="people" size={24} color={'gray'} />
                }
              />
            </Field>
          </>

          <>
            <Field>
              <Field.Label>Email</Field.Label>
              <Field.Input
                placeholder="seu@email.com"
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

          <Button title="Cadastrar" onPress={() => {}} />

          <View style={styles.linkContainer}>
            <Text style={styles.linkDescription}>Já tem uma conta?</Text>
            <TouchableOpacity disabled={loading}>
              <Link href={'/Login'} style={styles.linkText}>
                Faça login aqui
              </Link>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}
