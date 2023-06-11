import React, { useEffect } from "react";
import { useState } from "react";
import { allCountries } from "./functions/allCountry";

function Countryapi({ setAddress }) {
  const [country, setCountry] = useState("");
  const [division, setDivison] = useState("");
  const [divisions, setDivisons] = useState([]);
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    setAddress({ country, division, district });
  }, [country, division, district]);

  const changecountry = (event) => {
    setCountry("");
    setDivison("");
    setDistrict("");
    setTimeout(() => setCountry(event.target.value), 100);
    setDivisons(
      allCountries.find((ctr) => ctr.name === event.target.value).divisions
    );
  };

  const changeDivison = (event) => {
    setDivison("");
    setDistrict("");
    setTimeout(() => setDivison(event.target.value), 100);
    setDistricts(
      divisions.find((divis) => divis.name === event.target.value).districts
    );
  };

  const changeDistrict = (event) => {
    setDistrict("");
    setDistrict(event.target.value);
  };
  return (
    <div className="w-full">
      <div className="flex gap-10 w-full items-center">
        <p>Country: </p>
        <select onChange={changecountry} className="select select-info flex-1 text-blue-900">
          <option selected disabled>
            Country
          </option>
          {allCountries?.map((ctr) => (
            <option value={ctr.name}>{ctr.name}</option>
          ))}
        </select>
      </div>
      <br />

        {country && (
      <div className="flex gap-10 w-full items-center">
        <p>Division: </p>
          <select
            onChange={changeDivison}
            className="select select-info flex-1 text-blue-900"
          >
            <option selected disabled>
              Division
            </option>
            {divisions.map((divis) => (
              <option value={divis.name}>{divis.name}</option>
            ))}
          </select>
      </div>
        )}

      <br />

        {(country && division) && (
      <div className="flex gap-10 w-full items-center">
        <p>District: </p>
           <select
           onChange={changeDistrict}
           className="select select-info flex-1 text-blue-900"
         >
           <option selected disabled>
             District
           </option>
           {districts.map((distr) => (
             <option value={distr.name}>{distr.name}</option>
           ))}
         </select>
      </div>
        )}
   
    </div>
  );
}
export default Countryapi;
