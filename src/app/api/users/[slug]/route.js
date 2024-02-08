import { User } from "@/lib/models"
import { connectToDb } from "@/lib/utils"
import { NextResponse } from "next/server"

export const GET = async(request, {params})=>{

    const {slug} = params
    try{


const user = User.findOne({slug})

return NextResponse.json(user)

connectToDb()




    }catch(err){
console.log(err)
throw new Error('Something went wrong in route slug users')
    }
}