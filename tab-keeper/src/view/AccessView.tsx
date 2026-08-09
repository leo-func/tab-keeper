import { Text, View, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { useProfileViewModel } from "../viewmodels/profile.viewmodel";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { COLORS } from "../constants/Color";

export default function AccessView({
    error,
    code,
    setCode,
    getProfile,
} : ReturnType<typeof useProfileViewModel>) {
    return (
        <View style={styles.background}>
            <Text style={{color: COLORS.textPrimary}}>Inserir o código de acesso</Text>

            <TextInput 
                placeholder="AAAA" 
                placeholderTextColor={"#ffffff71"} 
                onChangeText={setCode}
                style= {styles.input}>
            </TextInput>
            
            <TouchableOpacity style={styles.button} onPress={() => getProfile(code)}><Text style={{fontSize: 18, fontWeight: 500}}>CONFIRMAR</Text> </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        gap: 12,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        alignItems: "center", 
        backgroundColor: COLORS.gold,
        padding: 16,
        borderRadius: wp("1%"),
        width: wp("80%"),


    },
    input: {
        color: COLORS.textPrimary,
        borderColor: COLORS.gold,
        borderWidth: 1,
        borderRadius: wp("1%"),
        textAlign: "center",
        width: wp("80%"),
    }
})