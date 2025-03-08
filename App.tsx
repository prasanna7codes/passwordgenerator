import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { object, string, number, date, InferType } from 'yup';


const PasswordSchema = object().shape({
  passwordlength: number().required('Length is required').positive().integer().min(4,'should be minimum of 4 characters').max(20,'should be maximum of 20 characters'),
});




export default function App() {
  return (
    <View>
      <Text>App again

      </Text>
    </View>
  )
}

const styles = StyleSheet.create({})