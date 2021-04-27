import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Text, TouchableOpacity, View } from 'react-native'

import Style from '../style/Style'
import { active } from '../style/Colors'
import { StorageContext } from '../providers/storage'

export default ({
    id, 
    title, 
    type, 
    val, 
    parcelas
}) => {
    const { getData, deleteItem, filter } = React.useContext(StorageContext)
    const numberFormat = (num) =>{
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <View>
            <TouchableOpacity activeOpacity={0.8} style={Style.listItem}>
                <View style={{flex: 3}}>
                    <Text style={Style.itemText}>
                        {
                            title.length > 10 ? `${title.substr(0, 10)}...` : title
                        }
                    </Text>
                    <Text style={Style.itemtype}>
                        {type === "crd" ? "Crédito" : type === "avt" ? "À vista" : ""}
                    </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    {
                        parcelas != undefined ? 
                            <Text style={[Style.itemText, {textDecorationLine: "underline"}]}>{parcelas}</Text>
                        : 
                        null
                    } 
                </View> 
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', padding: 5}}>
                    <Text style={Style.itemText}>
                        R$ {numberFormat(Number(val))}
                    </Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <TouchableOpacity 
                        style={{backgroundColor: "red", padding: 5, borderRadius: 30}}
                        onPress={() => deleteItem(id).then(() => getData(filter))}    
                    >
                        <Ionicons name="trash" size={15} color={active} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    )
}