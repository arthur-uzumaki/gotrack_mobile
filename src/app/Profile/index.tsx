import { useAuth } from '@/hooks/use-auth-hook'
import { MaterialIcons } from '@expo/vector-icons'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

export default function Profile() {
  const { user, logout } = useAuth()

  async function handleSignOut() {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {user?.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <MaterialIcons name="person" size={60} color="#94a3b8" />
          </View>
        )}
      </View>

      <Text style={styles.name}>{user?.name}</Text>

      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <MaterialIcons name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}
