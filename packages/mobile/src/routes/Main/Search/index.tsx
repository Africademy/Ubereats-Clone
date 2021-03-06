import React, { useState, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useLazyQuery } from '@apollo/client';
import { HamburgerButton } from '../../Header/HamburgerButton';
import { SearchTextInput } from '../../Header/SearchTextInput';
import { ShoppingCartButton } from '../../Header/ShoppingCartButton';
import { Search } from 'screens/Search';
import { Food } from 'screens/Food';
import { Cart } from 'screens/Cart';
import { Order } from 'screens/Order';
import { routes } from 'constants/routes';
import { SearchFoodsByTextDocument } from './index.graphql';
import { StackParamList } from 'types/navigation';
import { useErrorFeedback } from 'hooks/useErrorFeedback';

const Stack = createStackNavigator<Pick<StackParamList, 'SEARCH' | 'FOOD' | 'CART' | 'ORDER'>>();

export const SearchNavigator = () => {
  const [searchText, setSearchText] = useState('');
  const [searchFoodsByText, { loading, data, error }] = useLazyQuery(SearchFoodsByTextDocument);
  const handleChangeSearchText = useCallback((value: string) => setSearchText(value), []);
  const handleClearSearchText = useCallback(() => setSearchText(''), []);
  const handleSubmit = useCallback(() => {
    searchFoodsByText({ variables: { searchText } });
  }, [searchText, searchFoodsByText]);

  useErrorFeedback({ message: 'failed to search', enabled: !!error });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.search}
        options={{
          headerLeft: () => <HamburgerButton />,
          headerTitle: () => (
            <SearchTextInput
              value={searchText}
              onChange={handleChangeSearchText}
              onClear={handleClearSearchText}
              onCancel={handleClearSearchText}
              onSubmit={handleSubmit}
            />
          ),
          headerTitleAlign: 'center',
          headerRight: () => <ShoppingCartButton />,
        }}
      >
        {() => <Search loading={loading} foods={data?.search_foods} />}
      </Stack.Screen>
      <Stack.Screen
        name={routes.food}
        component={Food}
        options={({ route }) => ({
          title: route.params.foodName,
          headerTitleAlign: 'center',
          headerTintColor: '#000000',
        })}
      />
      <Stack.Screen
        name={routes.cart}
        component={Cart}
        options={{
          title: 'Your Cart',
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
          headerTintColor: '#000000',
        }}
      />
      <Stack.Screen
        name={routes.order}
        component={Order}
        options={{
          title: 'Your Order',
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
          headerTintColor: '#000000',
        }}
      />
    </Stack.Navigator>
  );
};
