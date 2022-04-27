const res = require('express/lib/response');
const Charges = require('../Database/charges.json')

const Pincode = require("../Database/pincode-zones.json")

exports.getCharge = async(req,res)=>{
    try{
        const address = req.body ;
        const {pincode,type,weight} = address

        // if any one of them empty or not provide then simply return error
        if(!pincode || !type || !weight){
            return res.status(404).json({
                success:false,
                err:"please fill all the detatils"
            })
        }

        // pin code validation
        let pin = pincode+""
        if(pin.length<6 || pin.length > 6){
            return res.status(404).json({
                success:false,
                err:"please give the correct pincode"
            })
        }

        // pincode present or not 
        let isAvailable = Pincode.filter((each)=>each.pincode == pincode);
        if(isAvailable.length == 0){
            return res.status(404).json({
                success:false,
                err:"this pincode is not available please try another"
            })
        }

        // get the zone

        let addressZone = Pincode.filter((each)=> (each.pincode=== +pincode ? each:""));
        let zone = addressZone[0].Zone;
        // result weight 
        let res_weight = Math.round(weight / 0.5) * 0.5;

        let result = Charges.filter((each)=>(each.Zone===zone && each.type ===type));
        let first_half = result[0].first_half_kg;
        let second_half = result[0].additional_each_halfkg;

        // calculated the charges
        let sum = 0
        let first = true
        while(res_weight!=0){
            if(first){
                res_weight = res_weight-0.5
                sum+=first_half
                first= false
            }else{
                res_weight = res_weight-0.5
                sum+=second_half;
                res_weight-0.5
            }
            
        }


        // all are ok
        res.status(200).json({
            success:true,
            TotalCharges:sum.toFixed(2)
        })
    }
   catch (error) {
        res.status(404).json({
            success:false,
            err:error.message
        })      
    }
}



exports.getData = async(req,res)=>{
    try{
        res.status(200).json({
            success:true,
            mine:"server is running",
        })
    }
    catch (error) {
        res.status(404).json({
            success:false,
            err:error.message
        })      
    }
}