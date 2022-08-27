const catchAsync = require("./../utils/catchAsync");
const Email = require("./../utils/email")

exports.test = catchAsync(async (req,res,next)=>{
    console.log("HEllo")
    const user = {
        email : "test@gmail.com",
        name : "Mohd Ali"
    }

    // const url = `${req.protocol}:/${req.get('host')}/me`;
    const url = `https://www.instagram.com`;
    // console.log(url);
    await new Email(user, url).sendOtp();

    
    return res.status(200).json({Status:true})
})