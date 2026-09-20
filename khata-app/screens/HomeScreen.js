import { View, Text, Pressable,FlatList } from 'react-native';
import {useState, useCallback} from 'react'
import {useFocusEffect} from '@react-navigation/native'
import axios from 'axios';
import { API_URL } from '../config';

export default function HomeScreen({ navigation }) {
  const [summary,setSummary] = useState(null)
  const [upcomming,setUpcomming] = useState([])
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYTY4N2Y2YTJjZThlZDQxY2JhYzEzZSIsImlhdCI6MTc4OTI5ODgxMCwiZXhwIjoxNzg5OTAzNjEwfQ.i6Fk1PZIvAPHaQK7XSSzY6h93IAPHgrMKE7ZcPUM120";

  useFocusEffect(
  useCallback(() => {
    fetchSummary();
    fetchUpcomingTransactions();
  }, [])
);
  
  const fetchSummary = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/summary`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSummary(response.data)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUpcomingTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/transactions/upcoming`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUpcomming(response.data)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Pressable onPress={() => navigation.navigate('People',{screen:"PeopleList"})}>
        <Text>Go to People List</Text>
      </Pressable>
      <Text>All Transactions Summary</Text>
      {summary && (
        <>
        <Text>Net Balance:{summary.net} </Text>
      <Text>TheyOweMe:{summary.theyOweMe}</Text>
      <Text>I Owe Them:{summary.iOweThem}</Text>
      </>
      )}
      <Text>Upcomming Transactions</Text>
      <FlatList
              data={upcomming}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View>
                <Text>{item.person.name}</Text>
                <Text>{item.dueDate}</Text>
                </View>
                      
              )}
            />
      <Pressable onPress={() => navigation.navigate('People',{screen:"AddPerson"})}>
        <Text>Add Person</Text>
      </Pressable>
    </View>
  );
}