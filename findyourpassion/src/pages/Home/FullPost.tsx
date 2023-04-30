import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/Diimensions';
import {useGlobal} from '../../Hooks/GloblaContext';
import LinearGradient from 'react-native-linear-gradient';
import {commentData} from '../../Data/myfeed';
import CommentBox from './CommentBox';
import MyModal from '../../components/MyModal';
import {ActivityIndicator} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import PostFullScreenView from '../../components/PostFullScreenView';

export default function FullPost({navigation, route}) {
  const {colors} = useGlobal();
  const {item} = route.params;
  const [showContent, setShowContent] = useState({
    show: false,
    media: [],
    index: 0,
  });
  const [mute, setmute] = useState(true);
  const [videoLoader, setVideoLoader] = useState(true);
  const [play, setPlay] = useState(true);

  return (
    <SafeAreaView>
      <View style={[styles.header, {backgroundColor: colors?.BackgroundColor}]}>
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
      <FlatList
        data={['']}
        renderItem={({i}) => (
          <View>
            <View>
              <View style={{margin: 20}}>
                <View style={{alignSelf: 'flex-start', marginLeft: -10}}>
                  <View style={styles.personview}>
                    <Image
                      source={{uri: item.avatar}}
                      style={{width: 40, height: 40, borderRadius: 20}}
                    />
                    <View>
                      <Text
                        style={[
                          styles.personname,
                          {color: colors?.textColor, marginLeft: 10},
                        ]}>
                        {item.creater_name}
                      </Text>
                      <Text
                        style={[
                          styles.persontitle,
                          {color: colors?.textColor},
                        ]}>
                        {item.creater_info}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* <FlatList
                data={item.media}
                renderItem={({item, index}) => (
                  <>
                    {item.type == 'image' ? (
                      <Pressable
                        onPress={() =>
                          setShowContent({
                            show: true,
                            media: item,
                            index: 0,
                          })
                        }>
                        <Image
                          source={{uri: item.url}}
                          style={{
                            resizeMode: 'cover',
                            // flex: 1,
                            // aspectRatio: 1.5,
                            width: DEVICE_WIDTH
                          }}
                        />
                      </Pressable>
                    ) : item.type === 'video' ? (
                      <>
                        <Pressable onPress={() => setPlay(!play)}>
                          {videoLoader ? (
                            <View
                              style={[
                                styles.video,
                                {
                                  backgroundColor: '#000',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                },
                              ]}>
                              <ActivityIndicator color={'#fff'} size={40} />
                              <Text style={{color: '#fff', fontSize: 14}}>
                                Please wait while video loading...
                              </Text>
                            </View>
                          ) : null}

                          <Video
                            source={{
                              uri: item.url,
                            }}
                            style={styles.video}
                            resizeMode="cover"
                            controls={false}
                            audioOnly={true}
                            muted={mute}
                            paused={!play}
                            onLoadStart={() => setVideoLoader(true)}
                            onLoad={() => setVideoLoader(false)}

                            // onVideoBuffer={() => setVideoLoader(true)}
                            // onLoadStart={}
                            // posterResizeMode='cover'
                            // poster="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/English_Cocker_Spaniel_4.jpg/800px-English_Cocker_Spaniel_4.jpg"
                          />

                          {play ? null : (
                            <>
                              <Ionicons
                                style={{
                                  alignSelf: 'center',
                                  backgroundColor: '#000',
                                  borderRadius: 50,
                                  padding: 10,
                                  marginTop: -DEVICE_HEIGHT * 0.17,
                                }}
                                name={'play'}
                                color={'#fff'}
                                size={20}
                                onPress={() => setPlay(!play)}
                              />
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <Ionicons
                                  style={{marginTop: 60, margin: 5}}
                                  name={
                                    mute ? 'ios-volume-mute' : 'ios-volume-high'
                                  }
                                  color={'#fff'}
                                  size={25}
                                  onPress={() => setmute(!mute)}
                                />
                                <Octicons
                                  style={{marginTop: 65, margin: 5}}
                                  name={'screen-full'}
                                  color={'#fff'}
                                  size={20}
                                  onPress={() =>
                                    setShowContent({
                                      show: true,
                                      media: item,
                                      index: index + 1,
                                    })
                                  }
                                />
                              </View>
                            </>
                          )}
                        </Pressable>
                      </>
                    ) : null}
                  </>
                )}
                keyExtractor={({item, index}) => index}
              /> */}

              {
                item.media.map((item, index) => <>
                    {item.type == 'image' ? (
                      <Pressable
                        onPress={() =>
                          setShowContent({
                            show: true,
                            media: item,
                            index: 0,
                          })
                        }>
                        <Image
                          source={{uri: item.url}}
                          style={{
                            resizeMode: 'cover',
                            flex: 1,
                            aspectRatio: 1.5,
                            height: '100%'
                            // width: DEVICE_WIDTH
                          }}
                        />
                      </Pressable>
                    ) : item.type === 'video' ? (
                      <>
                        <Pressable onPress={() => setPlay(!play)}>
                          {videoLoader ? (
                            <View
                              style={[
                                styles.video,
                                {
                                  backgroundColor: '#000',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                },
                              ]}>
                              <ActivityIndicator color={'#fff'} size={40} />
                              <Text style={{color: '#fff', fontSize: 14}}>
                                Please wait while video loading...
                              </Text>
                            </View>
                          ) : null}

                          <Video
                            source={{
                              uri: item.url,
                            }}
                            style={styles.video}
                            resizeMode="cover"
                            controls={false}
                            audioOnly={true}
                            muted={mute}
                            paused={!play}
                            onLoadStart={() => setVideoLoader(true)}
                            onLoad={() => setVideoLoader(false)}

                            // onVideoBuffer={() => setVideoLoader(true)}
                            // onLoadStart={}
                            // posterResizeMode='cover'
                            // poster="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/English_Cocker_Spaniel_4.jpg/800px-English_Cocker_Spaniel_4.jpg"
                          />

                          {play ? null : (
                            <>
                              <Ionicons
                                style={{
                                  alignSelf: 'center',
                                  backgroundColor: '#000',
                                  borderRadius: 50,
                                  padding: 10,
                                  marginTop: -DEVICE_HEIGHT * 0.17,
                                }}
                                name={'play'}
                                color={'#fff'}
                                size={20}
                                onPress={() => setPlay(!play)}
                              />
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <Ionicons
                                  style={{marginTop: 60, margin: 5}}
                                  name={
                                    mute ? 'ios-volume-mute' : 'ios-volume-high'
                                  }
                                  color={'#fff'}
                                  size={25}
                                  onPress={() => setmute(!mute)}
                                />
                                <Octicons
                                  style={{marginTop: 65, margin: 5}}
                                  name={'screen-full'}
                                  color={'#fff'}
                                  size={20}
                                  onPress={() =>
                                    setShowContent({
                                      show: true,
                                      media: item,
                                      index: index + 1,
                                    })
                                  }
                                />
                              </View>
                            </>
                          )}
                        </Pressable>
                      </>
                    ) : null}
                  </>)
              }
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
                    color={
                      item.isLiked ? colors?.AppThemeColor : colors?.textColor
                    }
                  />
                  <Text
                    style={{
                      padding: 5,
                      fontSize: 14,
                      color: item.isLiked
                        ? colors?.AppThemeColor
                        : colors?.textColor,
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
                  <Text
                    style={{
                      padding: 5,
                      fontSize: 14,
                      color: colors?.textColor,
                    }}>
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
                  <Text
                    style={{
                      padding: 5,
                      fontSize: 14,
                      color: colors?.textColor,
                    }}>
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
            <CommentBox item={item} />
          </View>
        )}
      />

      <PostFullScreenView
        showContent={showContent}
        setShowContent={setShowContent}
      />

    </SafeAreaView>
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
  video: {
    width: DEVICE_WIDTH ,
    height: DEVICE_HEIGHT * 0.3,
    alignSelf: 'center',
  },
});
