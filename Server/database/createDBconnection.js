import mongoose from "mongoose";
const createDBconnection = async (username,password) => {
    const dbUrl=`mongodb://valeena:160250@ac-3qpaw8x-shard-00-00.wgwbi04.mongodb.net:27017,ac-3qpaw8x-shard-00-01.wgwbi04.mongodb.net:27017,ac-3qpaw8x-shard-00-02.wgwbi04.mongodb.net:27017/?ssl=true&replicaSet=atlas-bbtllz-shard-0&authSource=admin&retryWrites=true&w=majority`;   
     try {
        await mongoose.connect(dbUrl, { useNewUrlParser: true });//async funtion that returns promise
        console.log("DB COnnected")
    }
    catch (error) {
        console.log("error in db connection", error)
    }

}

export default createDBconnection;