import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, createContext } from "react";

export const StorageContext = createContext({})

export const StorageProvider = props => {
    const [data, setData] = useState([])
    const [totalAvt, setTotalAvt] = useState(0)
    const [totalCrd, setTotalCrd] = useState(0)
    const [mes, setMes] = useState()
    const [mesNum, setMesNum] = useState(new Date().getMonth())
    const [anoFiltro, setAnoFiltro] = useState(`${new Date().getFullYear()}`)
    const [render, setRender] = useState(true)

    const deleteItem = async (id) =>{
        try {
            await AsyncStorage.getItem(`@list`).then( async res => {
                let list = JSON.parse(res)
                for( var i = 0; i < list.length; i++){ 
                    console.log(list[i].id, id)
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
                mes, 
                setMes, 
                mesNum, 
                setMesNum, 
                render, 
                setRender, 
                deleteItem,
                anoFiltro, 
                setAnoFiltro
            }
        }>
            {props.children}
        </StorageContext.Provider>
    )
}
