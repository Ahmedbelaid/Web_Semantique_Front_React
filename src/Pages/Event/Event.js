import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Event.css'; // Import your CSS file

function Event() {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/eventsWithDetails')
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
      <th>Event</th>
      <th>EventName</th>
      <th>Date</th>
      <th>Description</th>
      <th>Image</th>
      <th>Location</th>
      <th>Status</th>
      <th>Ticket Price</th>
    </tr>
  </thead>
  <tbody>
    {formData?.map((form, index) => (
      <tr key={index}>
        <td>{form.event.value}</td>
        <td>{form.eventName.value}</td>
        <td>{form.eventDate.value}</td>
        <td>{form.eventDescription.value}</td>
        <td>{form.eventImage.value}</td>
        <td>{form.eventLocation.value}</td>
        <td>{form.eventStatus.value}</td>
        <td>{form.ticketPrice.value}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default Event;
