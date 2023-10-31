import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Form.css';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

function Form() {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

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

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedData = formData.slice(0);
  if (sortBy) {
    sortedData.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    });
  }

  const filteredData = sortedData.filter((form) =>
    form.description.includes(searchTerm)
  );

  return (
    <div className="form-container">
      <h1>Form Data</h1>
      <div className="search">
        <Input
          type="text"
          placeholder="Search by Description"
          value={searchTerm}
          onChange={handleSearch}
          bg={useColorModeValue('gray.100', 'gray.700')}
        />
      </div>
      <Table className="form-table">
        <Thead>
          <Tr>
            <Th onClick={() => handleSort('form')}>
              Form
              {sortBy === 'form' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'form' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
            <Th onClick={() => handleSort('description')}>
              Description
              {sortBy === 'description' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'description' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
            <Th onClick={() => handleSort('image')}>
              Image
              {sortBy === 'image' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'image' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((form, index) => (
            <Tr key={index}>
              <Td>{form.form}</Td>
              <Td>{form.description}</Td>
              <Td>{form.image}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default Form;
