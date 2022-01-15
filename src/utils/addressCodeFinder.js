import fs from "fs";
import provinceData from "../static/address/province.json";
import districtData from "../static/address/district.json";
import wardData from "../static/address/ward.json";

const provinceList = provinceData.province[0];

export const finder = {
   getProvinceName: (provinceCode) => {
      // let rawdata = fs.readFileSync("../static/address/province.json");
      // let student = JSON.parse(rawdata);
      // console.log(student);

      const provinceName = provinceList.find((element) => element.code === provinceCode);
      return provinceName ? provinceName : Error("Mising or wrong province code");
   },
   getDistrictName: (provinceCode, districtCode) => {
      const districtListByProvince = districtData.district[provinceCode];
      if (districtListByProvince) {
         const districtName = districtListByProvince.find(
            (element) => element.code === districtCode
         );
         return districtName ? districtName : Error("Mising or wrong district code");
      } else {
         throw Error("Mising or wrong province code");
      }
   },
   getWardName: (districtCode, wardCode) => {
      const wardListByDistrict = wardData.ward[districtCode];
      // return wardListByDistrict;
      if (wardListByDistrict) {
         const ward = wardListByDistrict.find((element) => element.code === wardCode);
         return ward ? ward : Error("Mising or wrong ward code");
      } else {
         throw Error("Mising or wrong district code");
      }
   },
};

export const isValidProvinceCode = (provinceCode) => {
   const province = provinceList.find((element) => element.code === provinceCode);

   return province ? true : false;
};
