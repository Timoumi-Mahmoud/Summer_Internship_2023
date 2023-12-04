export interface Offer {
  _id:string,
  title:string,
  universityName:string
  country:string
  completeAddress:string
  mailAddress:string
  universityOfficialWebsite:string
  description:string
  usefulLinks:string
  targetClasses:string
  targetDepartment:string
  numberOfplaces:number
  conditions: string
  score:number
  publishDate:Date
  deadlineDate:Date
  offer_img: String
  cloudinary_id: String
}

