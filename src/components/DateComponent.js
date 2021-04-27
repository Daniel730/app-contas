import React from 'react'
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Style from '../style/Style';
import { months }from "../dados"
import { StorageContext } from '../providers/storage';

export default props => {
    const { anoFiltro, setAnoFiltro, getData, filter } = React.useContext(StorageContext)

    const constYearChange = text => {
        if(text == ""){
            setAnoFiltro("")
        }
        if (/^\d+$/.test(text)) {
            setAnoFiltro(text)
        }
    }

    const minus = (filter) => {
        if(filter == "y"){
            let result = `${Number(anoFiltro) - 1}`    
            setAnoFiltro(result)
        }else if(filter == "m"){
            for(let i = 0; i < months.length; i++){
                if(months[i].mes == props.mes){
                    if(i-1 < 0){
                        props.setMes("Dezembro")
                        props.setMesNum(11)
                        setAnoFiltro(`${Number(anoFiltro) -1 }`)
                        return false
                    }

                    props.setMes(months[i-1].mes)
                    props.setMesNum(months[i-1].seq)
                }   
            }
        }else{
            return false
        }
    }

    const add = filter => {
        if(filter == "y"){
            let result = `${Number(anoFiltro) + 1}`    
            setAnoFiltro(result)
        }else if(filter == "m"){
            for(let i = 0; i < months.length; i++){
                if(months[i].mes == props.mes){
                    if(i+1 > 11){
                        props.setMes("Janeiro")
                        props.setMesNum(0)
                        setAnoFiltro(`${Number(anoFiltro) + 1 }`)
                        return false
                    }

                    props.setMes(months[i+1].mes)
                    props.setMesNum(months[i+1].seq)
                }
            }
        }else{
            return false
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(!props.modalVisible);
            }}
        >
            <View style={Style.centeredView}>
                <View style={Style.modalView}>
                    <View style={{width: "100%", justifyContent: "center", alignItems: "center", marginVertical: 10, flexDirection: 'row'}}>
                        <Pressable onPress={() => minus("y")}>
                            <Ionicons name="remove-circle-outline" size={30} color="#2196F3" />
                        </Pressable>
                        <TextInput 
                            style={[styles.button, styles.buttonClose, styles.textStyle]}
                            value={anoFiltro}
                            onChangeText={res => constYearChange(res)}
                            keyboardType="numeric" 
                            maxLength={4} 
                        />
                        <Pressable onPress={() => add("y")}>
                            <Ionicons name="add-circle-outline" size={30} color="#2196F3" />
                        </Pressable>
                    </View>
                    <View style={{width: "100%", justifyContent: "center", alignItems: "center", marginVertical: 10, flexDirection: 'row' }}>
                        <Pressable onPress={() => minus("m")}>
                            <Ionicons name="remove-circle-outline" size={30} color="#2196F3" />
                        </Pressable>
                        <Pressable 
                            style={[styles.button, styles.buttonClose]}
                        >
                            <Text style={styles.textStyle}>{props.mes}</Text>
                        </Pressable>
                        <Pressable onPress={() => add("m")}>
                            <Ionicons name="add-circle-outline" size={30} color="#2196F3" />
                        </Pressable>
                    </View>
                    <View style={{width: "100%", justifyContent: "center", alignItems: "center", marginVertical: 10, flexDirection: 'row' }}>
                        <Pressable 
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                props.setModalVisible(!props.modalVisible)
                                getData(filter)
                            }}
                        >
                            <Text style={styles.textStyle}>Concluido</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 90
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15
    },
})