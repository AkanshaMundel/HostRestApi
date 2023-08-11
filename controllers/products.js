const Product = require("../models/products")

const getAllProducts = async (req, res)=>{
    const {company,name, sort, select} = req.query;
    const queryObject ={}
    if(company){
        queryObject.company = company;
        
    }
    if(name){
        queryObject.name = {$regex:name , $options:"i"};//search by single char 
    }
    let apiData = Product.find(queryObject)
    if(sort){
        let sortFix = sort.replace(","," ");
        apiData = apiData.sort(sortFix);
    }
    //if any of in query write select then 
    if(select){
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }
    let page = Number(req.query.page)||1;
    let limit = Number(req.query.limit)||10;
    let skip = (page-1)*limit;
    apiData = apiData.skip(skip).limit(limit);
    console.log(queryObject);
    // const myData = await apiData.sort("name -price");
    // http://localhost:5000/api/products?select=name,company -> just in get show only name company 
    const myData = await apiData;
    console.log(req.query)
    res.status(200).json({myData, noData:myData.length});  ;
};
const getAllProductsTesting = async(req, res)=>{
    res.status(200).json({msg:'testing products'})
}
module.exports = {getAllProducts, getAllProductsTesting}


//pagination -> page , number , limit