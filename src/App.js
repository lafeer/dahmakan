import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: null,
    }
  }

  componentDidMount = async () => {
    try {
      const data = await axios.get('http://staging-api.dahmakan.com/test/orders').then(res => res.data)
      const { orders } = data;
      console.log(data)
      this.setState({
        orders,
      }, () => console.log(this.state.orders));
    } catch (error) {
      console.log(error)
    }
  }
  
  render() {
    const { orders } = this.state;

    const status = (utc) => {
      if (utc) {
        if (moment(utc).diff() > 0) {
          return 'Confirmed'
        } else {
          return 'Delivered'
        }
      } 
      return 'Cancelled'
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Date</th> 
            <th>Time</th>
            <th>Order Number</th>
            <th>Paid with</th>
          </tr>
        </thead>
        <tbody>
          {orders ? orders.map(order => (
            <tr key={order.order_id}>
              <td className={`status ${status(order.arrives_at_utc).toLowerCase()}`}>{status(order.arrives_at_utc)}</td>
              <td className="date">{moment(order.arrives_at_utc).format('dddd, DD/MM/YYYY')}</td>
              <td className="time">{order.arrives_at_utc ? moment(order.arrives_at_utc).format('hh:mm A') : '-'}</td>
              <td className="order-no">{`#${order.order_id}`}</td>
              <td className={`paid-with ${order.paid_with.toLowerCase()}`}>{order.paid_with}</td>
            </tr>
          )) : (
            <tr>
              <td>No orders to display</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default App;
