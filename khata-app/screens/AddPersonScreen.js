import {TextInput, View, Text, Pressable} from 'react-native';
import {useState} from 'react';
import axios from 'axios';
import { API_URL } from '../config';

export default function AddPersonScreen({navigation}){
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [alias,setAlias] = useState('');
    const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYTY4N2Y2YTJjZThlZDQxY2JhYzEzZSIsImlhdCI6MTc4OTQ3Mjk4NywiZXhwIjoxNzkwMDc3Nzg3fQ.bXriSKcT_pGT_Y08L-0E1mDOlWCrwmN-oLBbxEZxkTE"

    const handleAddPerson = async ()=>{
        try{
            const response = await axios.post(`${API_URL}/api/people`, {
                name,phone,aliases: alias ? [alias] : []},
                {headers:{Authorization:`Bearer ${token}`}});
            navigation.goBack();
        }
        catch(err){
    console.log("Error adding person:", err.response?.data);
}
    }

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder="Enter name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Enter phone number"
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                placeholder="Enter alias (optional)"
                value={alias}
                onChangeText={setAlias}
            />
            <Pressable onPress={handleAddPerson}>
                <Text>Add Person</Text>
            </Pressable>
        </View>
    )
}