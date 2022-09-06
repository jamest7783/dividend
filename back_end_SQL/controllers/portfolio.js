const {Portfolio,Order}=require('../models')
const order = require('../models/order')

const createPortfolio=async (req,res)=>{
    try{
        const {name,description,capital}=req.body 
        const portfolio=await Portfolio.create({
            name,
            description,
            capital
        })
        res.status(200).json(portfolio)
    }catch(error){throw error}
}
const readPortfolio=async (req,res)=>{
    try{
        const {pk}=req.params
        const portfolio=await Portfolio.findByPk(pk)
        !portfolio?
        res.status(200).json({alert:`Portfolio with PK: ${pk} not found.`}):
        res.status(200).json(portfolio)
    }catch(error){throw error}
}
const readPortfolioPositions=async (req,res)=>{
    try{
        const {pk}=req.params
        const orders=await Order.findAll({where:{portfolioId:pk}})
        let positions={}
        orders.map((order)=>{
            if(!positions[order.equityId]){
                positions[order.equityId]={
                    equityId:order.equityId,
                    price:parseFloat(order.price)
                }
            }
            else{
                positions[order.equityId].price+=parseFloat(order.price)
            }

        })
        res.status(200).json(positions)
    }catch(error){throw error}

}




const updatePortfolio=async (req,res)=>{
    try{
        const {pk}=req.params
        const portfolio=await Portfolio.update({...req.body},{where:{id:pk},returning:true})
        !portfolio?
        res.status(200).json({alert:`Portfolio with PK: ${pk} not found.`}):
        res.status(200).json(portfolio)
    }catch(error){throw error}
}
const deletePortfolio=async (req,res)=>{ 
    try{
        const {pk}=req.params
        const portfolio=await Portfolio.findByPk(pk)
        !portfolio?
        res.status(200).json({alert:`Portfolio with PK: ${pk} not found.`}):
        await Portfolio.destroy({where:{id:pk}})
        res.status(200).json({alert:`Portfolio with PK: ${pk} deleted.`})
    }catch(error){throw error}
}

module.exports={
    createPortfolio,
    readPortfolio,
    updatePortfolio,
    deletePortfolio,
    readPortfolioPositions
}



