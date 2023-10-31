import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Annonces.css';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

function Annonce() {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios
      .get('http://localhost:8000/annoncesWithDetails')
      .then((response) => {
        const formattedData = response.data.results.bindings.map((binding) => ({
          annonce: binding.annonce.value,
          description: binding.description.value,
          echange: binding.echange.value,
          photo: binding.photo.value,
          rubrique: binding.rubrique.value,
          titre: binding.titre.value,
          email: binding.email.value,
        }));
        setFormData(formattedData);
      })
      .catch((error) => {
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
  const handlePostRequest = () => {
    axios
      .get("http://localhost:8000/getAnnoncesWithDetailsOrdred")
      .then((response) => {
        // Handle the successful response here
        console.log("POST request successful:", response.data);
        const formattedData = response.data.results.bindings;
        setFormData(formattedData);

      })
      .catch((error) => {
        // Handle errors here
        console.error("POST request error:", error);
      });
  };
  const filteredData = sortedData.filter((annonce) =>
    annonce.description.includes(searchTerm)
  );

  return (
    <div className="annonce-container">
      <h1>Annonce Data</h1>
      <div>
        <button className="btn btn-primary" onClick={handlePostRequest}>
          Sort
        </button>
      </div>
      <div className="search">
        <Input
          type="text"
          placeholder="Search by Description"
          value={searchTerm}
          onChange={handleSearch}
          bg={useColorModeValue('gray.100', 'gray.700')}
        />
      </div>
      <Table className="annonce-table">
        <Thead>
          <Tr>
            <Th onClick={() => handleSort('annonce')}>
              Annonce
              {sortBy === 'annonce' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'annonce' && sortOrder === 'desc' && (
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
            <Th onClick={() => handleSort('echange')}>
              Echange
              {sortBy === 'echange' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'echange' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
            <Th onClick={() => handleSort('photo')}>
              Photo
              {sortBy === 'photo' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'photo' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
            <Th onClick={() => handleSort('rubrique')}>
              Rubrique
              {sortBy === 'rubrique' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'rubrique' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
            <Th onClick={() => handleSort('titre')}>
              Titre
              {sortBy === 'titre' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'titre' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
            <Th onClick={() => handleSort('email')}>
              Email
              {sortBy === 'email' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'email' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((annonce, index) => (
            <Tr key={index}>
              <Td>{annonce.annonce}</Td>
              <Td>{annonce.description}</Td>
              <Td>{annonce.echange}</Td>
              <Td>{annonce.photo}</Td>
              <Td>{annonce.rubrique}</Td>
              <Td>{annonce.titre}</Td>
              <Td>{annonce.email}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default Annonce;
