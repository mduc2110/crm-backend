import province from "../static/address/province.json";
import district from "../static/address/district.json";
import ward from "../static/address/ward.json";

export const address = {
   getProvince: (req, res) => {
      const { id } = req.params;
      return province.province[0];
   },
   getDistrict: (req, res) => {
      const { id } = req.params;
      return res.json(district.district[id]);
   },
   getWard: (req, res) => {
      const { id } = req.params;
      return res.json(ward.ward[id]);
   },
};
