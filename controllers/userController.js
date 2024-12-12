const userController = {
    login:(req,res,next)=>{
        res.send('Estas en la vista Login')
    },
    register:(req,res,next)=>{
        res.send('Estas en la vista register')
    },
    profile:(req,res,next)=>{
        res.send('Estas en la vista profile')
    },
}

module.exports = userController;