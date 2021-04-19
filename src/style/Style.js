import { StyleSheet } from "react-native";
import { active, background, inactive, secondary, tertiary } from "./Colors";

export default StyleSheet.create({

    homeContainer: {
        backgroundColor: background,
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 15
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

    itemText: {
        color: tertiary,
        fontSize: 20,
        fontFamily: "Nexa"
    },

    spinner: {
        backgroundColor: background, 
        flex: 1, 
        justifyContent: "center"
    },

    listItem: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 30,
        marginVertical: 5,
        backgroundColor: active
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

    contentText: {
        width: "100%", 
        textAlign: 'center', 
        fontSize: 20, 
        color: active,
        fontFamily: "Nexa"
    },

    itemPgt: {
        color: inactive, 
        fontWeight: 'bold',
        fontFamily: "Nexa"
    }

})