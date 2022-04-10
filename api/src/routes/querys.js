const router = require('express').Router()
const mysqlConnection = require('../database')

//envia los datos sin filtrar
router.get('/producto' , (req , res)=>{
    mysqlConnection.query('SELECT * FROM product',(err,rows,field)=>{
        if(!err){
            res.json(rows);
            console.log("Se ha realizado una consulta a la BD!!")
        }else{
            console.log(err);
        }
    })
    
})
//envia los datos de un producto especifico
router.get('/producto/:name',(req,res)=>{
    const { name } = req.params;
    const like = `%${name}%`
    mysqlConnection.query('SELECT * FROM product WHERE name LIKE ?',[like],(err,rows,field)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})
//crear una query para obtener los datos por categoria
router.get('/:id',(req,res)=>{
    const { id } = req.params;
    const query = `SELECT product.name, product.price, product.discount, product.url_image FROM product LEFT JOIN category ON product.category = category.id WHERE category.id = '${id}'`
    mysqlConnection.query(query,(err,rows,field)=>{
        if(!err){
            res.json(rows);
            console.log("Se han enviado datos filtrados")
        }else{
            console.log(err);
        }
    })
})
module.exports  = router



