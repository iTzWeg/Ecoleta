import React,{useEffect, useState} from 'react';
import {Feather as Icon} from '@expo/vector-icons'
import axios from 'axios';
import {View,ImageBackground, Image, StyleSheet, Text,Picker} from 'react-native'
import RNPickerSelect ,{Item} from 'react-native-picker-select';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'



interface IBGEUFResponse {
  sigla: string;
}
interface IBGECityResponse {
  nome: string;
}
interface IPicker {
  label: string;
  value: string;
}
const Home = () => {

  const navigation = useNavigation();
  const [ufs, setUfs] = useState<IPicker[]>([]);
  const [selectedUf, setSelectedUF] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [cities, setCities] = useState<IPicker[]>([]);
  function handleNavigateToPoints(){
    navigation.navigate('Points');
  }

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )
      .then((response: any) => {
        const ufInitials = response.data.map((uf: any) => {
          return { label: uf.sigla, value: uf.sigla };
        });
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf !== '0') {
      axios
        .get<string[]>(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
        )
        .then((response: any) => {
          const citiesNames = response.data.map((city: any) => {
            return { label: city.nome, value: city.nome };
          });
          setCities(citiesNames);
        });
    }
  }, [selectedUf]);
  
      
    
    
    return (
        <ImageBackground
         source={require('../../assets/home-background.png')}
         style={styles.container}
         imageStyle={{ width:274, height:368 }} 
        >
          <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
          <Text style={styles.description}>Ajudamos pessoa a encontrarem pontos de coleta de forma eficiente</Text>
          </View>
          <View style={styles.footer}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedUF(value)}
            items={ufs}
            placeholder={{ label: 'Selecione a UF', value: null }}
          />
          <RNPickerSelect
            onValueChange={(value) => setSelectedCity(value)}
            placeholder={{ label: 'Selecione a Cidade', value: null }}
            items={cities}
          />
          <RectButton
            style={styles.button}
            onPress={() =>
              navigation.navigate('Points', {
                uf: selectedUf,
                city: selectedCity,
              })
            }
          >
              <View style={styles.buttonIcon}>
                <Text>
                  <Icon name ="arrow-right" color="#fff" size={24}/>
                </Text>
              </View>
              <Text style={styles.buttonText}>
                Entrar
              </Text>
            </RectButton>
          </View>
        </ImageBackground>
    )
}



    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 32,
        },
      
        main: {
          flex: 1,
          justifyContent: 'center',
        },
      
        title: {
          color: '#322153',
          fontSize: 32,
          fontFamily: 'Ubuntu_700Bold',
          maxWidth: 260,
          marginTop: 64,
        },
      
        description: {
          color: '#6C6C80',
          fontSize: 16,
          marginTop: 16,
          fontFamily: 'Roboto_400Regular',
          maxWidth: 260,
          lineHeight: 24,
        },
      
        footer: {},
      
        select: {},
      
        input: {
          height: 60,
          backgroundColor: '#FFF',
          borderRadius: 10,
          marginBottom: 8,
          paddingHorizontal: 24,
          fontSize: 16,
        },
        pickerStyle:{  
          height: 150,  
          width: "80%",  
          color: '#344953',  
          justifyContent: 'center',  
        }, 
      
        button: {
          backgroundColor: '#34CB79',
          height: 60,
          flexDirection: 'row',
          borderRadius: 10,
          overflow: 'hidden',
          alignItems: 'center',
          marginTop: 8,
        },
      
        buttonIcon: {
          height: 60,
          width: 60,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          justifyContent: 'center',
          alignItems: 'center'
        },
      
        buttonText: {
          flex: 1,
          justifyContent: 'center',
          textAlign: 'center',
          color: '#FFF',
          fontFamily: 'Roboto_500Medium',
          fontSize: 16,
        }
      });
export default Home;