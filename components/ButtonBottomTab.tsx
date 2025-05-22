import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { StyleSheet, View } from 'react-native';

interface Props{
  children: React.ReactNode;
  onPressIn?: BottomTabBarButtonProps['onPressIn'];
  focused: boolean;
}
export const ButtonBottomTab:React.FC<Props>=({focused,children}) =>{
  console.log('focused',focused)
  return (
    // <PlatformPressable
    //   {...props}
    //   onPressIn={(ev) => {
    //     if (process.env.EXPO_OS === 'ios') {
    //       // Add a soft haptic feedback when pressing down on the tabs.
    //       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    //     }
    //     props.onPressIn?.(ev);
    //   }}
    // />
    <View style={[styles.container, focused ? {backgroundColor:Colors.primary} : {}]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    
    // borderWidth:1
    height:40,
    width:40,
    borderRadius:20,
  },
});