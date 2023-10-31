import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Forum.css'; // Import your CSS file

function Forum() {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/getForumsWithDetails')
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
      <h1>Forum Data</h1>
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
      <th>Forum</th>
      <th>Likes</th>
      <th>Post</th>
    </tr>
  </thead>
  <tbody>
    {formData?.map((form, index) => (
      <tr key={index}>
        <td>{form.forum.value}</td>
        <td>{form.likes.value}</td>
        <td>{form.post.value}</td>
      </tr>
    ))}
  </tbody>
</table>



    </div>
  );
}

export default Forum;
