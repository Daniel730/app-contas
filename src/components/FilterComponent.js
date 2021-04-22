import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Style from '../style/Style';

export default props => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.showModal}
            onRequestClose={() => {
                props.setShowModal(!props.showModal);
            }}
        >   
            <View style={Style.centeredView}>
                <View style={styles.modalView}>
                    <Text style={Style.modalText}>Selecione o filtro</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity onPress={() => {props.setFilter("todos")}} style={[Style.button, Style.buttonClose]}>
                            <Text style={Style.textStyle}>Todos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {props.setFilter("avt")}} style={[Style.button, Style.buttonClose]}>
                            <Text style={Style.textStyle}>À vista</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {props.setFilter("crd")}} style={[Style.button, Style.buttonClose]}>
                            <Text style={Style.textStyle}>Crédito</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flexWrap: 'wrap', 
        alignItems: 'center',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});