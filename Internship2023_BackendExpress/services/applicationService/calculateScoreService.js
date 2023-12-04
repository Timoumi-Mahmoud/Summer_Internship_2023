
const Offer=require('../../modeles/offer')

 exports.makeInitialDecision=async(studentScore, offerId)=>{
   requiredScore=await getOfferRequiredScore(offerId)
   if(requiredScore<studentScore){
      return 'Waiting-list'
   }
      return 'Rejected'
}

getOfferRequiredScore=async(offerId)=>{
   const requiredscoreOfAnOffer= await Offer.findById(offerId).select('score')
   return requiredscoreOfAnOffer.score
}

exports.calculateScore= async(bacGrade, firstYearGrade, secodYearGrade, thridYearGrade, englishLevel)=>{
    const englishLevelScore=englishLevelCalculator(englishLevel)
    return ((bacGrade*0.5)+((firstYearGrade+ secodYearGrade+thridYearGrade)*0.75)+englishLevelScore)
 }

function  englishLevelCalculator(englishLevel){
 switch(englishLevel) {
    case 'A1':
      return 0.25
      break;
    case 'A2':
       return 0.5
       break;
    case 'B1':
       return 0.75
       break;
     case 'B2':
       return 1
       break;     
       
    case 'C1':
       return 1.5
       break;    
     case 'C2':
       return 2
       break;      
    default:
       return 0
    
    
}
}

