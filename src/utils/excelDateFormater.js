export const excelDateFormater = (date) => {
   const utc_value = Math.floor(date - 25569) * 86400;
   const date_info = new Date(utc_value * 1000);
   const month = parseInt(date_info.getMonth()) + 1;
   const newDate = date_info.getFullYear() + "-" + month + "-" + date_info.getDate();
   return newDate;
};
