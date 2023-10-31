import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BarterRequests.css'; // Import your CSS file

function BarterRequests() {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/getBarterRequests')
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
      <th>Barter Request</th>
      <th>Title</th>
      <th>Description</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    {formData?.map((form, index) => (
      <tr key={index}>
        <td>{form.barterRequest.value}</td>
        <td>{form.title.value}</td>
        <td>{form.description.value}</td>
        <td>{form.price.value}</td>
      </tr>
    ))}
  </tbody>
</table>



    </div>
  );
}

export default BarterRequests;
