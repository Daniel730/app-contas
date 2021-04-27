import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export const StorageContext = React.createContext({})

export const StorageProvider = props => {
    const [data, setData] = React.useState([])
    const [totalAvt, setTotalAvt] = React.useState(0)
    const [totalCrd, setTotalCrd] = React.useState(0)
    const [totalTyr, setTotalTyr] = React.useState(0)
    const [ filter, setFilter ] = React.useState("todos")
    const [mes, setMes] = React.useState()
    const [mesNum, setMesNum] = React.useState(new Date().getMonth())
    const [anoFiltro, setAnoFiltro] = React.useState(`${new Date().getFullYear()}`)
    const [render, setRender] = React.useState(true)

    const deleteItem = async (id) =>{
        try {
            await AsyncStorage.getItem(`@list`).then( async res => {
                let list = JSON.parse(res)
                for( var i = 0; i < list.length; i++){
                    if(list[i].id === id){
                        list.splice(i, 1)
                        await AsyncStorage.setItem(`@list`, JSON.stringify(list))
                        return
                    }
                }
            })
            return true
        } catch (e) {
            return false
        }
    }

    const getData = async (filter) => {
        setRender(true)
        try {
            let array = []
            const jsonValue = await AsyncStorage.getItem('@list')
            let arrayValues = JSON.parse(jsonValue)

            arrayValues == undefined ? false : null

            if(filter != undefined){
                arrayValues.map((a, b) => {
                    if(a.type == filter){
                        if(new Date(a.date).getMonth() == mesNum && new Date(a.date).getFullYear() == anoFiltro){
                            array.push(a)
                        }
                    }else if(filter == "todos"){
                        if(new Date(a.date).getMonth() == mesNum && new Date(a.date).getFullYear() == anoFiltro){
                            array.push(a)
                        }
                    }else if(filter == "tyr"){
                        if(new Date(a.date).getFullYear() == anoFiltro){
                            array.push(a)
                        }
                    }
                })
            }        
            
            array.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
            });

            setData(array)

            setTotalAvt(array.reduce((a, c) => {
                return c.type == "avt" ? a + Number(c.val) : a + 0
            }, 0));

            setTotalCrd(array.reduce((a, c) => {
                return c.type == "crd" ? a + Number(c.val) : a + 0
            }, 0));

            setTotalTyr(array.reduce((a, c) => {
                return a+Number(c.val)
            }, 0))

        } catch (e) {
            console.log(e)
        }

        setRender(false)
    }

    return (
        <StorageContext.Provider value={
            { 
                data, 
                getData, 
                totalAvt, 
                totalCrd, 
                totalTyr,
                mes, 
                setMes, 
                mesNum, 
                setMesNum, 
                render, 
                setRender, 
                deleteItem,
                anoFiltro, 
                setAnoFiltro,
                filter, 
                setFilter
            }
        }>
            {props.children}
        </StorageContext.Provider>
    )
}
