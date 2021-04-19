import React from 'react';
import { Text, View } from 'react-native';
import Style from '../style/Style';

const numberFormat = num => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export default props => {
    return(
        <View style={Style.headerContainer} elevation={5} >
            <View style={Style.headerContent}>
                <Text style={Style.contentText}>
                    À vista
                </Text>
                <Text style={Style.contentText}>
                    Crédito
                </Text>
            </View>
            <View style={Style.headerContent}>
                <Text style={Style.contentText}>
                    R$ {numberFormat(props.totalAvt)}
                </Text>
                <Text style={Style.contentText}>
                    R$ {numberFormat(props.totalCrd)}
                </Text>
            </View>
        </View>
    )
}