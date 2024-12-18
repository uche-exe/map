// Create a simple React application that displays a list of countries and their capitals
// The application should have the following features:

import axios from "axios";
import { useEffect, useState } from "react";
import Country from "./components/country";

// The list of countries and capitals should be fetched from an API
// Each country should be displayed in a separate component
// The user should be able to filter the list by capital

/**
  To fetch all countries use the '/all' endpoint
 */

const BASE_URL = "https://restcountries.com/v3.1";
/**
  To filter by capital city, use the '/capital/{capital}' endpoint
 */

const FILTERABLE_CAPITALS = [
  "Tallinn",
  "Helsinki",
  "Stockholm",
  "Oslo",
  "Copenhagen",
  "Reykjavik",
] as const;
type Capital = (typeof FILTERABLE_CAPITALS)[number];

export interface CountryInterface {
  name: {
    common: string;
  };
  capital: string;
}

const data = [
  {
    name: {
      common: "South Georgia",
      official: "South Georgia and the South Sandwich Islands",
      nativeName: {
        eng: {
          official: "South Georgia and the South Sandwich Islands",
          common: "South Georgia",
        },
      },
    },
    capital: "somewhere",
  },
  {
    name: {
      common: "Sweden",
      official: "South Georgia and the South Sandwich Islands",
      nativeName: {
        eng: {
          official: "South Georgia and the South Sandwich Islands",
          common: "South Georgia",
        },
      },
    },
    capital: "Stockholm",
  },
  {
    name: {
      common: "Norway",
      official: "South Georgia and the South Sandwich Islands",
      nativeName: {
        eng: {
          official: "South Georgia and the South Sandwich Islands",
          common: "South Georgia",
        },
      },
    },
    capital: "Oslo",
  },
];

export default function App() {
  const [countries, setCountries] = useState<CountryInterface[]>([]);

  const getCountries = async () => {
    try {
      const res = (await axios.get(`${BASE_URL}/all`)).data;
      console.log("COUNTRIES: ", res);
      setCountries(res);
    } catch (err) {
      console.error(err);
      setCountries(data);
    }
  };

  const filterCountries = async (capital: Capital) => {
    try {
      const res = (await axios.get(`${BASE_URL}/capital/${capital}`)).data;
      console.log("COUNTRIES: ", res);
      setCountries(res);
    } catch (err) {
      console.error(err);
      const filtered = data.filter((item) => item.capital.includes(capital));
      setCountries(filtered);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="App">
      <h1>React Interview</h1>
      <div style={{ display: "grid", padding: "2rem" }}>
        <label htmlFor="capitals">Choose a capital:</label>

        <select 
          name="capitals" 
          id="capitals"
          onChange={(e) => filterCountries(e.target.value as Capital)}
          >
          <option value="">---Choose a capital---</option>
          {FILTERABLE_CAPITALS.map((capital) => (
            <option key={capital} value={capital}>
              {capital}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "grid", padding: "2rem" }}>
        {countries.map((c) => (
          <Country name={c.name} capital={c.capital} />
        ))}
      </div>
    </div>
  );
}
