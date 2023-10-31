import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/NavBar';

function Form() {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // Make a fetch request to your API endpoint
    fetch('http://localhost:8000/getFormsWithDetails')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
         if (data.results && data.results.bindings) {
          // Access the values from the first item in bindings
          const form = data.results.bindings[0];
          const description = form.description.value;
          const image = form.image.value;
          const receiverName = form.receiverName ? form.receiverName.value : 'N/A';

          // Update the state with the data
          setFormData([{ description, image, receiverName }]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Nav />
      <div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Image</th>
              <th>Receiver Name</th>
            </tr>
          </thead>
          <tbody>
            {formData?.map((form, index) => (
              <tr key={index}>
                <td>{form.description}</td>
                <td>{form.image}</td>
                <td>{form.receiverName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default Form;
