import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/Diimensions';
import {useGlobal} from '../../Hooks/GloblaContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyModal from '../../components/MyModal';
import {Elipsis} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import { ActivityIndicator } from 'react-native';
import MyContentSlider from '../../components/MyContentSlider';

export default function PostCard({data}) {
  const navigation = useNavigation();

  const {colors} = useGlobal();
  const [showContent, setShowContent] = useState({
    show: false,
    media: [],
  });
  const [like, setLike] = useState(false);
  const medialength = data.media.length;
  const [mute, setmute] = useState(true)

  return (
    <View
      style={{
        width: DEVICE_WIDTH * 0.95,
        backgroundColor: colors?.BackgroundColor,
        alignItems: 'center',
        padding: 20,
        alignSelf: 'center',
        borderRadius: 15,
        marginTop: 10,
      }}>
      <View style={{alignSelf: 'flex-start', marginLeft: -10}}>
        <View style={styles.personview}>
          <Image
            source={{uri: data.avatar}}
            style={{width: 40, height: 40, borderRadius: 20}}
          />
          <View>
            <Text style={[styles.personname, {color: colors?.textColor}]}>
              {data.creater_name}
            </Text>
            <Text style={[styles.persontitle, {color: colors?.textColor}]}>
              {data.creater_info}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={data.media}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        pagingEnabled={true}
        style={{width: DEVICE_WIDTH * 0.9}}
        snapToInterval={DEVICE_WIDTH * 0.9}
        renderItem={({item, index}) => (
         <MyContentSlider data={data} item={item} index={index}/>
        )}
      />

      <Pressable
        onPress={() =>
          navigation.navigate('Fullpost', {
            item: data,
          })
        }>
        <Text
          style={{
            fontSize: 14,
            color: colors?.textColor,
            marginLeft: -10,
            marginTop: 10,
          }}>
          {Elipsis(data.detail, 150)}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Pressable
            style={{
              width: DEVICE_WIDTH * 0.3,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: like ? '#8c74e8' : colors?.BackgroundColor,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => setLike(!like)}>
            <MaterialCommunityIcons
              name="hand-clap"
              size={25}
              color={like ? colors?.BackgroundColor : colors?.textColor}
            />
            <Text
              style={{
                padding: 5,
                fontSize: 14,
                color: like ? colors?.BackgroundColor : colors?.textColor,
              }}>
              {data.likes}
            </Text>
          </Pressable>

          <Pressable
            style={{
              width: DEVICE_WIDTH * 0.3,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            onPress={() =>
              navigation.navigate('Fullpost', {
                item: data,
              })
            }>
            <MaterialCommunityIcons
              name="comment-outline"
              size={25}
              color={colors?.textColor}
            />
            <Text style={{padding: 5, fontSize: 14, color: colors?.textColor}}>
              {data.comments}
            </Text>
          </Pressable>

          <Pressable
            style={{
              width: DEVICE_WIDTH * 0.3,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name="share-outline"
              size={25}
              color={colors?.textColor}
            />
          </Pressable>
        </View>
      </Pressable>


    </View>
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
