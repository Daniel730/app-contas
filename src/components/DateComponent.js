import React from 'react'
import { Modal, View } from 'react-native'

import Months from './Months';
import Style from '../style/Style';
import { months }from "../dados"

export default props => {
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
                    {months.map((a) => {
                        return( 
                            <Months 
                                key={`${a.seq}${a.mes}`} 
                                mes={a.mes} 
                                setMes={props.setMes} 
                                setMesNum={props.setMesNum} 
                                seq={a.seq} 
                                modalVisible={props.modalVisible} 
                                setModalVisible={props.setModalVisible} 
                            />
                        )
                    })}
                </View>
            </View>
        </Modal>
    )
}