import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {useGlobal} from '../../Hooks/GloblaContext';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/Diimensions';
import {TouchableOpacity} from 'react-native';
import {myfeed} from '../../Data/myfeed';
import PostCard from './PostCard';
import GestureRecognizer from 'react-native-swipe-gestures';


export default function Home() {
  const {colors} = useGlobal();
  const [showhead, setShowHead] = useState(true);
  const [passion, setPassion] = useState('My Feed');

  const Arr = [
    'My Feed',
    'music',
    'photography',
    'coding',
    'drawing',
    'physics',
  ];

  const getMyfeed = value => {
    if (value === 'My Feed') {
      return myfeed;
    }
    const val = myfeed.filter(i => i.passion === value);
    return val;
  };
  return (
    <SafeAreaView>
      <View style={[styles.header, {backgroundColor: colors?.BackgroundColor}]}>
        <Text style={[styles.headertxt, {color: colors?.AppThemeColor}]}>
          Find your passion
        </Text>
        <Octicons name="bell-fill" size={25} color={colors?.AppThemeColor} />
      </View>

      <View style={{flexDirection: 'row'}}>
        <FlatList
          data={Arr}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => setPassion(item)}
              style={
                item === passion
                  ? [styles.tileview, {backgroundColor: colors?.AppThemeColor}]
                  : [styles.inActivetileview, {borderColor: colors?.textColor}]
              }>
              <Text
                style={
                  item === passion
                    ? [styles.tiletxt, {color: colors?.BackgroundColor}]
                    : [styles.tiletxt, {color: colors?.textColor}]
                }>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={index => index}
        />
      </View>
  
      {getMyfeed(passion).length !== 0 ? (
        <FlatList
          data={getMyfeed(passion)}
          style={{
            marginBottom:
              Platform.OS === 'ios'
                ? DEVICE_HEIGHT * 0.12
                : DEVICE_HEIGHT * 0.14,
          }}
          renderItem={({item, index}) => <PostCard data={item}  />}
        />
      ) : (
        <Text style={[styles.nodatatxt, {color: colors?.AppThemeColor}]}>
          No Data Found
        </Text>
      )}
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
  headertxt: {
    fontSize: 26,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  nodatatxt: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: DEVICE_HEIGHT * 0.3,
    alignSelf: 'center',
  },
  tiletxt: {fontSize: 16, fontWeight: '600'},
  tileview: {padding: 10, borderRadius: 5, margin: 5},
  inActivetileview: {padding: 10, borderRadius: 5, margin: 5, borderWidth: 1},
  personview: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  personname: {fontSize: 16, fontWeight: '600', marginLeft: 10},
  persontitle: {fontSize: 14, marginLeft: 10},
});
