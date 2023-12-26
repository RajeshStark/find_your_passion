import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {DEVICE_WIDTH} from '../../utils/Diimensions';
import {useGlobal} from '../../Hooks/GloblaContext';
import Entypo from 'react-native-vector-icons/Entypo';
import MyButton from '../../components/MyButton';
import MyInput from '../../components/MyInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  cancel: () => void;
};


export default function AddPost({cancel}: Props) {
  const {colors} = useGlobal();
  const [debate, setDebate] = useState({
    title: '',
    yourgroup: '',
    oppositegroupname: '',
    description: '',
  });
  const [posttype, setposttype] = useState(true)

  const storeData = async (value : object) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@debateposts', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  return (
    <SafeAreaView>
      <View style={[styles.header, {backgroundColor: colors?.BackgroundColor}]}>
        <Entypo
          name="cross"
          size={30}
          color={colors?.textColor}
          onPress={cancel}
        />
        <MyButton
          title="Create"
          onPress={() => storeData(debate)}
          size={0.3}
          isDisabled={debate.title.length < 10 || debate.oppositegroupname === '' || debate.yourgroup === ''}
        />
      </View>

      <View style={styles.personview}>
        <Ionicons name="ios-person-circle" size={60} />
        <View>
          <Text style={[styles.personname, {color: colors?.AppThemeColor}]}>
            Rajesh Sangapogu
          </Text>
          <Text style={styles.persontitle}>React Native developer,</Text>

          <TouchableOpacity style={styles.touch} onPress={() => setposttype(!posttype)}>
            <Text style={{fontSize: 14, fontWeight: '600'}}>{posttype ? 'everyone' : 'group'}</Text>
            <MaterialCommunityIcons name={'chevron-down'} size={25} />
          </TouchableOpacity>
        </View>
      </View>

 
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  personview: {
    marginTop: 30,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  personname: {fontSize: 16, fontWeight: '600', marginLeft: 10},
  persontitle: {fontSize: 14, marginLeft: 10, width: DEVICE_WIDTH * 0.8},
  datacontainer: {marginTop: 30, alignItems: 'center'},
  touch: {
    flexDirection: 'row',
    borderColor: '#000',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    width: 100,
    marginLeft: 10,
    paddingHorizontal: 2,
    justifyContent: 'space-between',
  },
});
