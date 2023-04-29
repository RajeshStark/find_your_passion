import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
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
import MyBottomsheet from '../../components/MyBottomshet';
import MyModal from '../../components/MyModal';

export default function Home() {
  const {colors} = useGlobal();
  const [showhead, setShowHead] = useState(true);

  return (
    <SafeAreaView>
     

      <View style={[styles.header, {backgroundColor: colors?.BackgroundColor}]}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '700',
            color: colors?.AppThemeColor,
            fontStyle: 'italic',
          }}>
          Find your passion
        </Text>
        <Octicons name="bell-fill" size={25} color={colors?.AppThemeColor} />
      </View>

      {
        showhead ?
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
          renderItem={({item, index}) => (
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
          keyExtractor={index => index}
        />
      </View>
      :
      null
      }

      <FlatList
        data={myfeed}
        style={{marginBottom: DEVICE_HEIGHT * 0.14}}
        renderItem={({item, index}) => <PostCard item={item} key={index} />}
        keyExtractor={(item, index) => index}
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
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  personname: {fontSize: 16, fontWeight: '600', marginLeft: 10},
  persontitle: {fontSize: 14, marginLeft: 10},
});
