const bookmarkedService= require('../../services/offerService/bookmarkOfferService')
const {BadRequestError}=require('../../errors')

const bookmarkAnOffer=  async (req, res)=>{
    const idOffer=req.params.idOffer 
    const idUser=req.params.idUser 
    try {
        await bookmarkedService.bookmardAnOffer(idOffer, idUser);
        res.status(201).json({msg:"offer bookmarked successfully ! "})
    } catch (error) {
        throw new BadRequestError('Something went wrong while trying to bookmark the offer with ID: '+ idOffer)
    }
}


const displayBookmarkedOffer= async(req,res)=>{
    const idUser=req.params.idUser
    try {
       const bookmardOffers= await bookmarkedService.getListOfOffers(idUser)
       console.log(JSON.stringify(bookmardOffers))
        res.status(200).json(bookmardOffers)

    } catch (error) {
        throw new BadRequestError('Somthing went wrong !! ')
    }
}

const unbookmarkOffer= async(req,res)=>{
    const idOffer= req.params.idOffer
    const idUser=req.params.idUser
	console.log('working here');
    try {
       await bookmarkedService.unbookmark(idOffer, idUser)
      res.status(202).json({msg:"offer unbookmarked successfully ! "})
    } catch (error) {
        throw new BadRequestError('Something went wrong while trying to unbookmark the offer with ID: '+ idOffer)
    }
}



module.exports={bookmarkAnOffer , displayBookmarkedOffer,unbookmarkOffer }
