import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

import type { GetExpenses200ExpensesItem } from '@/http/schemas'
import { ExpenseItem } from '../ExpenseItem'
import { LoadingSpinner } from '../Loading'
import { styles } from './styles'

interface ExpenseListProps {
  data: GetExpenses200ExpensesItem[]
  isLoading: boolean
  isLoadingMore?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
  emptyText?: string
}

export function ExpenseList({
  data,
  isLoading = false,
  isLoadingMore = false,
  onLoadMore,
  hasMore = true,
  emptyText,
}: ExpenseListProps) {
  function RenderFooter() {
    if (!isLoadingMore) {
      return null
    }

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#1e293b" />
      </View>
    )
  }

  function handleEndReached() {
    if (hasMore && !isLoadingMore && onLoadMore) {
      onLoadMore()
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ExpenseItem expense={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={[
            styles.listContainer,
            data.length === 0 && { flex: 1, justifyContent: 'center' },
          ]}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          ListFooterComponent={RenderFooter}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#64748b' }}>{emptyText}</Text>
            </View>
          }
        />
      )}
    </>
  )
}
