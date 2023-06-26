import { useColorScheme, PlatformColor } from 'react-native';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { t } from '@/locales';

import { HomeScreen, SettingsScreen, AppMaskScreen } from '../screens';

export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
  AppMask: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = observer(function AppStack() {
  const isDark = useColorScheme() === 'dark';

  return (
    <Stack.Navigator
      screenOptions={{
        headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t('settingsScreen.title'),
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen
        name="AppMask"
        component={AppMaskScreen}
        options={{
          headerShown: false,
          animation: 'none',
          autoHideHomeIndicator: true,
        }}
      />
    </Stack.Navigator>
  );
});

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

const theme = {
  colors: {
    primary: PlatformColor('systemBlue'),
    text: PlatformColor('label'),
  },
};

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  return (
    <NavigationContainer {...props} theme={theme as unknown as Theme}>
      <AppStack />
    </NavigationContainer>
  );
});
