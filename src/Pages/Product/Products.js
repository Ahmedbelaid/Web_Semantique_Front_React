import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
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
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'; // Import Chakra UI icons
import './Product.css'; // Import your CSS file

function Product() {
  const [productData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('http://localhost:8000/getDigitalProductsWithDetails')
      .then(response => {
        const formattedData = response.data.results.bindings.map(binding => ({
          product: binding.product.value,
          address: binding.address.value,
          category: binding.category.value,
          description: binding.description.value,
          image: binding.image.value,
          name: binding.name.value,
          price: parseFloat(binding.price.value),
          status: binding.status.value,
          units: parseInt(binding.units.value),
          weight: parseFloat(binding.weight.value),
        }));
        setProductData(formattedData);
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

  const sortedData = productData.slice(0);
  if (sortBy) {
    sortedData.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    });
  }

  const filteredData = sortedData.filter((product) =>
    product.description.includes(searchTerm)
  );

  return (
    <div className="product-container">
      <h1>Digital Products</h1>
      <div className="search">
        <Input
          type="text"
          placeholder="Search by Description"
          value={searchTerm}
          onChange={handleSearch}
          bg={useColorModeValue('gray.100', 'gray.700')}
        />
      </div>
      <Table className="product-table">
        <Thead>
          <Tr>
            <Th onClick={() => handleSort('product')}>
              Product
              {sortBy === 'product' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'product' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
            <Th onClick={() => handleSort('address')}>
              Address
              {sortBy === 'address' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'address' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
            <Th onClick={() => handleSort('category')}>
              Category
              {sortBy === 'category' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'category' && sortOrder === 'desc' && (
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
            <Th onClick={() => handleSort('name')}>
              Name
              {sortBy === 'name' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'name' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
            <Th onClick={() => handleSort('price')}>
              Price
              {sortBy === 'price' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'price' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
            <Th onClick={() => handleSort('status')}>
              Status
              {sortBy === 'status' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'status' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
            <Th onClick={() => handleSort('units')}>
              Units
              {sortBy === 'units' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'units' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
            <Th onClick={() => handleSort('weight')}>
              Weight
              {sortBy === 'weight' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'weight' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((product, index) => (
            <Tr key={index}>
              <Td>{product.product}</Td>
              <Td>{product.address}</Td>
              <Td>{product.category}</Td>
              <Td>{product.description}</Td>
              <Td>{product.name}</Td>
              <Td>{product.price}</Td>
              <Td>{product.status}</Td>
              <Td>{product.units}</Td>
              <Td>{product.weight}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default Product;
