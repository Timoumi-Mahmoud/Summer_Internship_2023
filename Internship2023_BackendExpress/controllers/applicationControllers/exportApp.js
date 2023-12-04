
const exceljs = require("exceljs");
const applicationSchema=require('../../modeles/application')


const data =async()=>{
    return await applicationSchema.find().populate('user').execPopulate();
}

const exportExcel=  async(request, response) => {
    const data= await applicationSchema.find().populate('user')
console.log(data)
   

    const workbook = exportData(data);
    response.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "data.xlsx"
    );
  

    
    return workbook.xlsx.write(response).then(function () {
      response.status(200).end();
    });
 
  
}
 
const header = [
  {
    header: "applicationStatus",
    key: "applicationStatus",
    width: 20,
  },
  {
    header: "totalScore",
    key: "totalScore",
    width: 20,
  },
  {
    header: "currentClass",
    key: "currentClass",
    width: 20,
  },
  {
    header: "englishLevel",
    key: "family_name",
    width: 20,
  },
  {
    header: "applicationFile",
    key: "applicationFile",
    width: 20,
  },
  {
    header: "maildfdfdfdfAddress",
    key: "mailAddress",
    width: 20,
  },
  {
    header: "offer",
    key: "offer",
    width: 20,
  },
  {
    header: "user",
    key: "user[password]",
    width: 20,
  },
];



  const exportData = (data) => {
    let workbook = new exceljs.Workbook();
    let worksheet = workbook.addWorksheet("Worksheet");
  
    let columns = data.reduce((acc, obj) => acc = Object.getOwnPropertyNames(obj), [])  
    worksheet.columns = header;
    /*worksheet.columns = columns.map((el) => {
      return { header: el, key: el, width: 20 };
    });*/
  
    worksheet.addRows(data);
  
    return workbook;
  };



  module.exports=exportExcel