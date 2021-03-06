import fs from "fs";
import provinceData from "../static/address/province.json";
import districtData from "../static/address/district.json";
import wardData from "../static/address/ward.json";
import { removeVietnameseCharacter } from "./removeVietnameseCharacter";
const provinceList = provinceData.province[0];

const getDistrictListByProvinceCode = (provinceCode) => {
   return districtData.district[provinceCode];
};

const getWardListByDistrictCode = (districtCode) => {
   return wardData.ward[districtCode];
};
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

export const validateAddressCode = (provinceCode, districtCode, wardCode) => {
   let error = "";
   const districtList = getDistrictListByProvinceCode(provinceCode);
   const wardList = getWardListByDistrictCode(districtCode);

   const province = provinceList.find((element) => element.code === provinceCode);
   if (!province) {
      error += "Province code, ";
      return {
         isValid: false,
         msg: "Province code is invalid!",
      };
   }
   const district = districtList.find((element) => element.code === districtCode);
   if (!district) {
      error += "District code, ";
      return {
         isValid: false,
         msg: "District code is invalid!",
      };
   }
   const ward = wardList.find((element) => element.code === wardCode);
   if (!ward) {
      error += "Ward code ";
      return {
         isValid: false,
         msg: "Ward code is invalid!",
      };
   }
   return { isValid: true, msg: "Address codes is Valid!" };
};

export const getAddressData = (provinceCode, districtCode, wardCode, detailAddress) => {
   const province = provinceCode
      ? provinceList.find((element) => element.code === provinceCode)
      : {};

   const districtList = provinceCode ? getDistrictListByProvinceCode(provinceCode) : [];
   const district = districtCode
      ? districtList.find((element) => element.code === districtCode)
      : {};

   const wardList = districtCode ? getWardListByDistrictCode(districtCode) : [];
   const ward = wardCode ? wardList.find((element) => element.code === wardCode) : {};
   return {
      province: province ? province : "",
      district: district ? district : "",
      ward: ward ? ward : "",
      detailAddress: detailAddress ? detailAddress : "",
   };
};

export const getProvinceCode = (provinceName) => {
   if (!provinceName) {
      return "";
   }
   const formattedProvinceName = removeVietnameseCharacter(provinceName);
   const province = provinceList.find((element) =>
      removeVietnameseCharacter(element.name).includes(formattedProvinceName)
   );
   if (province) {
      return province.code;
   } else {
      return undefined;
   }
};

export const getDistrictCode = (districtName) => {
   if (!districtName) {
      return "";
   }
   const districtList = [].concat.apply([], Object.values(districtData.district));
   const formattedDistrictName = removeVietnameseCharacter(districtName);
   const district = districtList.find((element) =>
      removeVietnameseCharacter(element.name).includes(formattedDistrictName)
   );
   if (district) {
      return district.code;
   } else {
      return undefined;
   }
};

export const getWardCode = (wardName, districtCode) => {
   if (!districtCode) {
      return undefined;
   }
   const wardListByDistrict = wardData.ward[districtCode];
   if (!wardName) {
      return "";
   }
   const formattedWardName = removeVietnameseCharacter(wardName);
   const ward = wardListByDistrict.find((element) =>
      removeVietnameseCharacter(element.name).includes(formattedWardName)
   );
   if (ward) {
      return ward.code;
   } else {
      return undefined;
   }
};
