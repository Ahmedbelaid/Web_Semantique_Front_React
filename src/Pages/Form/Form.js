import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Form.css'; // Import your CSS file

function Form() {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/getFormsWithDetails')
      .then(response => {
        const formattedData = response.data.results.bindings.map(binding => ({
          form: binding.form.value,
          description: binding.description.value,
          image: binding.image.value,
        }));
        setFormData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = formData.filter((form) =>
    form.description.includes(searchTerm)
  );

  return (
    <div className="form-container">
      <h1>Form Data</h1>
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
            <th>Form</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((form, index) => (
            <tr key={index}>
              <td>{form.form}</td>
              <td>{form.description}</td>
              <td>{form.image}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Form;
