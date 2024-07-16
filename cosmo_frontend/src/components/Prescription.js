import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Row, Form, Tab, Nav } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { diagnosisList, patientComplaints, findingsList, prescription, test } from './constants';
import male from './images/male.png';
import female from './images/female.png';
import { BsPatchPlusFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e8f5e9; /* Light green background */
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
`;
export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.bodyBackgroundColor};
  min-height: 100vh;
`;
export const SectionTitle = styled.h4`
  margin-top: 20px;
  text-align: center;
`;

export const PatientDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff; // White background
  padding: 20px;
  width: 300px;
  height: auto;
  margin: 0;
  position: absolute;
  top: 3;
  left: 0;
  bottom: 3;
  margin-bottom: 100px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

export const PatientName = styled.h5`
  margin: 0;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
`;

export const PatientText = styled.p`
  margin: 0;
  color: gray;
  text-align: left;
  width: 100%;
`;

export const RightContent = styled.div`
  margin-left: 320px;
  padding: 20px;
  overflow-y: auto;
  height: 100vh;
`;

export const CenteredFormGroup = styled(Form.Group)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const SummaryContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f0f0f0; // Light gray background
  border-radius: 10px;
  width: 50%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
`;

const SummaryDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff; // White background
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const SummaryTitle = styled.h3`
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
  color: #333; // Dark gray color
`;

const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f0f0f0; // Light gray background for headers
  }

  tr:nth-child(even) {
    background-color: #fafafa; // Light gray for alternating rows
  }
`;

const SummaryItemTitle = styled.h4`
  margin-top: 20px;
  margin-bottom: 10px;
  color: #666; // Dark gray color
`;

const PatientDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  line-height: 1.6;
`;

const PatientDetailsColumn = styled.div`
  flex: 1;
  &:first-child {
    margin-right: 20px;
  }
`;

const Divider = styled.hr`
  width: 100%;
  margin: 10px 0;
  border: 1px solid #ddd;
`;

export const ContainerRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const NextVisitonContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f0f0f0; // Light gray background
  border-radius: 10px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
`;

const DateDisplay = styled.div`
  font-size: 16px;
  color: #333;
`;

const CalendarIcon = styled(FaCalendarAlt)`
  font-size: 24px;
  cursor: pointer;
  color: #007bff;
`;

const ImageContainer = styled.div`
  flex: 1;
  margin-right: 10px;
  padding: 20px;
  // background-color: #f0f0f0; // Light gray background
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const UploadedImage = styled.img`
  width: 80px;
  height: 80px;
  margin: 5px;
  object-fit: cover;
`;
const SectionTitle2 = styled.h4`
  margin-top: 20px;
  margin-bottom: 10px;
  color: #666; // Dark gray color
`;

const UploadIcon = styled.i`
  font-size: 3rem;
  color: #757575; // Gray color
`;

const UploadText = styled.p`
  font-size: 1rem;
  color: #757575; // Gray color
`;

export const DiagnosisContainer = styled.div`
  flex: 1;
  margin-right: 10px;
  padding: 20px;
  background-color: #f0f0f0; // Light gray background
  border-radius: 10px;
`;

export const ComplaintsContainer = styled.div`
  flex: 1;
  margin-right: 10px;
  padding: 20px;
  background-color: #f0f0f0; // Light gray background
  border-radius: 10px;
`;

export const FindingsContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0; // Light gray background
  border-radius: 10px;
`;

export const PrescriptionContainer = styled.div`
  margin-top: 50px;
  padding: 20px;
  background-color: #dcdcdc; // Darker gray background
  border-radius: 10px;
  width: 100%;
  height: 30%;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const PlanContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f0f0f0; // Light gray background
  border-radius: 10px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
`;

export const ProcedureContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f0f0f0; // Light gray background
  border-radius: 10px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
`;

export const TestContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f0f0f0; // Light gray background
  border-radius: 10px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
`;


const PrescriptionDetails = () => {
  const location = useLocation();
  const { appointment } = location.state || {};
  const [diagnosisInputs, setDiagnosisInputs] = useState([{}]);
  const [complaintsInputs, setComplaintsInputs] = useState([{}]);
  const [findingsInputs, setFindingsInputs] = useState([{}]);
  const [prescriptionInputs, setPrescriptionInputs] = useState([
    { selectedPrescription: [], dosage: '', durationNumber: '', duration: '', m: false, a: false, e: false, n: false }
  ]);
  
  
  const [procedureRows, setProcedureRows] = useState([
    { id: 1, value: '' }
  ]);

  const [planDetails, setPlanDetails] = useState({
    plan1: '',
    plan2: '',
    plan3: ''
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  
  const [selectedTests, setSelectedTests] = useState([]);
  // const [medicineOptions, setMedicineOptions] = useState([]); // State to hold medicine_name options
  const [selectedPrescription, setSelectedPrescription] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [gst, setGst] = useState('');
  const [total, setTotal] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
      // Function to handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const uploaded = files.map((file) => ({
      src: URL.createObjectURL(file),
      alt: file.name,
    }));
    setUploadedImages([...uploadedImages, ...uploaded]);
  };

    const handleGenerateClick = () => {
      // Handle generation logic here, if needed
      console.log('Generate button clicked');
    };

    useEffect(() => {
      // Fetch medicine_name options from API
      axios.get('http://127.0.0.1:8000/pharmacy/data/')
        .then(response => {
          const medicineNames = response.data.map(medicine => ({
            label: medicine.medicine_name
          }));
          setMedicineOptions(medicineNames);
        })
        .catch(error => {
          console.error('Error fetching medicine names:', error);
        });
    }, []); // Empty dependency array ensures this effect runs once on component mount
  
  const handleAddRow = () => {
    const newRow = { id: procedureRows.length + 1, value: '' };
    setProcedureRows([...procedureRows, newRow]);
  };

  const handleInputChange = (id, newValue) => {
    const updatedRows = procedureRows.map(row =>
      row.id === id ? { ...row, value: newValue } : row
    );
    setProcedureRows(updatedRows);
  };

  const handlePlanChange = (event) => {
    const { id, value } = event.target;
    setPlanDetails(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleTestsChange = (selected) => {
    setSelectedTests(selected);
  };

  const handleAddInput = (setInputs) => {
    setInputs((prev) => [...prev, {}]);
  };

  const handleDeleteInput = (index, setInputs, inputs) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

 
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [billInputs, setBillInputs] = useState([
    { qty: '', price: '', gst: '', total: '' }
  ]);

  const handlePrescriptionChange = (index, key, value) => {
    const newInputs = [...prescriptionInputs];
    newInputs[index][key] = value;
    setPrescriptionInputs(newInputs);
  
    // Ensure billInputs array has the same length as prescriptionInputs
    if (billInputs.length < prescriptionInputs.length) {
      setBillInputs([...billInputs, { qty: '', price: '', gst: '', total: '' }]);
    }
  };

  const handlePrescriptionAddInput = () => {
    setPrescriptionInputs([...prescriptionInputs, { selectedPrescription: [], dosage: '', durationNumber: '', duration: '', m: false, a: false, e: false, n: false }]);
  };
  
  const handlePrescriptionDeleteInput = (index) => {
    const newInputs = prescriptionInputs.filter((_, i) => i !== index);
    setPrescriptionInputs(newInputs);
  };
  

  const handleQtyOrPriceChange = (index, key, value) => {
    const newBillInputs = [...billInputs];
    newBillInputs[index] = { ...newBillInputs[index], [key]: value };

    // Calculate the total based on qty and price
    const qty = parseFloat(newBillInputs[index].qty) || 0;
    const price = parseFloat(newBillInputs[index].price) || 0;
    newBillInputs[index].total = (qty * price).toFixed(2); // Fix to 2 decimal places

    setBillInputs(newBillInputs);
  };
  
  const handleSubmit = async () => {
    const summaryData = {
        patient_name: appointment.patientName,  // Include patient name here
        diagnosis: diagnosisInputs.map(input => input.selectedDiagnosis?.map(d => d.label).join(', ') || 'None').join('\n'),
        complaints: complaintsInputs.map(input => input.selectedComplaints?.map(c => c.label).join(', ') || 'None').join('\n'),
        findings: findingsInputs.map(input => input.selectedFindings?.map(f => f.label).join(', ') || 'None').join('\n'),
        prescription: prescriptionInputs.map(input => {
            const times = ['M', 'A', 'E', 'N'].map(time => input[time.toLowerCase()] ? time : '').filter(Boolean).join(' ');
            return `${input.selectedPrescription?.map(p => p.label).join(', ') || 'None'} - Dosage: ${input.dosage || 'N/A'} - ${times} - Duration: ${input.durationNumber || 'N/A'} ${input.duration || ''}`;
        }).join('\n'),
        plans: `Plan1: ${planDetails.plan1 || 'None'}\nPlan2: ${planDetails.plan2 || 'None'}\nPlan3: ${planDetails.plan3 || 'None'}`,
        tests: selectedTests.map(test => test.label).join(', ') || 'None',
        procedures: procedureRows.map(row => row.value).join('\n') || 'None',
    };

    try {
        const response = await axios.post('http://127.0.0.1:8000/summary/post/', summaryData);
        console.log('Data saved successfully', response.data);
    } catch (error) {
        console.error('Error saving data', error);
    }
};

const getSummaryDetails = () => {
  const diagnosis = diagnosisInputs.map((input, index) =>
    `${index + 1}. ${input.selectedDiagnosis?.map(d => d.label).join(', ') || 'None'}`
  ).join('\n') || 'None';

  const complaints = complaintsInputs.map((input, index) =>
    `${index + 1}. ${input.selectedComplaints?.map(c => c.label).join(', ') || 'None'}`
  ).join('\n') || 'None';

  const findings = findingsInputs.map((input, index) =>
    `${index + 1}. ${input.selectedFindings?.map(f => f.label).join(', ') || 'None'}`
  ).join('\n') || 'None';

  const prescriptionSummary = prescriptionInputs.map((input, index) => {
    const times = ['M', 'A', 'E', 'N'].map(time => input[time.toLowerCase()] ? time : '').filter(Boolean).join(' ');
    return {
      index: index + 1,
      name: input.selectedPrescription?.map(p => p.label).join(', ') || 'None',
      dosage: input.dosage || 'N/A',
      times,
      duration: `${input.durationNumber || 'N/A'} ${input.duration || ''}`
    };
  });

  const plans = [
    `Plan1: ${planDetails.plan1 || 'None'}`,
    `Plan2: ${planDetails.plan2 || 'None'}`,
    `Plan3: ${planDetails.plan3 || 'None'}`
  ].join('\n');

  const procedures = procedureRows.map((row, index) =>
    `${index + 1}. ${row.value}`
  ).join('\n') || 'None';

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <SummaryDetailsContainer>
      <SummaryTitle>Summary</SummaryTitle>

      <PatientDetailsRow>
        <PatientDetailsColumn>
          <div><strong>NAME:</strong> {appointment.patientName}</div>
          {/* <div><strong>AGE:</strong> {appointment.dateOfBirth}</div> */}
          <div><strong>SEX:</strong> {appointment.gender}</div>
        </PatientDetailsColumn>
        <PatientDetailsColumn>
          <div><strong>MOBILE:</strong> {appointment.mobileNumber}</div>
          <div><strong>DATE:</strong> {currentDate}</div>
          {/* <div><strong>TIME:</strong> {patientDetails.time}</div> */}
        </PatientDetailsColumn>
      </PatientDetailsRow>

      <Divider />

      <SummaryItemTitle>Diagnosis</SummaryItemTitle>
      <SummaryTable>
        <tbody>
          {diagnosisInputs.map((input, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>{input.selectedDiagnosis?.map(d => d.label).join(', ') || 'None'}</td>
            </tr>
          ))}
        </tbody>
      </SummaryTable>
      <Divider />
      <SummaryItemTitle>Images</SummaryItemTitle>
      <ImageContainer>
      {uploadedImages.map((image, index) => (
        <Row key={index}>
          <Col>
            <UploadedImage src={image.src} alt={image.alt} />
          </Col>
        </Row>
      ))}
      {uploadedImages.length === 0 && (
        <UploadText></UploadText>
      )}
    </ImageContainer>
    <Divider />
      <SummaryItemTitle>Complaints</SummaryItemTitle>
      <SummaryTable>
        <tbody>
          {complaintsInputs.map((input, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>{input.selectedComplaints?.map(c => c.label).join(', ') || 'None'}</td>
            </tr>
          ))}
        </tbody>
      </SummaryTable>
      <Divider />
      <SummaryItemTitle>Findings</SummaryItemTitle>
      <SummaryTable>
        <tbody>
          {findingsInputs.map((input, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>{input.selectedFindings?.map(f => f.label).join(', ') || 'None'}</td>
            </tr>
          ))}
        </tbody>
      </SummaryTable>
      <Divider />
      <SummaryItemTitle>Prescription</SummaryItemTitle>
      <SummaryTable>
        <thead>
          <tr>
            <th>Index</th>
            <th>Medicine Name</th>
            <th>Dosage</th>
            <th>Times</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {prescriptionSummary.map((input, index) => (
            <tr key={index}>
              <td>{input.index}</td>
              <td>{input.name}</td>
              <td>{input.dosage}</td>
              <td>{input.times}</td>
              <td>{input.duration}</td>
            </tr>
          ))}
        </tbody>
      </SummaryTable>
      <Divider />
      <SummaryItemTitle>Plans</SummaryItemTitle>
      <SummaryTable>
        <tbody>
          {['Plan1', 'Plan2', 'Plan3'].map((plan, index) => (
            <tr key={index}>
              <td>{plan}</td>
              <td>{planDetails[plan.toLowerCase()] || 'None'}</td>
            </tr>
          ))}
        </tbody>
      </SummaryTable>
      <Divider />
      <SummaryItemTitle>Tests</SummaryItemTitle>
      <SummaryTable>
        <tbody>
          {selectedTests.map((test, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>{test.label}</td>
            </tr>
          ))}
        </tbody>
      </SummaryTable>
      <Divider />
      <SummaryItemTitle>Procedures</SummaryItemTitle>
      <SummaryTable>
        <tbody>
          {procedureRows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </SummaryTable>
    </SummaryDetailsContainer>
  );
};
  
  
  if (!appointment) {
    return <div>No appointment data available.</div>;
  }

  const transformList = list => list.map(item => ({ label: item }));

 return (
    <div>

      <br />
      <RightContent>

      <Tab.Container defaultActiveKey="consulting-room">
        <Nav variant="pills" style={{ justifyContent: 'center' }}>
          <Nav.Item>
            <Nav.Link eventKey="consulting-room">Consulting Room</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="instructions">Instructions</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="summary">Summary</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="consulting-room">
            <br />
            <Col>
            <PatientDetailsContainer>
      <ProfileImage src={appointment.gender === 'Male' ? male : female} alt="Profile" />
      <PatientName className='mt-1'>Name: {appointment.patientName}</PatientName>
      <PatientText className='mt-1'>Phone: {appointment.mobileNumber}</PatientText>
      <PatientText className='mt-1'>Height: {appointment.height}</PatientText>
      <PatientText className='mt-1'>Weight: {appointment.weight}</PatientText>
      <PatientText className='mt-1'>Pulse Rate: {appointment.pulseRate}</PatientText>
      <PatientText className='mt-1'>BP: {appointment.bp}</PatientText>
      <PatientText className='mt-1'>Purpose Of Visit: {appointment.purposeOfVisit}</PatientText>
    </PatientDetailsContainer>
      <ContainerRow>
        <DiagnosisContainer>
          {diagnosisInputs.map((input, index) => (
            <Row className="justify-content-center mb-3" key={index}>
              <CenteredFormGroup as={Col} md="4" controlId={`diagnosis-${index}`}>
                <Form.Label>Diagnosis</Form.Label>
                <FlexContainer>
                  <BsPatchPlusFill size={24} onClick={() => handleAddInput(setDiagnosisInputs)} />
                  <Typeahead
                    className='ms-2'
                    id={`diagnosis-typeahead-${index}`}
                    labelKey="label"
                    onChange={selected => {
                      const newInputs = [...diagnosisInputs];
                      newInputs[index] = { selectedDiagnosis: selected };
                      setDiagnosisInputs(newInputs);
                    }}
                    options={transformList(diagnosisList)}
                    placeholder="Select Diagnosis"
                    selected={Array.isArray(input.selectedDiagnosis) ? input.selectedDiagnosis : []}
                  />
                  <MdDelete size={24} onClick={() => handleDeleteInput(index, setDiagnosisInputs, diagnosisInputs)} />
                </FlexContainer>
              </CenteredFormGroup>
            </Row>
          ))}
        </DiagnosisContainer>
        <ImageContainer>
        {/* <SectionTitle2>Images</SectionTitle2> */}
      <label htmlFor="upload-button" style={{ cursor: 'pointer' }}>
        <BsPatchPlusFill style={{ fontSize: '5rem', color: '#757575' }} />
      </label>
      
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <label htmlFor="upload-button" style={{ cursor: 'pointer' }}>
        </label>
        <input
          id="upload-button"
          type="file"
          multiple
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </Form.Group>
      
      {uploadedImages.map((image, index) => (
        <Row key={index}>
          <Col>
            <UploadedImage src={image.src} alt={image.alt} />
          </Col>
        </Row>
      ))}
      {uploadedImages.length === 0 && (
        <UploadText></UploadText>
      )}
    </ImageContainer>
      </ContainerRow>
    </Col>
    <ContainerRow>
    <ComplaintsContainer>
          {complaintsInputs.map((input, index) => (
            <Row className="justify-content-center mb-3" key={index}>
              <CenteredFormGroup as={Col} md="4" controlId={`complaints-${index}`}>
                <Form.Label>Complaints</Form.Label>
                <FlexContainer>
                  <BsPatchPlusFill size={24} onClick={() => handleAddInput(setComplaintsInputs)} />
                  <Typeahead
                    className='ms-2'
                    id={`complaints-typeahead-${index}`}
                    labelKey="label"
                    onChange={selected => {
                      const newInputs = [...complaintsInputs];
                      newInputs[index] = { selectedComplaints: selected };
                      setComplaintsInputs(newInputs);
                    }}
                    options={transformList(patientComplaints)}
                    placeholder="Select Complaints"
                    selected={Array.isArray(input.selectedComplaints) ? input.selectedComplaints : []}
                  />
                  <MdDelete size={24} onClick={() => handleDeleteInput(index, setComplaintsInputs, complaintsInputs)} />
                </FlexContainer>
              </CenteredFormGroup>
            </Row>
          ))}
        </ComplaintsContainer>

        <FindingsContainer>
          {findingsInputs.map((input, index) => (
            <Row className="justify-content-center mb-3" key={index}>
              <CenteredFormGroup as={Col} md="4" controlId={`findings-${index}`}>
                <Form.Label>Findings</Form.Label>
                <FlexContainer>
                  <BsPatchPlusFill size={24} onClick={() => handleAddInput(setFindingsInputs)} />
                  <Typeahead
                    className='ms-2'
                    id={`findings-typeahead-${index}`}
                    labelKey="label"
                    onChange={selected => {
                      const newInputs = [...findingsInputs];
                      newInputs[index] = { selectedFindings: selected };
                      setFindingsInputs(newInputs);
                    }}
                    options={transformList(findingsList)}
                    placeholder="Select Findings"
                    selected={Array.isArray(input.selectedFindings) ? input.selectedFindings : []}
                  />
                  <MdDelete size={24} onClick={() => handleDeleteInput(index, setFindingsInputs, findingsInputs)} />
                </FlexContainer>
              </CenteredFormGroup>
            </Row>
          ))}
        </FindingsContainer>
        </ContainerRow>
            <br />
            <center>
            <PrescriptionContainer>
                <SectionTitle>Prescription</SectionTitle>
                {prescriptionInputs.map((input, index) => (
                  <Form.Group as={Row} className="mb-3" controlId={`prescription-${index}`} key={index}>
                    <Col sm="3">
                      <Typeahead
                        labelKey="label"
                        multiple
                        options={transformList(prescription)}
                        placeholder="Choose prescription..."
                        onChange={(selected) => handlePrescriptionChange(index, 'selectedPrescription', selected)}
                        selected={input.selectedPrescription || []}
                      />
                    </Col>
                    <Col sm="1">
                      <Form.Control
                        type="text"
                        placeholder="Dosage"
                        value={input.dosage || ''}
                        onChange={(e) => handlePrescriptionChange(index, 'dosage', e.target.value)}
                      />
                    </Col>
                    {prescriptionInputs.map((input, index) => (
                      <Col sm="4" key={index}>
                        <Form.Check
                          inline
                          label="M"
                          type="checkbox"
                          checked={input.m}
                          onChange={(e) => handlePrescriptionChange(index, 'm', e.target.checked)}
                        />
                        <Form.Check
                          inline
                          label="A"
                          type="checkbox"
                          checked={input.a}
                          onChange={(e) => handlePrescriptionChange(index, 'a', e.target.checked)}
                        />
                        <Form.Check
                          inline
                          label="E"
                          type="checkbox"
                          checked={input.e}
                          onChange={(e) => handlePrescriptionChange(index, 'e', e.target.checked)}
                        />
                        <Form.Check
                          inline
                          label="N"
                          type="checkbox"
                          checked={input.n}
                          onChange={(e) => handlePrescriptionChange(index, 'n', e.target.checked)}
                        />
                      </Col>
                    ))}

                    <Col sm="1">
                      <Form.Control
                        type="text"
                        placeholder="Number"
                        value={input.durationNumber || ''}
                        onChange={(e) => handlePrescriptionChange(index, 'durationNumber', e.target.value)}
                      />
                    </Col>
                    <Col sm="1">
                      <Form.Control
                        as="select"
                        value={input.duration || ''}
                        onChange={(e) => handlePrescriptionChange(index, 'duration', e.target.value)}
                      >
                        <option value="">Duration</option>
                        <option value="Days">Days</option>
                        <option value="Weeks">Weeks</option>
                        <option value="Months">Months</option>
                        <option value="Years">Years</option>
                        <option value="To Be Continued">To Be Continued</option>
                      </Form.Control>
                    </Col>
                    <Col sm="2" className="d-flex align-items-center">
                      <BsPatchPlusFill onClick={() => handleAddInput(setPrescriptionInputs)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                      <MdDelete onClick={() => handleDeleteInput(index, setPrescriptionInputs, prescriptionInputs)} style={{ cursor: 'pointer' }} />
                    </Col>
                  </Form.Group>
                ))}
              </PrescriptionContainer>
            </center>
            <br />
          </Tab.Pane>

          <Tab.Pane eventKey="instructions">
            <br />
            <PlanContainer>
              <Row className="justify-content-center">
                <Col md="3" className="text-center">
                  <Form.Group controlId="plan1">
                    <Form.Label>Plan1</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Plan1 details"
                      value={planDetails.plan1}
                      onChange={handlePlanChange}
                    />
                  </Form.Group>
                </Col>
                <Col md="3" className="text-center">
                  <Form.Group controlId="plan2">
                    <Form.Label>Plan2</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Plan2 details"
                      value={planDetails.plan2}
                      onChange={handlePlanChange}
                    />
                  </Form.Group>
                </Col>
                <Col md="3" className="text-center">
                  <Form.Group controlId="plan3">
                    <Form.Label>Plan3</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Plan3 details"
                      value={planDetails.plan3}
                      onChange={handlePlanChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </PlanContainer>
            <SectionTitle>Tests</SectionTitle>
            <center>
              <TestContainer>
                <Form>
                  <Form.Group controlId="tests">
                    <Form.Label>Tests</Form.Label>
                    <Typeahead
                      id="test-combobox"
                      labelKey="label"
                      multiple
                      options={test.map(item => ({ label: item }))}
                      placeholder="Select Tests"
                      onChange={handleTestsChange}
                      selected={selectedTests}
                    />
                  </Form.Group>
                </Form>
              </TestContainer>
            </center>
            <SectionTitle>Procedure</SectionTitle>
            <ProcedureContainer>
              {procedureRows.map(row => (
                <Row key={row.id} className="mb-3">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder={`Procedure ${row.id}`}
                      value={row.value}
                      onChange={e => handleInputChange(row.id, e.target.value)}
                    />
                  </Col>
                </Row>
              ))}
              <button onClick={handleAddRow}>Add Procedure</button>
            </ProcedureContainer>
            <NextVisitonContainer>
        <SectionTitle>Next Visit</SectionTitle>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          customInput={<CalendarIcon />}
          popperPlacement="bottom-end"
          dateFormat="dd/MM/yyyy"
        />
      
        <DateDisplay>
          <br/>
          {selectedDate ? `Next Visit on: ${formatDate(selectedDate)}` : 'Next Visit on: Select a date'}
        </DateDisplay>
      </NextVisitonContainer>
          </Tab.Pane>

          <Tab.Pane eventKey="summary">
            <br />
            <SummaryContainer>
              <center>
              {getSummaryDetails()}
              <button onClick={handleSubmit} >
                  Save 
           </button>
                </center>
            </SummaryContainer>
          
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      </RightContent>
    </div>
  );
};

export default PrescriptionDetails;
