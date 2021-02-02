import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function App() {
  const [rates, setRates] = useState([]);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [eur, setEur] = useState('');

  const getRates = () => {
    const url = 'https://api.exchangeratesapi.io/latest';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
       setRates(responseJson.rates);
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    }); 
  }

  useEffect(() => { getRates() }, [] );

  const convert = () => {
    const eur = Number(amount) / rates[currency];
    setEur(eur.toFixed(2));
  }

  return (
    <View style={styles.container}>
      <View>
        <Image style={{width: 150, height: 150}}
          source={require('./euro.png')}/>
      </View>
        <View>
          <Text style={styles.text}>{eur} €</Text>
        </View>
          <View style={styles.row}>
            <TextInput style={styles.input}
              placeholder={'Amount'}
              keyboardType='numeric'
              value={amount}
              onChangeText={text => setAmount(text)}/>
            <Picker
              selectedValue={currency}
              style={{height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => {
                setCurrency(itemValue);
            }}>
            {Object.keys(rates).sort().map(key => (<Picker.Item label={key} value={key} key={key} />))}
            </Picker>
          </View>
 <Button onPress={() => convert()} title="Convert" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: 10,
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    width: 80,
    textAlign: 'center',
  }
});