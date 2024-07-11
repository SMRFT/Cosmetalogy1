import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Report = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState('day'); // Default interval

  useEffect(() => {
    fetchData(selectedInterval);
  }, [selectedInterval]);

  const fetchData = async (interval) => {
    try {
      const response = await axios.get(`/api/summary/${interval}`); // Replace with your API endpoint
      setSummaryData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };

  return (
    <div>
    <center><Title>Summary Report</Title></center>
    <Container>
      <Content>
        <IntervalSelector>
          <label>Select Interval:</label>
          <select value={selectedInterval} onChange={handleIntervalChange}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </IntervalSelector>
        {summaryData ? (
          <Summary>
            <SummaryTitle>{selectedInterval.toUpperCase()} Summary</SummaryTitle>
            <SummaryList>
              {summaryData.map((item) => (
                <SummaryItem key={item.id}>
                  {item.date}: {item.value}
                </SummaryItem>
              ))}
            </SummaryList>
          </Summary>
        ) : (
          <Message>Loading...</Message>
        )}
      </Content>
    </Container>
    </div>
  );
};

export default Report;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  margin-top: -270px;
`;

const Content = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;
  
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const IntervalSelector = styled.div`
  margin-bottom: 20px;

  label {
    margin-right: 10px;
    font-weight: bold;
  }

  select {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ced4da;
  }
`;

const Summary = styled.div`
  margin-top: 20px;
`;

const SummaryTitle = styled.h3`
  margin-bottom: 10px;
`;

const SummaryList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SummaryItem = styled.li`
  padding: 10px;
  background-color: #f1f1f1;
  margin-bottom: 5px;
  border-radius: 4px;
`;

const Message = styled.p`
  color: #6c757d;
`;
