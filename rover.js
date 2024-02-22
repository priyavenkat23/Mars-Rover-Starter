const Message = require("./message");

class Rover {
   // Write code here!

   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

    receiveMessage(message){ 
      
     let modeResult=[];
     let modeChng_LowPower = false;
     for(let i=0;i<message.commands.length; i++){
      let commandType = message.commands[i].commandType;
      
      if(commandType== 'STATUS_CHECK'){
         modeResult.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: 110, position: this.position}});
         
      }else if(commandType == 'MODE_CHANGE'){
         if(message.commands[i].value == 'LOW_POWER'){
            modeChng_LowPower= true;         
         }
         this.mode = message.commands[i].value;        
         modeResult.push({completed: true});
         
      }else if(commandType=='MOVE'){
         if(!modeChng_LowPower){
            this.position = message.commands[i].value;
            modeResult.push({completed: true});
         }else{
            modeResult.push({completed: false});
         }
         
      }
     }
     
      let reponse = {message: message.name, 
                     results:modeResult};
       return reponse;
    }
}

module.exports = Rover;
