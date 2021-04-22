import { StyleSheet } from "react-native";
import { active, background, inactive, secondary, tertiary } from "./Colors";

export default StyleSheet.create({
    homeContainer: {
        backgroundColor: background,
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 15,
        alignItems: "center",
        justifyContent: "center"
    },

    contentText: {
        width: "100%", 
        textAlign: 'center', 
        fontSize: 20, 
        color: active,
        fontFamily: "Nexa"
    },

    addContainer: {
        backgroundColor: active, 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    addContent: {
        width: "80%", 
        borderRadius: 15, 
        backgroundColor: secondary, 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        padding: 20
    },

    addContentItem: {
        marginVertical: 10, 
        width: "90%", 
        backgroundColor: active, 
        color: secondary
    },

    addBtn: {
        padding: 15, 
        margin: 14, 
        borderRadius: 10, 
        backgroundColor: active
    },

    btnText: {
        fontSize: 15, 
        fontWeight: 'bold'
    },

    spinner: {
        width: '100%',
        backgroundColor: "rgb(255, 255, 255)", 
        flex: 1, 
        justifyContent: "center"
    },

    listItem: {
        width: 360,
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
        backgroundColor: active,
    },

    itemText: {
        color: tertiary,
        fontSize: 20,
        fontFamily: "Nexa"
    },

    headerContainer: {
        width: "100%", 
        height: 50, 
        backgroundColor: background, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },

    headerContent: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },

    modalView: {
        flexDirection: 'row', 
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

    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: "Nexa Bold",
        fontSize: 20
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 80,
        marginHorizontal: 5
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