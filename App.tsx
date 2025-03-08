import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { object, string, number, date, InferType } from 'yup';


const PasswordSchema = object().shape({
  passwordLength: number().required('Length is required').positive().integer().min(4,'should be minimum of 4 characters').max(20,'should be maximum of 20 characters'),
});




export default function App() {
  
  const [password,setPassword]=useState('');//the password has a default value of an empty string bcoz we used  '' in the useState function

  const [isPassGenerated,setIsPassGenerated]=useState(false);

  const [lowerCase,setlowerCase]=useState(false);
  const [upperCase,setUpperCase]=useState(false);
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
    for (let i = 0; index < passwordLength; i++) {
      const characterIndex=Math.round(Math.random() * characters.length);
      result+=characters.charAt(characterIndex);
      }
    return result;
  }

  const resetPassword=()=>{
    //
  }

  return (
    <View>
      <Text>App again

      </Text>
    </View>
  )
}

const styles = StyleSheet.create({})