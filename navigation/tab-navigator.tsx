import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIcon } from '../components/TabBarIcon';
import Home from '../screens/home';

const Tab = createBottomTabNavigator({
  screenOptions: function ScreenOptions() {
    return {
      tabBarActiveTintColor: undefined, // Use system default colors
      tabBarInactiveTintColor: undefined, // Use system default colors
    };
  },
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Home',
        tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        headerShown: false,
      },
    },
  },
});

export default Tab;
