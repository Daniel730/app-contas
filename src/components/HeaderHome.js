import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { StorageContext } from '../providers/storage';
import Style from '../style/Style';
import FilterComponent from './FilterComponent';

export default ({totalAvt, totalCrd, totalTyr}) => {
    const numberFormat = num => {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    const { getData, anoFiltro, filter, setFilter } = React.useContext(StorageContext)
    const [ showModal, setShowModal ] = React.useState(true)

    React.useEffect(() => {
        setShowModal(!showModal)
        getData(filter)
    }, [filter])
    
    const showAvt = (filter == "avt" || filter == "todos") ? null : {display: 'none'}
    const showCrd = (filter == "crd" || filter == "todos") ? null : {display: 'none'}
    const showThisYear = (filter == "tyr") ? null : {display: 'none'}

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
                        <Text style={[Style.contentText, showThisYear]}>
                            Ano de {anoFiltro}
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
                <Text style={[Style.contentText, showThisYear]}>
                    R$ {numberFormat(totalTyr)}
                </Text>
            </View>
        </View>
    )
}