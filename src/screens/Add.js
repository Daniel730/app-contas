import React from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import GestureRecognizer from 'react-native-swipe-gestures';
import { useState } from 'react/cjs/react.development';
import { secondary } from '../style/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Style from '../style/Style';
import base64 from 'react-native-base64'

const numberFormat = (num) =>{
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default ({navigation}) => {
    const [ title, setTitle ] = useState()
    const [ type, setType ] = useState("crd")
    const [ val, setVal ] = useState()
    const [ qtdParcelas, setQtdParcelas ] = useState()

    const storeData = async () => {
        if(title == undefined){
            Alert.alert(`O campo "Titulo" deve ser preenchido`)
            return
        }

        if(qtdParcelas == undefined || qtdParcelas == 0){
            setQtdParcelas("1")
        }

        if(val == undefined || val == 0){
            Alert.alert(`O campo "Valor" deve ser preenchido`)
            return
        }

        const data = {
            id: Number(Date.now()),
            title, 
            type, 
            val, 
            qtdParcelas
        }

        let numberArray = [];
        try {
            let storedNumbers = await AsyncStorage.getItem('@list');
            if (storedNumbers !== null) {
                numberArray = JSON.parse(storedNumbers);
            }
            numberArray.push(data)
            await AsyncStorage.setItem('@list', JSON.stringify(numberArray));
            Alert.alert("Cadastrado com sucesso!")
        } catch (e) {
            console.log(e)
        }
      }

    return(
        <GestureRecognizer 
            style={Style.addContainer}
            onSwipeRight={() => navigation.navigate("Home")}
        >
            <View style={Style.addContent}>
                <View style={{width: "100%", alignItems: 'center'}}>
                    <TextInput placeholderTextColor={secondary} style={Style.addContentItem} placeholder="Titulo" value={title} onChangeText={title => setTitle(title)} />
                    <View style={Style.addContentItem}>
                        <Picker
                            selectedValue={type}
                            onValueChange={(itemValue) => setType(itemValue)}
                        >
                            <Picker.Item label="À vista" value="avt" />
                            <Picker.Item label="Crédito" value="crd" />
                        </Picker>
                    </View>
                    <TextInput placeholderTextColor={secondary} keyboardType="numeric" style={Style.addContentItem} placeholder={type=="crd" ? "Valor das parcelas" : "Valor pago" } value={val} onChangeText={val => setVal(val)} />
                    {
                        type == "crd" ? 
                        (
                            <View style={{alignItems: 'center', width: "100%"}}>
                                <TextInput 
                                    placeholderTextColor={secondary} 
                                    style={Style.addContentItem} 
                                    placeholder="Quantidade de parcelas" 
                                    keyboardType="numeric" 
                                    value={qtdParcelas} 
                                    onChangeText={qtdParcelas => setQtdParcelas(qtdParcelas)} 
                                />
                                <Text style={{fontSize: 20, marginVertical: 20, color: "white"}}>
                                    Total a pagar: R${
                                        (Number(qtdParcelas) == 0 || qtdParcelas == undefined) ? "0,00" :  Number(val) == 0 ? "0,00" : numberFormat(qtdParcelas * Number(val))
                                    }
                                </Text>
                            </View>
                        )
                        : 
                        null
                    }
                </View>
                <TouchableOpacity style={Style.addBtn} onPress={() => storeData()}>
                    <Text style={Style.btnText}>Adicionar</Text>
                </TouchableOpacity>
            </View>
        </GestureRecognizer>
    )
}