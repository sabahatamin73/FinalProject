import { Form, Button } from "react-bootstrap";
import {useState} from 'react';

// states
const AddForm = ({handleCreate}) => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [address, setAddress] = useState('');
const [phone, setPhone] = useState('');
const [cities, setCities] = useState([]);
const [selectedCounty, setSelectedCountry] = useState("");
const [selectedCity, setSelectedCity] = useState("");

//storing countries
const countries = {
France: ["Paris", "Marseille", "Lille", "Lyon"],
Usa: ["New York", "San Francisco", "Austin", "Dallas"],
Brazil: ["Sao Paulo", "Rio de Janeiro", "Salvador"],
Pakistan: ["karachi", "Islamabad"]
};

// abstracting individual countries
const countryList = Object.keys(countries).map(key => ({
name: key
}));

// shows cities wrt countries
function handleCountrySelect(e) {
console.log("Selected country", e.target.value);
const countrySel = e.target.value;
const citiesSel = countrySel !== "" ? countries[countrySel] : "";
setSelectedCountry(countrySel);
setCities(citiesSel);
setSelectedCity("");
}

// selecting cities
function handleCitySelect(e) {
console.log("Selected city", e.target.value);
const citiesSel = e.target.value;
setSelectedCity(citiesSel);
}

// fetching data on submit
const handleSubmit = (e) => {
e.preventDefault();
fetch("http://localhost:5500/add",
{
mode: 'cors',
method: 'POST',
headers: { 'Content-Type':'application/json' },
body: JSON.stringify({ name, email, phone, address, selectedCounty, selectedCity}),
})
.then((response) => response.json())
.then(response => {
console.log(response);
handleCreate(response.user);
})
.catch(err => console.log(err));
}


return (
<Form onSubmit={handleSubmit}>
   <Form.Group>
      <Form.Control
      type="text"
      placeholder="Name *"
      name="name"
      onChange = { (e) => setName(e.target.value)}
      required
      />
   </Form.Group>
   <Form.Group>
      <Form.Control
      type="email"
      placeholder="Email *"
      name="email"
      onChange = { (e) => setEmail(e.target.value)}
      required
      />
   </Form.Group>
   <Form.Group>
      <Form.Control
      as="textarea"
      placeholder="Address"
      rows={3}
      name="address"
      onChange = { (e) => setAddress(e.target.value)}
      />
   </Form.Group>
   <Form.Group>
      <Form.Control
      type="text"
      placeholder="Phone"
      name="phone"
      onChange = { (e) => setPhone(e.target.value)}
      />
   </Form.Group>
   <Form.Group>
      <select
         name="Countries"
         onChange={e =>
         handleCountrySelect(e)}
         value={selectedCounty}
         >
         <option value="">Select the country</option>
         {countryList.map((country, key) => (
         <option key={key} value={country.name}>
            {country.name}
         </option>
         ))}
      </select>
      <select
         name="Cities"
         onChange={e =>
         handleCitySelect(e)}
         value={selectedCity}
         >
         <option value="">Select the city</option>
         {cities.map((city, key) => (
         <option key={key} value={city}>
            {city}
         </option>
         ))}
      </select>
   </Form.Group>
   {/* 
   <DropDown />
   */}
   <Button variant="success" type="submit" block>
   Add Carrier
   </Button>
</Form>
)
}
export default AddForm;