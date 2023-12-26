import { View, Text, StatusBar} from 'react-native'
import React from 'react'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../utils/Diimensions'
import { useGlobal } from '../Hooks/GloblaContext'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AppStrings from '../utils/Strings'

export default function Splash() {
    const {colors, theme} = useGlobal();
    
  return (
    <View style={{width: DEVICE_WIDTH, height: DEVICE_HEIGHT, alignItems:'center', justifyContent: 'center', backgroundColor: colors?.AppThemeColor}}>
    <StatusBar hidden/>
    <AntDesign name={"bulb1"} color={"#fff"} size={60}/>
    <Text style={{fontSize: 36, margin: 10, color: colors?.BackgroundColor, fontFamily: "RubikDoodleShadow-Regular"}}>{AppStrings.AppName}</Text>
  </View>
  )
}