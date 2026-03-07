import React,{useEffect,useRef} from "react";
import {View,StyleSheet,Animated,Easing} from "react-native";

type Props={
 size?:number;
 color?:string;
 count?:number;
};

export default function AppLoader({
 size=70,
 color="#2A7DE1",
 count=10
}:Props){

 const animations=useRef(
  Array.from({length:count},()=>new Animated.Value(0))
 ).current;

 useEffect(()=>{

  const loops=animations.map((anim,index)=>
   Animated.loop(
    Animated.sequence([
     Animated.delay(index*120),
     Animated.timing(anim,{
      toValue:1,
      duration:600,
      easing:Easing.linear,
      useNativeDriver:true
     }),
     Animated.timing(anim,{
      toValue:0,
      duration:600,
      easing:Easing.linear,
      useNativeDriver:true
     })
    ])
   )
  );

  loops.forEach(l=>l.start());

  return()=>loops.forEach(l=>l.stop());

 },[]);

 const radius=size/2.2;
 const dotSize=size/8;

 return(
  <View style={{width:size,height:size,alignItems:"center",justifyContent:"center"}}>
   {animations.map((anim,i)=>{

    const angle=(i/count)*2*Math.PI;
    const x=Math.cos(angle)*radius;
    const y=Math.sin(angle)*radius;

    const scale=anim.interpolate({
     inputRange:[0,1],
     outputRange:[0.4,1]
    });

    const opacity=anim.interpolate({
     inputRange:[0,1],
     outputRange:[0.3,1]
    });

    return(
     <Animated.View
      key={i}
      style={[
       styles.dot,
       {
        width:dotSize,
        height:dotSize,
        borderRadius:dotSize/2,
        backgroundColor:color,
        opacity, // ✅ FIXED HERE (NOT in transform)
        transform:[
         {translateX:x},
         {translateY:y},
         {scale}
        ]
       }
      ]}
     />
    );
   })}
  </View>
 );
}

const styles=StyleSheet.create({
 dot:{
  position:"absolute"
 }
});