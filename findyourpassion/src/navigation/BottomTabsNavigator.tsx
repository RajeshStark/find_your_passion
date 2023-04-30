import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home/Home';
import {useGlobal} from '../Hooks/GloblaContext';
import Profile from '../pages/Profile/Profile';
import Explore from '../pages/Explore/Explore';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Alert, View, TouchableOpacity, Text} from 'react-native';
import Notifications from '../pages/Notifications/Notifications';
import AddPost from '../pages/AddPost/AddPost';
import MyModal from '../components/MyModal';
import MyBottomsheet from '../components/MyBottomshet';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
import {DEVICE_WIDTH} from '../utils/Diimensions';
import LinearGradient from 'react-native-linear-gradient';
import BlogPost from '../pages/AddPost/BlogPost';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const {colors} = useGlobal();
  const [visible, setVisible] = useState({
    visible: false,
    show: false,
    type: '',
    snappoint: [SCREEN_HEIGHT * 0.5],
  });

  return (
    <>
      <Tab.Navigator
        screenOptions={{headerShown: false, tabBarShowLabel: false}}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarActiveTintColor: colors?.AppThemeColor,
            tabBarIcon: ({color, size, focused}) => (
              <AntDesign
                name="home"
                color={focused ? colors?.AppThemeColor : 'grey'}
                size={30}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{
            tabBarLabel: 'Explore',
            tabBarActiveTintColor: colors?.AppThemeColor,
            tabBarIcon: ({color, size, focused}) => (
              <Ionicons
                name="earth"
                color={focused ? colors?.AppThemeColor : 'grey'}
                size={30}
              />
            ),
          }}
        />

        <Tab.Screen
          name="AddPost"
          component={AddPost}
          options={{
            tabBarLabel: 'AddPost',
            tabBarActiveTintColor: colors?.AppThemeColor,
            tabBarButton: () => (
              <TouchableOpacity
                style={{
                  borderColor: '#ededed',
                  // borderWidth: 10,
                  backgroundColor: colors?.AppThemeColor,
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -20,
                }}
                onPress={() => setVisible({...visible, visible: true})}>
                <Entypo name="plus" color={'#fff'} size={30} />
              </TouchableOpacity>
            ),
          }}
        />

        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarLabel: 'Notifications',
            tabBarActiveTintColor: colors?.AppThemeColor,
            tabBarIcon: ({color, size, focused}) => (
              <Octicons
                name="bell-fill"
                color={focused ? colors?.AppThemeColor : 'grey'}
                size={25}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarActiveTintColor: colors?.AppThemeColor,
            tabBarIcon: ({color, size, focused}) => (
              <MaterialCommunityIcons
                name="account"
                color={focused ? colors?.AppThemeColor : 'grey'}
                size={30}
              />
            ),
          }}
        />
      </Tab.Navigator>

      <MyModal
        visible={visible.show}
        onDismiss={() => setVisible({...visible, show: false, type: ''})}
        children={
          visible.type === 'Blog Post' ?
         <BlogPost   cancel={() => setVisible({...visible, show: false, type: ''})}/>
         :
         <AddPost
         cancel={() => setVisible({...visible, show: false, type: ''})}
       />
        }
      />

      <MyBottomsheet
        visible={visible}
        children={
          <View>
            <Text
              style={{color: colors?.AppThemeColor, fontSize: 22, marginLeft: 20, margin: 10, fontWeight:'700'}}>
              What do you wanna post?
            </Text>
{
  ['Regular Post', 'Blog Post'].map((i, index) =>  <TouchableOpacity
  onPress={() =>
    setVisible({
      ...visible,
      visible: false,
      show: true,
      type: i,
    })
  }
  style={{alignItems:'center', margin: 10 }} key={index}>

  <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 1.5, y: 1.25}}
    locations={[0, 0.2, 0.5]}
    // locations={[0.2, 0.2, 0.8, 0.8]}
    style={{
      width: DEVICE_WIDTH * 0.9,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      borderRadius: 20,
      flexDirection: 'row',
    }}
    colors={['#A624EE', '#9144F3', '#7666F9']}>
   <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
   <Text
      style={{
        fontSize: 18,
        fontWeight: '700',
        color: colors?.BackgroundColor,
        
      }}>
      {i}
    </Text>

    <Text
      style={{
        fontSize: 12,
        color: colors?.BackgroundColor,
        width: DEVICE_WIDTH * 0.7
      }}>
        {
          i == 'Regular Post' ?
          'Regular post is where you can post your thoughts and images, videos etc quickly'
          :
          `Blog post is where you can create a blog with more detailed information and you can share your files (i.e: pdf,doc ), videos, images and references much more`
        }
     
    </Text>
   </View>
   <MaterialCommunityIcons name='chevron-right' size={40} color={colors?.BackgroundColor}/>
  </LinearGradient>
</TouchableOpacity>
)
}
          </View>
        }
      />
    </>
  );
}
