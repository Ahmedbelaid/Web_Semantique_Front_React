import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Venue.css'; // Import your CSS file

function Venue() {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/getVenuesWithDetails')
      .then(response => {
        console.log(response.data.results.bindings);

        const formattedData = response.data.results.bindings
        setFormData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

 /* const filteredData = formData.filter((form) =>
    form.description.includes(searchTerm)
  );*/

  return (
    <div className="form-container">
      <h1>Event Data</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search by Description"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="form-table">
  <thead>
    <tr>
      <th>Venue</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Address</th>
      <th>Capacity</th>
      <th>Description</th>
      <th>Image</th>
      <th>Website</th>
    </tr>
  </thead>
  <tbody>
    {formData?.map((form, index) => (
      <tr key={index}>
        <td>{form.venue.value}</td>
        <td>{form.name.value}</td>
        <td>{form.phone.value}</td>
        <td>{form.address.value}</td>
        <td>{form.capacity.value}</td>
        <td>{form.description.value}</td>
        <td>{form.image.value}</td>
        <td>{form.website.value}</td>
      </tr>
    ))}
  </tbody>
</table>


    </div>
  );
}

export default Venue;
