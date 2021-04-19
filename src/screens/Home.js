import React, { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import HeaderHome from '../components/HeaderHome'
import Item from '../components/Item'

import GestureRecognizer from 'react-native-swipe-gestures';

import Style from '../style/Style'
import { active, background, secondary } from '../style/Colors';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default ({navigation}) => {
    const [data, setData] = useState([])
    const [render, setRender] = useState(false)
    const [totalAvt, setTotalAvt] = useState(0)
    const [totalCrd, setTotalCrd] = useState(0)
    const [date, setDate] = useState(new Date)

    const getData = async () => {
        console.log("Tada")
        try {
            const jsonValue = await AsyncStorage.getItem('@list')
            let arrayValues = JSON.parse(jsonValue)
            if(arrayValues.length > 0){
                setData(arrayValues)
                setTotalAvt(arrayValues.reduce((a, c) => {
                    return c.type == "avt" ? a + Number(c.val) : a + 0
                }, 0));
                setTotalCrd(arrayValues.reduce((a, c) => {
                    return c.type == "crd" ? a + Number(c.val) : a + 0
                }, 0));
            }
        } catch(e) {
            return
        }
    }

    const renderItem = ({item}) => (
        <Item title={item.title} type={item.type} val={item.val} />
    )

    return(
        <GestureRecognizer style={Style.homeContainer}
            onSwipeLeft={() => navigation.navigate('Add')}
        >   
            <DatePicker 
                style={{marginVertical: 10, backgroundColor: active, width: "100%"}}
                date={date}
                mode="date"
                placeholder="Selecione uma Data"
                format="MM - YYYY"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                customStyles={
                    {
                        dateText: {
                            fontSize: 20,
                            color: secondary
                        }
                    }
                }
                onDateChange={date => setDate(date)}
            />
            <HeaderHome totalCrd={totalCrd} totalAvt={totalAvt} />
            {
                render ? 
                <View style={Style.spinner}>
                    <ActivityIndicator size="large" color={background} />
                </View> 
                : 
                (data != undefined) ?
                <FlatList 
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                />
                :
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: active}}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>Você não tem nada cadastrado. Isso é uma vitória?</Text>
                </View>
            }
        </GestureRecognizer>
    )
}