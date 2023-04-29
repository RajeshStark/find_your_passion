import React, {useMemo, useState, useEffect} from 'react'
import { Easing, View } from 'react-native'

import Fly from './flyingobjects';
import { LogBox } from 'react-native';
import { DEVICE_HEIGHT } from '../utils/Diimensions';

const DELAY = 0;
const DURATION = 3000;
const SIZE = 25;

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

const FloatingHeart = ({ animatedEmoji, objThing }) => {
    const [flyingObjects, setFlyingObjects] = useState([]); // Used to manage all flying currently objects by the Fly component
  const height = DEVICE_HEIGHT;
  
useEffect(() => {
  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
}, [])
    const objectConfig = useMemo(
      () => ({
        // Config for a single flying object which would fly in a moment
        right: {
          fromValue: 0,
          toValue: random(-0, 30),
          duration: DURATION,
          easing: Easing.elastic(5),
          delay: DELAY,
        },
        top: {
          fromValue: -28,
          toValue: -height * 0.8,
          duration: DURATION,
          delay: DELAY,
        },
        width: {
          fromValue: random(SIZE - 10, SIZE + 10),
          toValue: SIZE,
          duration: DURATION,
          easing: Easing.elastic(5),
          delay: DELAY,
        },
        height: {
          fromValue: random(SIZE - 10, SIZE + 10),
          toValue: SIZE,
          duration: DURATION,
          easing: Easing.elastic(5),
          delay: DELAY,
        },
        opacity: {
          fromValue: 1,
          toValue: 0,
          duration: DURATION,
          easing: Easing.exp,
          delay: DELAY,
        },
      }),
      [animatedEmoji]
    );

    return (
        <View>
          <Fly
            objectToFly={objThing}
            objectConfig={objectConfig}
            flyingObjects={flyingObjects}
            setFlyingObjects={setFlyingObjects}
          />
</View>
      );
}

export default FloatingHeart;