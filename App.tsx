import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View ,TextInput} from 'react-native'
import React, { useState } from 'react'
import { object, string, number, date, InferType } from 'yup';
import { Formik } from 'formik';
import BouncyCheckBox from "react-native-bouncy-checkbox";


const PasswordSchema = object().shape({
  passwordLength: number().required('Length is required').positive().integer().min(4,'should be minimum of 4 characters').max(20,'should be maximum of 20 characters'),
});




export default function App() {
  
  const [password,setPassword]=useState('');//the password has a default value of an empty string bcoz we used  '' in the useState function

  const [isPassGenerated,setIsPassGenerated]=useState(false);

  const [lowerCase,setlowerCase]=useState(false);
  const [upperCase,setupperCase]=useState(false);
  const [numbers,setNumbers]=useState(false);
  const [symbols,setSymbols]=useState(false);


  const generatePasswordString=(passwordLength:number)=>{

    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitChars
    }
    if (symbols) {
      characterList += specialChars
    }

    const passwordResult = CreatePassword(characterList, passwordLength)
    setPassword(passwordResult)
    setIsPassGenerated(true)
  }
  

  const CreatePassword=(characters:string,passwordLength:number)=>{
    let result='';
    for (let i = 0; i< passwordLength; i++) {
      const characterIndex=Math.round(Math.random() * characters.length);
      result+=characters.charAt(characterIndex);
      }
    return result;
  }

  const resetPasswordState=()=>{
    setPassword('')
    setIsPassGenerated(false)
    setlowerCase(true)
    setupperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView style={styles.appContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Password Generator</Text>
              <Formik
       initialValues={{ passwordLength: ''}}
       validationSchema={PasswordSchema}
       onSubmit={ values => {
        console.log(values);
        generatePasswordString(Number(values.passwordLength))
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleReset,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>PassWord Length</Text>
            {touched.passwordLength && errors.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
            
          </View>
          <TextInput 
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder='ex . 8'
            keyboardType='numeric'
            
            />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include lowercase</Text>
          <BouncyCheckBox
          disableBuiltInState
          isChecked={lowerCase}
          onPress={() => setlowerCase(!lowerCase)}
          fillColor="#29AB87"
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckBox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setupperCase(!upperCase)}
                    fillColor="#FED85D"
                  />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckBox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#C9A0DC"
                  />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckBox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#FC80A5"
                  />
         </View>

         <View style={styles.formActions}>
          <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn}
          onPress={handleSubmit}>
            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.secondaryBtn}
          onPress={()=>{
            handleReset()
            resetPasswordState()
          }}>
            <Text style={styles.secondaryBtnTxt}>
            Reset Password
            </Text>
          </TouchableOpacity>
         </View>
         </>
       )}
              </Formik>
            </View>
            <View>
              {isPassGenerated ? (
                  <View style={[styles.card,styles.cardElevated]} >
                    <Text style={styles.subTitle}>Result : </Text>
                    <Text style={styles.description}>Long Press To Copy </Text>

                    <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
                  </View>
              ): null}
            </View>
        </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});