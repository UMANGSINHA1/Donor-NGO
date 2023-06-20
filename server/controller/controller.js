var Donordb=require('../model/model');
var NGOdb=require('../model/model');
// create and save new user
exports.create=(req,res)=>{
    //validate user
    if(!req.body){ //it means if user makes post request with empty body return from this callback function
        res.status(400).send({message:"Content cannot be empty."});
        return;
    }
    //new user
    const user= new Donordb({
        Username:req.body.Username,
        Password:req.body.Password,
        
    })
    //save donor in database
    user
    .save(user)
    .then(data=>{
     res.redirect('/login');
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message ||"Some error occured while creating a create operation"
        });
        

    });

}
//retrieve and return all users/single user
exports.find=(req,res)=>{
    if(req.query.id){    //to find information of specific user
        const id=req.query.id;
        Donordb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found user with id" + id})
            }
            else{
                res.send(data)
            }

        })
        .catch(err=>{
            res.status(500).send({message:err.message||"Error occured while retrieving user information with id="+id})  
        })
    }
    else{
        Donordb.find()   //to find information of all users
        .then(user=>{
         res.send(user)
        })
        .catch(err=>{
         res.status(500).send({message:err.message||"Error occured while retrieving user information"})
        })
    }

}
//update a new identified user by user id
exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to be updated cannot be empty."})
    }
    const id=req.params.id; //id to be updated
    Donordb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Cannot update user by this id .Maybe user not found "})
        }
        else{
            res.send(data)
        }
    })
        .catch(err=>{
            res.status(500).send({message:"Error update user information"})
           })

   

}
//delete a user of specified user id
exports.delete=(req,res)=>{
    const id=req.params.id;
    Donordb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
        res.status(404).send({message:"Cannot delete with this id"})
    }
    else{
        res.send({message:"User deleted succesfully."})
    }
})
.catch(err=>{
res.status(500).send({message:"could not delete user with id="+ id})
})
}



exports.create=(req,res)=>{
    //validate  NGO
    if(!req.body){ //it means if user makes post request with empty body return from this callback function
        res.status(400).send({message:"Content cannot be empty."});
        return;
    }
    //newNGO
    const ngouser= new NGOdb({
        Username:req.body.Username,
        Password:req.body.Password,
        
    })
    //save ngo in database
    ngouser
    .save(ngouser)
    .then(data=>{
     res.redirect('/NGOlogin');
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message ||"Some error occured while creating a create operation"
        });
        

    });

}
//retrieve and return all ngo/single ngo
exports.find=(req,res)=>{
    if(req.query.id){    //to find information of specific user
        const id=req.query.id;
        NGOdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found NGO with id" + id})
            }
            else{
                res.send(data)
            }

        })
        .catch(err=>{
            res.status(500).send({message:err.message||"Error occured while retrieving NGO information with id="+id})  
        })
    }
    else{
        NGOdb.find()   //to find information of all ngos
        .then(ngouser=>{
         res.send(ngouser)
        })
        .catch(err=>{
         res.status(500).send({message:err.message||"Error occured while retrieving ngo information"})
        })
    }

}
//update a new identified ngo by ngo id
exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to be updated cannot be empty."})
    }
    const id=req.params.id; //id to be updated
    NGOdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Cannot update user by this id .Maybe user not found "})
        }
        else{
            res.send(data)
        }
    })
        .catch(err=>{
            res.status(500).send({message:"Error update user information"})
           })

   

}
//delete a ngo of specified user id
exports.delete=(req,res)=>{
    const id=req.params.id;
    NGOdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
        res.status(404).send({message:"Cannot delete with this id"})
    }
    else{
        res.send({message:"NGO deleted succesfully."})
    }
})
.catch(err=>{
res.status(500).send({message:"could not delete user with id="+ id})
})
}