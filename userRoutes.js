const express = require('express');
const router = express.Router();
const userModule = require('./userModule')
const {connection} = require('./dataBase')
const bcrypt = require('bcrypt');
const salts = 10;


router.get('/', (req, res)=>{
    connection.query("SELECT * FROM usersInformation",(error, results) =>{
        if(error){
            console.log("Failed to fetch data :" + error.message);
        }else{
            res.status(200).send(results);
        }
    })
})



router.post('/new-user', async(req, res) =>{
    const {name, email, password} = req.body;
    
    try{
        const hashedPassword = await bcrypt.hash(password, salts);
        const User = new userModule(name, email,hashedPassword);

        connection.query("INSERT INTO usersInformation SET ?",User, (error, results)=>{
            if(error){
                res.status(401).send('Error trying to register :' + error.message);
            }else{
                res.status(200).send(User);
            }
        })
    }catch(error){
        res.status(500).send("Error register user :" + error.message)
    }
})

router.delete('/delete/:id', (req, res) =>{
    const id = req.params.id;
    connection.query("DELETE FROM usersInformation WHERE userID = ?", id,(error, results) =>{
        if(error){
            res.status(404).send("User not Found :" + error.message);
        }else{
            res.status(200).send("Deleted sucessfull");
        }
    })
})

module.exports = router;