import React,{useState} from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,FlatList,ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import MiniCard from '../components/MiniCard'
const SearchScreen = ()=>{
    const [value,setValue] = useState("")
    //https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=songs&type=video&key=AIzaSyBdjAqUGpVlP2FkqV8NRCeJpXrXW6cxg3I
    
    const [minicardData,setMiniCard] = useState([])
    const [loading,setLoading] = useState(false)
    const fetchData = ()=>{
        setLoading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyBdjAqUGpVlP2FkqV8NRCeJpXrXW6cxg3I`)
        .then(res=>res.json())
        .then(data=>{
            setLoading(false)
            setMiniCard(data.items)
        })
    }
    
    return(
        <View style={{flex:1}}>
            <View style={{
                flexDirection:"row",
                padding:5,
                justifyContent:"space-around",
                elevation:4,
                backgroundColor:"white"

            }}>
                <Ionicons name="md-arrow-back" size={32} />
                <TextInput 
                    onChangeText={(text)=>setValue(text)}
                    style={{
                        width:"70%",
                        backgroundColor:"#e6e6e6"
                    }}
                    value={value}
                />
                <Ionicons name="md-send" size={32}
                    onPress = {()=>{fetchData()}}
                />
            </View>
        {loading?
        <ActivityIndicator 
            style={{margin:10}}
            size="large"
            color="red"
        />:null
        }
        
        <FlatList 
            data = {minicardData}
            renderItem={({item})=>{
                return <MiniCard 
                videoId={item.id.videoId}
                title={item.snippet.title}
                channel={item.snippet.channelTitle}
                />
            }}
            keyExtractor={item=>item.id.videoId}
        />
        </View>

    

    )


}

export default SearchScreen