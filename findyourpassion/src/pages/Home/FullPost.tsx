import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/Diimensions';
import {useGlobal} from '../../Hooks/GloblaContext';
import LinearGradient from 'react-native-linear-gradient';
import {commentData} from '../../Data/myfeed';

export default function FullPost({navigation, route}) {
  const {colors} = useGlobal();
  const {item} = route.params;
  return (
    <ScrollView>
      <View>
        <View
          style={[styles.header, {backgroundColor: colors?.BackgroundColor}]}>
          <MaterialCommunityIcons
            name="arrow-left-thin"
            size={30}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: colors?.textColor,
              marginLeft: 20,
            }}>
            {item.creater_name}'s post
          </Text>
        </View>

        <View style={{margin: 20}}>
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
        </View>

        <Image
          source={{uri: item.img}}
          style={{
            resizeMode: 'contain',
            flex: 1,
            aspectRatio: 1.5,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            color: colors?.textColor,
            margin: 10,
            width: DEVICE_WIDTH - 5,
          }}>
          {item.detail}
        </Text>

        <View
          style={{
            width: DEVICE_WIDTH * 0.95,
            height: 0.5,
            alignSelf: 'center',
            backgroundColor: colors?.textColor,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Pressable
            style={{
              width: DEVICE_WIDTH * 0.3,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name="hand-clap"
              size={25}
              color={item.isLiked ? colors?.AppThemeColor : colors?.textColor}
            />
            <Text
              style={{
                padding: 5,
                fontSize: 14,
                color: item.isLiked ? colors?.AppThemeColor : colors?.textColor,
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
        <View
          style={{
            width: DEVICE_WIDTH * 0.95,
            height: 0.5,
            alignSelf: 'center',
            backgroundColor: colors?.textColor,
          }}
        />
      </View>

      {commentData.map(i => (
        <View
          style={{
            marginHorizontal: 5,
            marginVertical: 5,
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: item.avatar}}
            style={{width: 40, height: 40, borderRadius: 20}}
          />
          <View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1.5, y: 1.25}}
              locations={[0, 0.2, 0.5]}
              style={{
                marginHorizontal: 5,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderTopStartRadius: 10,
              }}
              colors={['#A624EE', '#9144F3', '#7666F9']}>
              <View style={[styles.commentcontainer]}>
                <Text
                  style={[styles.personname, {color: colors?.BackgroundColor}]}>
                  {i.name}
                </Text>
                <Text style={{fontSize: 14, color: colors?.BackgroundColor}}>
                  {i.comment}
                </Text>
              </View>
            </LinearGradient>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 16,
                  margin: 5,
                  fontWeight: '500',
                  marginHorizontal: 15,
                }}>
                1 day ago
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  margin: 5,
                  fontWeight: '500',
                  color: i.isclapped
                    ? colors?.AppThemeColor
                    : colors?.textColor,
                }}>
                {i.claps} {i.claps > 1 ? 'Claps' : 'Clap'}
              </Text>
              <Text style={{fontSize: 16, margin: 5, fontWeight: '500'}}>
                Reply
              </Text>
              {
                'abc' == i.commentor_id ?
                <Text style={{fontSize: 16, margin: 5, fontWeight: '500'}}>
                Delete
              </Text>
              :
              null
              }
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  commentcontainer: {
    marginLeft: 10,
    width: DEVICE_WIDTH * 0.8,
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  header: {
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  tiletxt: {fontSize: 16, fontWeight: '600'},
  tileview: {padding: 10, borderRadius: 5, margin: 5},

  personview: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  personname: {fontSize: 16, fontWeight: '600'},
  persontitle: {fontSize: 14, marginLeft: 10},
});
