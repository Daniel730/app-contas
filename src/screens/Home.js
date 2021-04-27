import React from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures';

import HeaderHome from '../components/HeaderHome'
import Item from '../components/Item'
import Style from '../style/Style'
import DateComponent from '../components/DateComponent';
import { active, secondary } from '../style/Colors';
import { StorageContext } from '../providers/storage';
import { months } from '../dados';

export default ({navigation}) => {
    const { 
        filter,
        data, 
        totalAvt, 
        totalCrd, 
        totalTyr,
        getData, 
        mes, 
        setMes, 
        setMesNum, 
        render, 
        showModal, 
        setShowModal, 
        anoFiltro 
    } = React.useContext(StorageContext)
    const [ modalVisible, setModalVisible]  = React.useState(false);

    React.useEffect(() => {
        getData(filter)

        months.map((a) => {
            a.seq == new Date().getMonth() ? (setMes(a.mes), setMesNum(a.seq)) : false
        })

    }, [])
    
    const renderItem = ({item}) => (
        <Item 
            showModal={showModal} 
            setShowModal={setShowModal}
            id={item.id} 
            title={item.title} 
            type={item.type} 
            val={item.val} 
            parcelas={item.parcelas} 
        />
    )

    return(
        <GestureRecognizer 
            style={Style.homeContainer}
            onSwipeLeft={() => navigation.navigate('Add')}
        >   
            <TouchableOpacity 
                style={{marginVertical: 10, backgroundColor: active, padding: 10, width: "70%", alignItems: 'center', justifyContent: 'center'}} 
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text style={{color: secondary, fontSize: 20}}>Contas de: {mes}</Text>
            </TouchableOpacity>
            
            <DateComponent 
                mes={mes}
                setMes={setMes}
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                setMesNum={setMesNum}
                style={{justifyContent: 'center', alignItems: 'center'}}
            />

            <HeaderHome totalCrd={totalCrd} totalAvt={totalAvt} totalTyr={totalTyr} />
            {
                render ? 
                <View style={Style.spinner}>
                    <ActivityIndicator size="large" color={active} />
                </View> 
                : 
                (data.length > 0) ?
                <View style={{width: "100%", flex: 1, backgroundColor: "rgba(0, 0, 0, 0.1)"}}>
                    <FlatList 
                        data={data}
                        renderItem={renderItem}
                        maxToRenderPerBatch={10}
                        keyExtractor={item => `${item.id}`}
                    />
                </View>
                :
                <View style={{width: "100%", flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: active}}>
                    <Text style={{fontSize: 15, fontFamily: "Nexa Bold"}}>Você não tem tem nenhuma conta para {mes} de {anoFiltro}!</Text>
                </View>
            }
        </GestureRecognizer>
    )
}