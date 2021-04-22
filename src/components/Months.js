import React, { useContext } from 'react'
import { StyleSheet, Pressable, Text, View } from 'react-native'

import { StorageContext } from '../providers/storage'

export default props => {
    const {getData} = useContext(StorageContext)
    return(
        <View style={{margin: 5}}>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPressIn={() => {
                    props.setMes(props.mes)
                    props.setMesNum(props.seq)
                }}
                onPressOut={() => {
                    props.setModalVisible(!props.modalVisible)
                    getData("todos")
                }}
            >
                <Text style={styles.textStyle}>{props.mes}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 80
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
})