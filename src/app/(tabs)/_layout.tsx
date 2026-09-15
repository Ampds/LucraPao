import { Tabs } from 'expo-router';
import { Home, Wheat, Store, BarChart3 } from 'lucide-react-native';
import { colors, fonts } from '../../theme/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#9A4500',
        tabBarInactiveTintColor: '#7A5535',
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.bodyMedium,
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="ingredientes"
        options={{
          title: 'Ingredientes',
          tabBarIcon: ({ color, size }) => <Wheat color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="mercados"
        options={{
          title: 'Mercados',
          tabBarIcon: ({ color, size }) => <Store color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="despesas"
        options={{
          title: 'Despesas',
          tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
