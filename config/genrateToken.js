import jwt from "jsonwebtoken";
export const genrateToken=(user)=>{
    let jwtScrit=process.env.JWT_STRING;
    let data={
        userName:user.userName,
        _id:user._id,
        role:user.role
    }
    const token=jwt.sign(data,jwtScrit,{expiresIn:'30m'
    
}) ;
    return token;

}