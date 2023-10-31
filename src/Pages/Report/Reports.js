import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Report.css';
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

function Reports() {
  const [reportsData, setReportsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('http://localhost:8000/getReportsWithDetails')
      .then(response => {
        const formattedData = response.data.results.bindings.map(binding => ({
          report: binding.report.value,
          cause: binding.cause.value,
          senderName: binding.senderName.value,
        }));
        setReportsData(formattedData);
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

  const sortedData = reportsData.slice(0);
  if (sortBy) {
    sortedData.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    });
  }

  const filteredData = sortedData.filter((report) =>
    report.cause.includes(searchTerm) || report.senderName.includes(searchTerm)
  );

  return (
    <div className="reports-container">
      <h1>Reports Data</h1>
      <div className="search">
        <Input
          type="text"
          placeholder="Search by Cause or Sender Name"
          value={searchTerm}
          onChange={handleSearch}
          bg={useColorModeValue('gray.100', 'gray.700')}
        />
      </div>
      <Table className="reports-table">
        <Thead>
          <Tr>
            <Th onClick={() => handleSort('report')}>
              Report
              {sortBy === 'report' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'report' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
            <Th onClick={() => handleSort('cause')}>
              Cause
              {sortBy === 'cause' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'cause' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
            <Th onClick={() => handleSort('senderName')}>
              Sender Name
              {sortBy === 'senderName' && sortOrder === 'asc' && (
                <TriangleDownIcon />
              )}
              {sortBy === 'senderName' && sortOrder === 'desc' && (
                <TriangleUpIcon />
              )}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((report, index) => (
            <Tr key={index}>
              <Td>{report.report}</Td>
              <Td>{report.cause}</Td>
              <Td>{report.senderName}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default Reports;
