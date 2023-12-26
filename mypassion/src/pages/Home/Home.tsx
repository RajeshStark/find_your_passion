import {View, Text, SafeAreaView, StyleSheet, FlatList, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useGlobal} from '../../Hooks/GloblaContext';
import { DEVICE_WIDTH } from '../../utils/Diimensions';
import AppStrings from '../../utils/Strings';
import PostCard from '../../components/PostCard/PostCard';
import PostCardData from '../../Data/PostCarddata';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Home() {
  const {colors} = useGlobal();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors?.BackgroundColor}}>
      <View style={[styles.header, {backgroundColor: colors?.BackgroundColor}]}>
      <Text style={{fontSize: 28,color: colors?.AppThemeColor, fontFamily: "RubikMaps-Regular"}}>{AppStrings.AppName}</Text>
        <AntDesign name='message1' size={25} color={colors?.AppThemeColor} />
      </View>

      <FlatList
      contentContainerStyle={{alignItems:'center',}}
       data={PostCardData}
       renderItem={({item}) => <PostCard item={item}/>}
      />
 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
   width: DEVICE_WIDTH,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   padding: 10,

  }
})