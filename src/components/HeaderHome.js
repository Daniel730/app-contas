import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';

import { StorageContext } from '../providers/storage';
import Style from '../style/Style';
import FilterComponent from './FilterComponent';

const numberFormat = num => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export default ({totalAvt, totalCrd}) => {

    const {getData} = useContext(StorageContext)
    const [ showModal, setShowModal ] = useState(true)
    const [ filter, setFilter ] = useState("todos")

    useEffect(() => {
        setShowModal(!showModal)
        getData(filter)
    }, [filter])
    
    const showAvt = (filter == "avt" || filter == "todos") ? null : {display: 'none'}
    const showCrd = (filter == "crd" || filter == "todos") ? null : {display: 'none'}

    return(
        <View style={Style.headerContainer} elevation={5} >
            <FilterComponent 
                filter={filter}
                setFilter={setFilter}
                showModal={showModal} 
                getData={getData}
                setShowModal={setShowModal}
                style={{justifyContent: 'center', alignItems: 'center'}}
            />
            
            <View style={Style.headerContent}>
                {
                    <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                        <Text style={[Style.contentText, showAvt]}>
                            À vista
                        </Text>
                        <Text style={[Style.contentText, showCrd]}>
                            Crédito
                        </Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={Style.headerContent}>
                <Text style={[Style.contentText, showAvt]}>
                    R$ {numberFormat(totalAvt)}
                </Text>
                <Text style={[Style.contentText, showCrd]}>
                    R$ {numberFormat(totalCrd)}
                </Text>
            </View>
        </View>
    )
}