import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Keyboard, StyleSheet, TouchableOpacity, View } from "react-native";

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  color: string;
}

const CustomTabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation, color }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (isKeyboardVisible) {
    return null;
  }

  return (
    <View style={styles.contain}>
      <View style={styles.tabBarContainer}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Special styling for the center "add" button
          if (route.name === 'index') {
            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={[
                  styles.tabButton,
                  isFocused &&
                  {
                    backgroundColor: '#F0F0F0',
                    borderRadius: 70,

                  }
                ]}
              >
                <MaterialIcons name="home" size={24} color={color} />
              </TouchableOpacity>
            );
          }

          // Regular tab buttons with explicit icon rendering for each route
          if (route.name === 'wallet') {
            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={styles.tabButton}
              >
                <MaterialIcons name="credit-card" size={24} color={color} />
              </TouchableOpacity>
            );
          }

          if (route.name === 'history') {
            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={styles.tabButton}
              >
                <MaterialIcons name="history" size={24} color={color} />
              </TouchableOpacity>
            );
          }

          if (route.name === 'settings') {
            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={styles.tabButton}
              >
                <MaterialIcons name="settings" size={24} color={color} />
              </TouchableOpacity>
            );
          }


          return null;
        })}
      </View>
    </View>
  );
}

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    display: 'none',
  },
  contain: {
    paddingHorizontal: 20,
    // paddingVertical: 10,
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    // shadowColor: "#000",
  },
  tabBarContainer: {
    flexDirection: 'row',
    height: 70,
    width: '80%',
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  tabButton: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: 59,
  },
  centerButton: {
    width: 47,
    height: 47,
    borderRadius: 28,
    // backgroundColor: "#000",
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  focused: {

  }
});