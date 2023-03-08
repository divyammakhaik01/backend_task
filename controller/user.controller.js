const userProfile = require('../models/userprofile.model')
const user  = require('../models/user.model')

const createProfile = async(email , username , age) => {
    await userProfile.create({
        email : email , 
        username : username , 
        age : age
    })
}

const userprofileExistInDatabase = async(email) =>{
    const userProfileExist = await userProfile.find({
        email : email
    })
    return userProfileExist.length === 1
}

const create = async(req , res) =>{

    try {

        const {email , username , age} = req.body ;

        if(!email || !username || !age){
            return res.json({
                "status" : "false" , 
                "message" : "email or username or age missing"
            })
        }

        // check if already exist in database 
         
        if(await userprofileExistInDatabase(email)){
            return res.json({
                "status" : "false" , 
                "message" : "userprofile has already being created with this email"
            })
        }

        // create profile 
        
        await createProfile(email , username , age)


        return res.status(200).json({
            "status" :"true" , 
            "message" : "user profile created successfully"
        })  
    } catch (error) {
        return res.json({
            "status" : "false" , 
            "message" : error
        })
    }

}

const findUserByEmail = async(email) =>{

    const user = await userProfile.findOne({email : email}) ; 
    return user ; 
}


const editProfile = async(newEmail , newUsername , newAge) => {

    const user = await findUserByEmail(newEmail) ; 
    
    const updatedEmail = newEmail === undefined ? user.email : newEmail ;
    const updatedUsername = newUsername === undefined ? user.username : newUsername ;
    const updatedAge = newAge === undefined ? user.age : newAge ;
    
    const updateProfile =  await userProfile.findOneAndUpdate({
        email : newEmail
    }, {
        email :  updatedEmail, 
        username : updatedUsername , 
        age : updatedAge , 
    },{
        returnOriginal:false
    })

    return updateProfile ;
}

const edit = async(req , res) =>{

    try {

        // const {email , username , age} = req.body 
        const email = req.body.email ;
        const username = req.body.username ;
        const age = req.body.age ;

        if(email === undefined){
            return res.json({
                "status" :"false" , 
                "message" :"email does not exist"
            })
        }

        if(!await userprofileExistInDatabase(email)){
            return res.json({
                "status" :"false" , 
                "message" : "user profile with this email doesn't exist in the database"
            })
        }
        const udpatedProfle = await editProfile(email , username , age) ;
        return res.json({
            "status" : "true" , 
            "message" : "user profile edit successfully" , 
            "updateProfile" : udpatedProfle
        })
        
    } catch (error) {
       return res.json({
        "status" : "false" , 
        "message" : error
       }) 
    }

}

const getAllUsers = async(req , res) =>{

    try {

        const allUsers = await user.find();
        
        return res.json({
            "status" : "true" , 
            "message" : allUsers
        })
        
    } catch (error) {
       return res.json({
        "status" : "false" , 
        "message" : error
       }) 
    }

}


const UserProfileController = {
    create , 
    edit , 
    getAllUsers
}

module.exports = UserProfileController 