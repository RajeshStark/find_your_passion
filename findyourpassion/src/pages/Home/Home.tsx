import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {useGlobal} from '../../Hooks/GloblaContext';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/Diimensions';
import {TouchableOpacity} from 'react-native';
import {myfeed} from '../../Data/myfeed';
import PostCard from './PostCard';

export default function Home() {
  const {colors} = useGlobal();
  return (
    <SafeAreaView>
      <View style={[styles.header, {backgroundColor: colors?.BackgroundColor}]}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '700',
            fontFamily: 'roboto',
            color: colors?.AppThemeColor,
            fontStyle: 'italic',
          }}>
          Find your passion
        </Text>
        <Octicons name="bell-fill" size={25} color={colors?.AppThemeColor} />
      </View>
      
      <View style={{flexDirection: 'row'}}>
        <FlatList
          data={[
            'My Feed',
            'music',
            'photography',
            'coding',
            'drawing',
            'physics',
          ]}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.tileview,
                {backgroundColor: colors?.AppThemeColor},
              ]}>
              <Text style={[styles.tiletxt, {color: colors?.BackgroundColor}]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={myfeed}
        style={{marginBottom: DEVICE_HEIGHT * 0.14}}
        renderItem={({item}) => (
          <PostCard item={item} />
        )}
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
  },
  tiletxt: {fontSize: 16, fontWeight: '600'},
  tileview: {padding: 10, borderRadius: 5, margin: 5},

  personview: {
    // marginTop: 30,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // backgroundColor: 'red'
  },
  personname: {fontSize: 16, fontWeight: '600', marginLeft: 10},
  persontitle: {fontSize: 14, marginLeft: 10},
});
