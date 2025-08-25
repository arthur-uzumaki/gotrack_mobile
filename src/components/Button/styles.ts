import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 8,
  },

  primaryButton: {
    backgroundColor: '#3b82f6',
  },
  primaryButtonText: {
    color: '#ffffff',
  },

  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  secondaryButtonText: {
    color: '#374151',
  },

  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  outlineButtonText: {
    color: '#3b82f6',
  },

  dangerButton: {
    backgroundColor: '#ef4444',
  },
  dangerButtonText: {
    color: '#ffffff',
  },

  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  smallButtonText: {
    fontSize: 14,
  },

  mediumButton: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  mediumButtonText: {
    fontSize: 16,
  },

  largeButton: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  largeButtonText: {
    fontSize: 18,
  },

  disabledButton: {
    backgroundColor: '#9ca3af',
    borderColor: '#9ca3af',
  },
})
