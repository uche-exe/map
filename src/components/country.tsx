import { CountryInterface } from '../App'

const Country = ({ name, capital }: CountryInterface) => {
  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
        <h3>{name.common}</h3>
        <h3>{capital}</h3>
    </div>
  )
}

export default Country