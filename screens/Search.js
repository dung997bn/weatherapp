import React, {useState} from 'react';
import {Appbar, Title, TextInput, Button, Card} from 'react-native-paper';
import {View, Text, FlatList} from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-community/async-storage';

const Search = ({navigation}) => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const fetchCities = text => {
    setCity(text);
    fetch('https://autocomplete.wunderground.com/aq?query=' + text)
      .then(item => item.json())
      .then(cityData => {
        setCities(cityData.RESULTS.slice(0, 9));
      });
  };

  const onClick = async () => {
    await AsyncStorage.setItem('newcity', city);
    navigation.navigate('home', {city: city});
  };
  const listClick = async cityname => {
    setCity(cityname);
    await AsyncStorage.setItem('newcity', cityname);
    navigation.navigate('home', {city: cityname});
  };
  return (
    <View style={{flex: 1}}>
      <Header />
      <TextInput
        label="City name"
        theme={{colors: {primary: '#00aaff'}}}
        value={city}
        onChangeText={text => fetchCities(text)}
      />
      <Button
        icon="content-save"
        mode="contained"
        theme={{colors: {primary: '#00aaff'}}}
        style={{margin: 20}}
        onPress={() => onClick()}>
        <Text style={{color: 'white'}}>Press me</Text>
      </Button>
      <FlatList
        data={cities}
        renderItem={({item}) => {
          return (
            <Card
              style={{margin: 2, padding: 3}}
              onPress={() => listClick(item.name)}>
              <Text>{item.name}</Text>
            </Card>
          );
        }}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

export default Search;
