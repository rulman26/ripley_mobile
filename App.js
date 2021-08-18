
import React, { useState , memo} from 'react';
import { StyleSheet, Text, View , Alert} from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';


export default function App() {
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState(false);
    const [birthDate, setBirthDate] = useState('1990-07-26');
    const [birthDateError, setBirthDateError] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const validateForm = () => {
        let valid = true
        if (firstName.trim().length === 0) {
            setFirstNameError(true)
            valid = false
        }else{
            setFirstNameError(false)
        }
        if (lastName.trim().length === 0) {
            setLastNameError(true)
            valid = false
        }else{
            setLastNameError(false)
        }
        if (isNaN(Date.parse(birthDate))) {
            setBirthDateError(true)
            valid = false
        }else{
            setBirthDateError(false)
        }
        return valid
    }

    const onSubmit = async () => {
        let valid = validateForm()
        if(valid){
            setDisabled(true)
            let response = await fetch('https://fernettech.com/api-ripley/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    birthDate
                })
            });
            let data= await response.json();
            if (data){
                alertSuccess()
                setDisabled(false)
                setFirstName('')
                setLastName('')
                setBirthDate('')
            }
        }
    }

    const alertSuccess = () =>
        Alert.alert(
        "",
        "Datos almacenados correctamente",
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );

    return (
        <View >
            <Text style={styles.header}>Registrar persona</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresar nombre"
                underlineColor="transparent"
                mode="outlined"
                onChangeText={text => setFirstName(text)}
                value={firstName}
            />
            {
                firstNameError && <Text style={styles.error}>Ingresar nombre</Text>
            }
            
            <TextInput
                style={styles.input}
                placeholder="Ingresar apellidos"
                underlineColor="transparent"
                mode="outlined"
                onChangeText={text => setLastName(text)}
                value={lastName}
            />
            
            {
                lastNameError && <Text style={styles.error}>Ingresar apellido</Text>
            }
            <TextInput
                style={styles.input}
                placeholder="yyyy-mm-dd"
                underlineColor="transparent"
                mode="outlined"
                type="date"
                onChangeText={text => setBirthDate(text)}
                value={birthDate}
            />
            {
                birthDateError && <Text style={styles.error}>fecha nacimiento incorrecto</Text>
            }
            <Button style={styles.button} mode="contained" onPress={() => onSubmit()} disabled={disabled}>
                Guardar
            </Button>

            
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        margin:8,
        fontSize: 26,
        color: "black",
        fontWeight: 'bold',
        paddingTop:32
    },
    input: {
        paddingTop:8,
        height:48,
        marginLeft:8,
        marginRight:8
    },
    button: {
        paddingTop:8,
        marginLeft:8,
        marginRight:8,
        marginTop:32
    },
    error: {
        fontSize: 15,
        color: "red",
        marginLeft:12,
    }
});
