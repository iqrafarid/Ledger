import { View, Text, Pressable, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../config';

export default function PeopleListScreen({ navigation }) {
  const [people, setPeople] = useState([]);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYTY4N2Y2YTJjZThlZDQxY2JhYzEzZSIsImlhdCI6MTc4OTI5ODgxMCwiZXhwIjoxNzg5OTAzNjEwfQ.i6Fk1PZIvAPHaQK7XSSzY6h93IAPHgrMKE7ZcPUM120";
  useFocusEffect(
  useCallback(() => {
    fetchPeople();
  }, [])
);

  const fetchPeople = async () => {
    console.log("fetchPeople called");
    try {
      const response = await axios.get(`${API_URL}/api/people`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPeople(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>People List Screen</Text>
      <Pressable  onPress={()=>navigation.navigate('AddPerson')}>
        <Text>+ Add Person</Text>
      </Pressable>
      <FlatList
        data={people}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('PersonDetail', { personId: item._id })}>
            <Text>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}