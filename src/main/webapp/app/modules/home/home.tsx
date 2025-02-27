import './home.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Card, CardBody, CardText, CardTitle, Col, Row, Table } from 'reactstrap';

import { useAppSelector } from 'app/config/store';
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 278, pv: 3908, amt: 2000 },
  { name: 'May', uv: 189, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 239, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 349, pv: 4300, amt: 2100 },
];

const pieData = [
  { name: 'Collected', value: 400 },
  { name: 'Remaining', value: 100 },
];

const COLORS = ['#0088FE', '#FF8042'];

const topCustomers = [
  { name: 'Customer 1', amount: 1000 },
  { name: 'Customer 2', amount: 900 },
  { name: 'Customer 3', amount: 800 },
  { name: 'Customer 4', amount: 700 },
  { name: 'Customer 5', amount: 600 },
];

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      {/* <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col> */}
      <Col md="12">
        <h3 className="display-4">
          <Translate contentKey="home.title">Welcome to LALANA CREDIT PVT LTD</Translate>
        </h3>
        <p className="lead">
          <Translate contentKey="home.subtitle">Fueling Ambitions, Empowering Growth</Translate>
        </p>
        <br />
        {account?.login ? (
          <>
            <Row>
              <Col md="3">
                <Card style={{ backgroundColor: '#f8d7da', borderRadius: '10px' }}>
                  <CardBody>
                    <CardTitle tag="h5" style={{ fontWeight: 'bold' }}>
                      Total Loans
                    </CardTitle>
                    <CardText style={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'right' }}>100</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card style={{ backgroundColor: '#d4edda', borderRadius: '10px' }}>
                  <CardBody>
                    <CardTitle tag="h5" style={{ fontWeight: 'bold' }}>
                      Total Loan Amount
                    </CardTitle>
                    <CardText style={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'right' }}>$500,000</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card style={{ backgroundColor: '#d1ecf1', borderRadius: '10px' }}>
                  <CardBody>
                    <CardTitle tag="h5" style={{ fontWeight: 'bold' }}>
                      Number of Customers
                    </CardTitle>
                    <CardText style={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'right' }}>200</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card style={{ backgroundColor: '#fff3cd', borderRadius: '10px' }}>
                  <CardBody>
                    <CardTitle tag="h5" style={{ fontWeight: 'bold' }}>
                      This Month Collection
                    </CardTitle>
                    <CardText style={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'right' }}>$50,000</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="6">
                <h2>Collection Progress</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Col>
              <Col md="6">
                <h2>Top Customers</h2>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustomers.map((customer, index) => (
                      <tr key={index}>
                        <td>{customer.name}</td>
                        <td>${customer.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <br />
            <div className="dashboard">
              <h2>This Year Collection Progress</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                  <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div>
            {/* <Alert color="warning">
              <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>

              <Link to="/login" className="alert-link">
                <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
              </Link>
              <Translate contentKey="global.messages.info.authenticated.suffix">
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Translate>
            </Alert>

            <Alert color="warning">
              <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
              <Link to="/account/register" className="alert-link">
                <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
              </Link>
            </Alert> */}
          </div>
        )}
        {/* <p>
          <Translate contentKey="home.question">If you have any question on JHipster:</Translate>
        </p>

        <p>
          <Translate contentKey="home.like">If you like JHipster, do not forget to give us a star on</Translate>{' '}
          <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          !
        </p> */}
      </Col>
    </Row>
  );
};

export default Home;
