import { View, Text, Pressable, FlatList } from 'react-native';
import { API_URL } from '../config';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function PersonDetailScreen({ navigation,route}) {
  const {personId} = route.params;
  const[summary,setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [personName,setPersonName] = useState("")

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYTY4N2Y2YTJjZThlZDQxY2JhYzEzZSIsImlhdCI6MTc4OTI5ODgxMCwiZXhwIjoxNzg5OTAzNjEwfQ.i6Fk1PZIvAPHaQK7XSSzY6h93IAPHgrMKE7ZcPUM120";

  useFocusEffect(
  useCallback(() => {
  
     personDetails();
  }, [])
);



  const personDetails = async()=>{
    try{
      const summaryRs = await axios.get(`${API_URL}/api/people/${personId}/summary`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSummary(summaryRs.data)
      const transactionRs = await axios.get(`${API_URL}/api/transactions/person/${personId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTransactions(transactionRs.data)
      const personRs = await axios.get(`${API_URL}/api/people/${personId}`, {
        headers: { Authorization: `Bearer ${token}` }
        });
        setPersonName(personRs.data.name);
    }catch(error){
      console.log(error)
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Person Detail Screen</Text>
      <Text>{personName}</Text>
      {summary && (
        <>
        <Text>Net Balance:{summary.net} </Text>
      <Text>TheyOweMe:{summary.theyOweMe}</Text>
      <Text>I Owe Them:{summary.iOweThem}</Text>
      </>
      

      )}
      
      <FlatList 
      data={transactions}
      keyExtractor = {(item)=>item._id}
      renderItem={({ item }) => (
        <View>
          <Text>Amount:{item.amount}</Text>
          <Text>Direction:{item.direction}</Text>
          <Text>Date:{item.date}</Text>
        </View>          
              )}
      />
      <Pressable onPress={() => navigation.navigate('AddTransaction',{personId})}>
        <Text>Go to Add Transaction</Text>
      </Pressable>
    </View>
  );
}