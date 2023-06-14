const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.use(cors());



var dataBase = JSON.parse(fs.readFileSync("./pokedex/pokemon.json", "utf-8"));


//root


app.get('/pokemon', (req,res)=>{
    if(!dataBase){
        res.status(404).json({succes: false, message:"database undifined"})
    }else{
        res.status(200).json({succes: true, data: dataBase});
    };
});
app.get('/pokemon/images/:id', (req,res)=>{
    let {id} = req.params;
    res.status(200).sendFile(`${id}.png`, {root: __dirname + "/pokedex/images/"});
});

app.get("/pokemon/type/:type", (req, res)=>{
    var {type} = req.params;
    var filterpokemon = dataBase.filter( pokemon => pokemon.type[0] == type);
    if(!filterpokemon){
        res.status(404).json({succes: false, message: "pokemon not found"});
    }else{
        res.status(200).json({succes: true, data: filterpokemon});
    };
})

app.get('/pokemon/:id', (req,res)=> {
    var {id} = req.params
    var filterpokemon = dataBase.filter(pokemon => pokemon.id == id);
    if(!filterpokemon){
        res.status(404).json({succes: false, message: "pokemon not found"});
    }else{
        res.status(200).json({succes: true, data: filterpokemon});
    };
});

//listen port
app.listen(3000);