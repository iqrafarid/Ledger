import { View, Text, TextInput, Pressable } from 'react-native';
import {useState} from 'react'
import axios from 'axios';
import { API_URL } from '../config';
import DateTimePicker from '@react-native-community/datetimepicker'
export default function AddTransactionScreen({navigation,route}) {
  const {personId} = route.params;
  const [amount,setAmount] = useState("");
  const [note,setNote] = useState("")
  const [direction,setDirection] = useState("theyOweMe")
  const [date,setDate] = useState(new Date());
  const [dueDate,setDueDate] = useState(new Date())
  const [showPicker,setShowPicker] = useState(false)
  const [showDuePicker,setShowDuePicker] = useState(false)

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYTY4N2Y2YTJjZThlZDQxY2JhYzEzZSIsImlhdCI6MTc4OTI5ODgxMCwiZXhwIjoxNzg5OTAzNjEwfQ.i6Fk1PZIvAPHaQK7XSSzY6h93IAPHgrMKE7ZcPUM120";

  const handleAddtransaction = async ()=>{
        try{
            const response = await axios.post(`${API_URL}/api/transactions`, 
              {person: personId, amount: Number(amount) , direction, notes: note, date, dueDate},
                {headers:{Authorization:`Bearer ${token}`}});
            navigation.goBack();
        }
        catch(err){
    console.log("Error adding person:", err.response?.data);
}
    }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Transaction Screen</Text>
  
      <TextInput value={amount} onChangeText={setAmount} placeholder="Enter Amount" />
      <TextInput value={note} onChangeText={setNote} placeholder="Enter Note" />
      <Pressable onPress={()=>setDirection("theyOweMe")}>
        <Text style={{fontWeight:direction === "theyOweMe"?'bold':'normal'}}>
          They Owe Me
        </Text>
      </Pressable>
      <Pressable onPress={()=>setDirection("iOweThem")}>
        <Text style={{fontWeight:direction === "iOweThem"?'bold':'normal'}}>
          iOweThem 
        </Text>
      </Pressable>
      <Pressable onPress={()=>setShowPicker(true)}>
        <Text>Select Date: {date.toDateString()}</Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
        value={date}
        mode="date"
        onChange={(click,selectedDate)=>{
          setShowPicker(false)
          if(selectedDate) setDate(selectedDate)
        }}
      />
      )}
      <Pressable onPress={()=>setShowDuePicker(true)}>
        <Text>Select Date: {dueDate.toDateString()}</Text>
      </Pressable>
      {showDuePicker && (
        <DateTimePicker
        value={dueDate}
        mode="date"
        onChange={(click,selectedDate)=>{
          setShowDuePicker(false)
          if(selectedDate) setDueDate(selectedDate)
        }}
      />
      )}

      <Pressable onPress={handleAddtransaction}>
        <Text >
          Submit
        </Text>
      </Pressable>
    
    </View>
  );
}
