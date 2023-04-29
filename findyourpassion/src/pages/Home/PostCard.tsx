import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/Diimensions';
import {useGlobal} from '../../Hooks/GloblaContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyModal from '../../components/MyModal';
import {Elipsis} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

export default function PostCard({item}) {
  const navigation = useNavigation();

  const {colors} = useGlobal();
  const [showImg, setShowImg] = useState({
    show: false,
    img: '',
  });
  const [like, setLike] = useState(false);
  const medialength = item.media.length;

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
            source={{uri: item.avatar}}
            style={{width: 40, height: 40, borderRadius: 20}}
          />
          <View>
            <Text style={[styles.personname, {color: colors?.textColor}]}>
              {item.creater_name}
            </Text>
            <Text style={[styles.persontitle, {color: colors?.textColor}]}>
              {item.creater_info}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={item.media}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // // snapToStart={false}
        // snapToAlignment="start"
        decelerationRate="fast"
        pagingEnabled={true}
        style={{width: DEVICE_WIDTH * 0.9}}
        snapToInterval={DEVICE_WIDTH * 0.9}
        renderItem={({item, index}) => (
          <View
            style={{width: DEVICE_WIDTH * 0.9, height: DEVICE_HEIGHT * 0.3}}>
            {medialength > 1 ?
              <Text
              style={{
                fontSize: 14,
                padding: 3,
                position: 'absolute',
                right: 0,
                zIndex: 999,
                color: '#fff',
                backgroundColor: '#000',
                opacity: 0.4,
                borderBottomLeftRadius: 5,
              }}>
                {`${index + 1}/${medialength}`}
              </Text>
              : null
            }

            {item.type === 'image' ? (
              <Image
                source={{uri: item.img}}
                style={{
                  width: DEVICE_WIDTH * 0.9,
                  height: DEVICE_HEIGHT * 0.3,
                  // height: %,
                  // borderRadius: 5,
                  alignSelf: 'center',
                }}
              />
            ) : null}
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Fullpost', {
            item: item,
          })
        }>
        <Text
          style={{
            fontSize: 14,
            color: colors?.textColor,
            marginLeft: -10,
            marginTop: 10,
          }}>
          {Elipsis(item.detail, 150)}
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
              {item.likes}
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
              name="comment-outline"
              size={25}
              color={colors?.textColor}
            />
            <Text style={{padding: 5, fontSize: 14, color: colors?.textColor}}>
              {item.comments}
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
            <Text style={{padding: 5, fontSize: 14, color: colors?.textColor}}>
              {item.shares}
            </Text>
          </Pressable>
        </View>
      </TouchableOpacity>

      {/* 
      <FloatingHeart
          animatedEmoji={like}
          objThing={
            <MaterialCommunityIcons
            name="hand-clap"
            size={30}
            color={colors?.AppThemeColor}
          />
          }
        /> */}

      <MyModal
        visible={showImg.show}
        onDismiss={() => {}}
        children={
          <>
            <View
              style={{
                height: DEVICE_HEIGHT,
                width: DEVICE_WIDTH,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
              }}>
              <MaterialCommunityIcons
                name="close"
                size={30}
                color={'#fff'}
                style={{position: 'absolute', top: 10, right: 10, zIndex: 9999}}
                onPress={() => setShowImg({show: false, img: ''})}
              />
              <Image
                source={{
                  uri: showImg.img,
                }}
                style={{
                  width: DEVICE_WIDTH,
                  height: '100%',
                  resizeMode: 'contain',
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Fullpost', {
                  item: item,
                })
              }
              style={{
                width: DEVICE_WIDTH * 0.9,
                alignSelf: 'center',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#fff',
                alignItems: 'center',
                padding: 10,
                marginTop: -70,
              }}>
              <Text style={{color: '#fff', fontSize: 18}}> View post</Text>
            </TouchableOpacity>
          </>
        }
      />
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
