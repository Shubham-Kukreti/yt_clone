import React,{useState} from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,FlatList,ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import MiniCard from '../components/MiniCard'
import Constant from 'expo-constants'
import {useSelector,useDispatch} from 'react-redux'
import {useTheme} from '@react-navigation/native'
const SearchScreen = ({navigation})=>{
    const {colors} = useTheme()
    const mycolor = colors.iconColor
    const [value,setValue] = useState("")
    const dispatch = useDispatch()
    const miniCardData = useSelector(state=>{
        return state.cardData
    })
    const [loading,setLoading] = useState(false)
    const fetchData = ()=>{
        setLoading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=YOUTUBE_API_KEY`)
        .then(res=>res.json())
        .then(data=>{
            setLoading(false)
            dispatch({type:"add",payload:data.items})
        })
    }
    
    return(
        <View style={{flex:1}}>
            <View style={{
                flexDirection:"row",
                padding:5,
                justifyContent:"space-around",
                elevation:4,
                backgroundColor:"white",
                marginTop:Constant.statusBarHeight,
                backgroundColor:colors.headerColor

            }}>
                <Ionicons 
                    style={{color:mycolor}}
                    name="md-arrow-back" size={32} 
                    onPress={()=>navigation.goBack()}
                />
                <TextInput 
                    onChangeText={(text)=>setValue(text)}
                    style={{
                        width:"70%",
                        backgroundColor:"#e6e6e6"
                    }}
                    value={value}
                />
                <Ionicons 
                    style={{color:mycolor}}
                    name="md-send" size={32}
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
            data = {miniCardData}
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