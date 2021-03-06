import React from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import GestureRecognizer from 'react-native-swipe-gestures';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { secondary } from '../style/Colors';
import { StorageContext } from '../providers/storage';
import Style from '../style/Style';

export default ({navigation}) => {
    const numberFormat = (num) =>{
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const { getData, mesNum, anoFiltro, filter } = React.useContext(StorageContext)
    const [ title, setTitle ] = React.useState()
    const [ type, setType ] = React.useState("crd")
    const [ val, setVal ] = React.useState()
    const [ qtdParcelas, setQtdParcelas ] = React.useState()
    const [ date, setDate ] = React.useState(new Date(Number(anoFiltro), Number(mesNum)))
    
    React.useEffect(() => {
        setDate(new Date(Number(anoFiltro), Number(mesNum)))
    }, [mesNum])
    
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
            parcelas: (qtdParcelas !== undefined && qtdParcelas > 1) ? `1/${qtdParcelas}` : undefined,
            qtdParcelas,
            date
        }

        let numberArray = [];

        try {
            let storedNumbers = await AsyncStorage.getItem('@list');

            if (storedNumbers !== null) {
                numberArray = JSON.parse(storedNumbers);
            }

            numberArray.push(data)
            await AsyncStorage.setItem('@list', JSON.stringify(numberArray));
        } catch (e) {
            console.log(e)
        }
        
       if(qtdParcelas > 1){
            for(var i = 2; i <= qtdParcelas; i++){
                const data = {
                    id: Number(Date.now()),
                    title, 
                    type, 
                    val, 
                    parcelas: `${i}/${qtdParcelas}`,
                    date: new Date(date.setMonth(date.getMonth()+1))
                }

                let numberArray = [];
                try {
                    let storedNumbers = await AsyncStorage.getItem('@list');

                    if (storedNumbers !== null) {
                        numberArray = JSON.parse(storedNumbers);
                    }

                    numberArray.push(data)
                    await AsyncStorage.setItem('@list', JSON.stringify(numberArray));
                } catch (e) {
                    console.log(e)
                }
            }
        }

        Alert.alert("Cadastrado com sucesso!")
        getData(filter)
        setTitle(); setVal(); setQtdParcelas();
      }

    return(
        <GestureRecognizer 
            style={Style.addContainer}
            onSwipeRight={() => navigation.navigate("Home")}
        >
            <Text style={{fontSize: 25, marginVertical: 20, color: "black", fontFamily: "Nexa Bold"}}>Cadastrar:</Text>
            <View style={Style.addContent}>
                <View style={{width: "100%", alignItems: 'center'}}>
                    <TextInput placeholderTextColor={secondary} style={Style.addContentItem} placeholder="Titulo" value={title} onChangeText={title => setTitle(title)} />
                    <View style={Style.addContentItem}>
                        <Picker
                            selectedValue={type}
                            onValueChange={(itemValue) => setType(itemValue)}
                        >
                            <Picker.Item label="?? vista" value="avt" />
                            <Picker.Item label="Cr??dito" value="crd" />
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