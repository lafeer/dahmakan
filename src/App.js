import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
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
}

export default App;
