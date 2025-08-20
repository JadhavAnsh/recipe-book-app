import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './tab-navigator';

const Stack = createStackNavigator({
  screens: {
    TabNavigator: {
      screen: TabNavigator,
      options: {
        headerShown: false,
      },
    },
  },
});

type RootNavigatorParamList = StaticParamList<typeof Stack>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootParamList {}
  }
}

const Navigation = createStaticNavigation(Stack);
export default Navigation;
