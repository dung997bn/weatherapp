import React, {useState, useEffect} from 'react';
import {Title, TextInput, Button, Card} from 'react-native-paper';
import {View, Text, FlatList, Image} from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-community/async-storage';

const Home = ({route}) => {
  const [info, setInfo] = useState({
    name: 'Loading !!',
    temp: 'Loading !!',
    humidity: 'Loading !!',
    desc: 'Loading !!',
    icon: 'Loading !!',
  });
  const getWeather = async () => {
    let myCity = await AsyncStorage.getItem('newcity');
    if (!myCity) {
      const {city} = route.params;
      myCity = city;
    }
    myCity=myCity.toLowerCase().replace(" ","");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&APPID=0bb9add1235e7cdb2b3b61f089594785&units=metric`,
    )
      .then(data => data.json())
      .then(results => {
        setInfo({
          name: results.name,
          temp: results.main.temp,
          humidity: results.main.humidity,
          desc: results.weather[0].description,
          icon: results.weather[0].icon,
        });
      });
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (route.params.city !== 'vietnam') {
    getWeather();
  }

  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={{alignItems: 'center'}}>
        <Title style={{color: '#00aaff', marginTop: 30, fontSize: 30}}>
          {info.name}
        </Title>
        <Image
          style={{width: 120, height: 120}}
          source={{
            uri: 'https://openweathermap.org/img/w/' + info.icon + '.png',
          }}
        />
      </View>
      <Card style={{margin: 5, padding: 12}}>
        <Title style={{color: '#00aaff'}}> Temperature - {info.temp}</Title>
      </Card>
      <Card style={{margin: 5, padding: 12}}>
        <Title style={{color: '#00aaff'}}> Humidity - {info.humidity}</Title>
      </Card>
      <Card style={{margin: 5, padding: 12}}>
        <Title style={{color: '#00aaff'}}> Description - {info.desc}</Title>
      </Card>
    </View>
  );
};

export default Home;
