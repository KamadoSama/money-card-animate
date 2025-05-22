import { Dimensions, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import {
    GestureHandlerRootView,
    GestureEvent,
} from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Audio } from 'expo-av';

const { width } = Dimensions.get("window");


const AnimatedPressable = Animated.createAnimatedComponent(Pressable);


const DELAY = 500;


const OFFSET = 60;

interface FloatingActionButtonProps {
    isExpanded: any;
    index: number;
    buttonLetter?: string;
    children?: React.ReactNode;
    style?: any;
    song?: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ isExpanded, index, children, style, song }) => {
    // useEffect(() => {
    //     // Correction: Appeler la fonction song si elle existe
    //     if (song && isExpanded.value) {
    //        setTimeout(() => {
    //             song();
    //         }, index * 100);
    //     }
    // }, [isExpanded.value, song]);

    const animatedStyles = useAnimatedStyle(() => {
        const SPRING_CONFIG = {
            duration: isExpanded.value? 2500 : 3500 * (5 - index) ,
            overshootClamping: true,
            dampingRatio: 0.8,
            damping:10,
        };
        // highlight-next-line
        const moveValue = isExpanded.value ? OFFSET * (4 - index) : 0;
        const translateValue = withSpring(-moveValue, SPRING_CONFIG);
        //highlight-next-line
        const delay = isExpanded.value ? index * 100 : 100 * (4 - index);

        const scaleValue = isExpanded.value ? 1 : 0;

        const width =  isExpanded.value? "100%" : 0;
        
       
        return {
            // opacity:withDelay(delay, withTiming(scaleValue)),
           
            transform: [
                {scale: withDelay(delay, withTiming(scaleValue))},
                { translateY: translateValue  },
            ],
        };
    });

    return (
        <AnimatedPressable style={[animatedStyles, style, styles.button]}>
            {children}
        </AnimatedPressable>
    );
};

