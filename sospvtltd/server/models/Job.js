import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

specialSkills:{
type:String
},

otherInfo:{
type:String
},

industry:{
type:String
},

employmentType:{
type:String
},

vacancy:{
type:Number
},

experience:{
type:String
},

salary:{
type:String
},

location:{
type:String
},

lastDate:{
type:Date
}

},{
timestamps:true
})

export default mongoose.model("Job",jobSchema)
