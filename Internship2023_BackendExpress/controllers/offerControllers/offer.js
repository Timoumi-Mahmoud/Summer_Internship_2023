const offerService= require('../../services/offerService/offerService')
const cloudinary=require('../../utils/cloudinaryConfig')
const Offer = require("../../modeles/offer");

const offerList = async (req,res)=>{
  try {
    const offer = await offerService.getAllOffers();
    // console.log(req.headers)
    res.json({ offers: offer,nbHits: offer.length , status: "success" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteOffer = async (req, res) => {
  const offerId=req.params.id
  //console.log('herese')
  try {
    const offer = await offerService.deleteOffer(offerId);
   
    if (!offer){ res.status(404).send( {msg: `No Offer found with id :${offerId} `})}
    else{
      res.status(200).json(offer);
    }
    } catch (err) {
      console.log(err)
     // res.status(500).json({ error: err.message });
    }
};


 const getOffer = async (req, res) => {
  const offerId=req.params.id
  try {
    const offer = await offerService.getOfferById(offerId);
    if(!offer) res.status(404).send( {msg: `No Offer found with id :${offerId} `})
    res.status(200).json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOffer = async (req, res) => {
  console.log(req.params)
  try {
    const offer = await offerService.updateOffer(req.params.id, req.body);
    if(!offer) res.status(404).send( {msg: `No offer found  `})
    
    res.json({ data: req.body, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const createNewOffer=  async (req, res)=>{
    try {
      if(req.file){
        var result = await cloudinary.uploader.upload(req.file.path);
           var profileImageUrl=result.secure_url
           var cloudinary_public_id=result.public_id
       }else {
        const result=null
        var profileImageUrl=''
        var cloudinary_public_id=''
       }
      
     
       let newOffer = new Offer({
        title:req.body.title,
        description:req.body.description,
        usefulLinks: req.body.usefulLinks,
        conditions: req.body.conditions,
        score:req.body.score,
        publishDate:req.body.publishDate,
        deadlineDate: req.body.deadlineDate,
        country:req.body.country,
        completeAddress:req.body.completeAddress,
        universityName:req.body.universityName,
        targetClasses: req.body.targetClasses,
        targetDepartment:req.body.targetDepartment,
        numberOfplaces:req.body.numberOfplaces,
        mailAddress:req.body.mailAddress,
        universityOfficialWebsite: req.body.universityOfficialWebsite,

        offer_img: profileImageUrl,
        cloudinary_id: cloudinary_public_id,
      });
      await newOffer.save();
       res.status(201).json(newOffer)
    } catch (error) {
      console.log(error)
         
    } }


   const searchOffer =async (req,res)=>{
     const country=req.query.country
     const univeristyName=req.query.univeristyName
     const targetClasses=req.query.targetClasses
     try {

      const offers= await offerService.searchOffer(univeristyName,targetClasses,country  )
      res.status(200).json({offers})
     } catch (error) {
      console.log(error)
     }
   }
    

  

module.exports={offerList,deleteOffer , updateOffer,getOffer, createNewOffer, searchOffer}
