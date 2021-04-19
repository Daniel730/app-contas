import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Style from '../style/Style'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { secondary } from '../style/Colors'
export default ({ title, type, val }) => {

    const numberFormat = (num) =>{
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <View>
            <TouchableOpacity activeOpacity={0.8} style={Style.listItem} onPress={() => false}>
                <View>
                    <Text style={Style.itemText}>
                        {title}
                    </Text>
                    <Text style={Style.itemtype}>
                        {type === "crd" ? "Crédito" : type === "avt" ? "À vista" : ""}
                    </Text>
                </View>
                
                <Text style={Style.itemText}>
                    R$ {numberFormat(Number(val))}
                </Text>
                <Ionicons name="eye" size={25} color={secondary} />
            </TouchableOpacity>
        </View>
    )
}