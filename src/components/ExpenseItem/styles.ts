import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  rideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    gap: 12,
  },
  rideDetails: {
    flex: 1,
  },
  routeText: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
    marginBottom: 4,
  },
  rideInfo: {
    fontSize: 12,
    color: '#64748b',
  },
  ridePrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
})
