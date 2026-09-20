import { View, Text, TextInput, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
export default function EditPersonScreen({ route, navigation }) {
  const { personId } = route.params;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [existingAliases, setExistingAliases] = useState([]);
  const [newAlias, setNewAlias] = useState('');
  const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYTY4N2Y2YTJjZThlZDQxY2JhYzEzZSIsImlhdCI6MTc4OTQ3Mjk4NywiZXhwIjoxNzkwMDc3Nzg3fQ.bXriSKcT_pGT_Y08L-0E1mDOlWCrwmN-oLBbxEZxkTE"

useEffect(() => {
  fetchPerson();
}, []);

const fetchPerson = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/people/${personId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setName(response.data.name);
    setPhone(response.data.phone);
    setExistingAliases(response.data.aliases);
  } catch (err) {
    console.log(err);
  }
};

const handleUpdate = async () => {
  try {
    const updatedAliases = newAlias ? [...existingAliases, newAlias] : existingAliases;

    await axios.put(`${API_URL}/api/people/${personId}`,
      { name, phone, aliases: updatedAliases },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    navigation.goBack();
  } catch (err) {
    console.log("Error updating person:", err);
  }
}

  return (
    <View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <TextInput value={name} onChangeText={setName} placeholder="Name" />
  <TextInput value={phone} onChangeText={setPhone} placeholder="Phone" />

  <Text>Existing aliases: {existingAliases.join(', ')}</Text>

  <TextInput value={newAlias} onChangeText={setNewAlias} placeholder="Add a new alias" />

  <Pressable onPress={handleUpdate}>
    <Text>Save Changes</Text>
  </Pressable>
</View>
    </View>
  );
}