import mongoose from "mongoose";
export  async function connect(){
   try {console.log('connecting');
   if(process.env.DB_URI){console.log(process.env.DB_URI)
      await mongoose.connect(process.env.DB_URI);}
      else{console.error('DB_URI not found')}
      
    const connection= mongoose.connection;
     
     connection.on('error',(error)=>{console.log('there is an issue');
    console.log(error);
   process.exit();});
   
    
   } catch (error) {console.error('somethingiswrong');
   console.error(error);
    
   } 
}