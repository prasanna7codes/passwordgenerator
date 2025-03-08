import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { object, string, number, date, InferType } from 'yup';


const PasswordSchema = object().shape({
  passwordLength: number().required('Length is required').positive().integer().min(4,'should be minimum of 4 characters').max(20,'should be maximum of 20 characters'),
});




export default function App() {
  
  const [password,setPassword]=useState('');//the password has a default value of an empty string bcoz we used  '' in the useState function

  const [isPassGenerated,setIsPassGenerated]=useState(false);

  const [lowercase,setlowerCase]=useState(false);
  const [uppercase,setUpperCase]=useState(false);
  const [numbers,setNumbers]=useState(false);
  const [symbols,setSymbols]=useState(false);


  const generatePasswordString=(passwordLength:number)=>{
    //
  }
  

  const CreatePassword=(characters:string,passwordLength:number)=>{
    //
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