const index = () => {
    const [isClicked, setIsClicked] = React.useState(false);
    const position = useSharedValue<number>(0);
    const isExpanded = useSharedValue(false);
    const [sound, setSound] = React.useState<Audio.Sound | null>(null);

    // Fonction pour charger et jouer le son
    async function playPopSound() {
        console.log('Loading Sound');
        try {
            // Vous pouvez remplacer ce chemin par celui de votre fichier son
            // Assurez-vous d'ajouter votre fichier son dans le dossier assets
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/pop.mp3')
            );
            setSound(sound);
            await sound.playAsync();
        } catch (error) {
            console.error('Erreur lors de la lecture du son:', error);
        }
    }

    // Nettoyer le son lorsque le composant est démonté
    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const handlePress = () => {
        isExpanded.value = !isExpanded.value;
        // Jouer le son lorsque le menu est ouvert
        if (!isExpanded.value) {
            playPopSound();
        }
    };

    const handleClick = () => {
        setIsClicked(!isClicked);
        isExpanded.value = !isExpanded.value;
        // Jouer le son lorsque le menu est ouvert
      
    }
    useEffect(() => {
        Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
        });
      }, []);

    const plusIconStyle = useAnimatedStyle(() => {
        // highlight-next-line
        const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
        const translateValue = withTiming(moveValue);
        const rotateValue = isExpanded.value ? '45deg' : '0deg';

        return {
            transform: [
                { translateX: translateValue },
                { rotate: withTiming(rotateValue) },
            ],
        };
    });


    const middleBarStyle = useAnimatedStyle(() => {
        return {
            opacity: isClicked ? withTiming(0, { duration: DELAY }) : withTiming(1, { duration: DELAY }),
            display: isClicked ? "none" : "flex",
        }
    })

    const topBarStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: isClicked ? withTiming("45deg", { duration: DELAY }) : withTiming("0deg", { duration: DELAY }), },
                { translateX: isClicked ? 4 : 0, },
                { translateY: isClicked ? 4 : 0, }
            ],
            // backgroundColor: !isClicked? "#fff" : "blue",
        }
    })
    const bottomBarStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: isClicked ? withTiming("-45deg", { duration: DELAY }) : withTiming("0deg", { duration: DELAY }), },
                { translateX: isClicked ? 4 : 0, },
                { translateY: isClicked ? -4 : 0, }
            ],
            // backgroundColor: !isClicked? "#fff" : "red",
        }
    })

    // const handleClick = () => {
    //     // router.navigate("/floating")
    //     setIsClicked(!isClicked);
    //     isExpanded.value = !isExpanded.value;
    // }

    return (

        <SafeAreaView style={styles.safeView}>

            <Animated.View style={styles.ereaderContainer}>
                <FloatingActionButton
                    isExpanded={isExpanded}
                    index={1}
                    song={()=>playPopSound()}
                    style={styles.menuButton}
                    children={
                        <>
                            <Text style={styles.menuButtonText}>Contents • 0%</Text>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name="menu" size={20} color="#fff" />
                            </View>
                        </>
                    }

                />

                <FloatingActionButton
                    isExpanded={isExpanded}
                    index={2}
                    song={()=>playPopSound()}
                    style={styles.menuButton}
                    children={
                        <>
                            <Text style={styles.menuButtonText}>Search Book</Text>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name="search" size={20} color="#fff" />
                            </View>
                        </>
                    }
                />

                <FloatingActionButton
                    isExpanded={isExpanded}
                    index={3}
                    style={styles.menuButton}
                    song={()=>playPopSound()}
                    children={
                        <>
                            <Text style={styles.menuButtonText}>Themes & Settings</Text>
                            <View style={styles.iconContainer}>
                                <Text style={styles.fontSizeIcon}>Aa</Text>
                            </View>
                        </>
                    }
                />


                <FloatingActionButton
                    isExpanded={isExpanded}
                    index={4}
                    song={()=>playPopSound()}
                    // style={styles.menuButton}
                    children={
                        <View style={styles.bottomIcons}>
                            <TouchableOpacity style={styles.iconButton}>
                                <MaterialIcons name="share" size={20} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <MaterialIcons name="history" size={20} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <MaterialIcons name="view-list" size={20} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <MaterialIcons name="bookmark" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    }
                />

            </Animated.View>

            <Pressable style={styles.buttonBurger} onPress={() => handleClick()}>
                <Animated.View style={[styles.burgerLayer, topBarStyle]}></Animated.View>
                <Animated.View style={[styles.burgerLayer, middleBarStyle]}></Animated.View>
                <Animated.View style={[styles.burgerLayer, bottomBarStyle]}></Animated.View>
            </Pressable>

        </SafeAreaView >
    )
}

export default index

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: "#000",
        position: "relative"
    },
    buttonBurger: {
        position: "absolute",
        bottom: 40,
        right: 20,
        width: 35,
        height: 35,
        paddingHorizontal: 4,
        backgroundColor: "#393939",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",

    },
    burgerLayer: {
        width: "100%",
        height: 2,
        backgroundColor: "#fff",
        marginVertical: 4,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    box: {
        height: 120,
        width: 120,
        backgroundColor: '#b58df1',
        borderRadius: 20,
    },
    ereaderContainer: {
        width: "55%",
        padding: 10,
        alignItems: 'center',
        position: "absolute",
        bottom: 10,
        right: 20,
        // backgroundColor: '#272727',
    },
    menuButton: {
        width: '100%',
        backgroundColor: '#333',
        borderRadius: 15,
        padding: 15,
        // marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuButtonText: {
        color: '#fff',
        fontSize: 13,
    },
    iconContainer: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fontSizeIcon: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    bottomIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        // marginTop: 10,
    },
    iconButton: {
        width: "24%",
        height: 50,
        backgroundColor: '#333',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        // width: 40,
        // height: 40,
        // backgroundColor: '#82cab2',
        position: 'absolute',
        bottom: 70,
        right: 0,
        // borderRadius: 100,
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        zIndex: -2,
        // flexDirection: 'row',
    },
});