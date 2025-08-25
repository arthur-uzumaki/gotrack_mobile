import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  defaultCard: {
    backgroundColor: '#ffffff',
  },
  primaryCard: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
  },
  successCard: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  warningCard: {
    backgroundColor: '#fffbeb',
    borderColor: '#fed7aa',
  },
  dangerCard: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },

  smallPadding: {
    padding: 12,
  },
  mediumPadding: {
    padding: 24,
  },
  largePadding: {
    padding: 32,
  },
})
