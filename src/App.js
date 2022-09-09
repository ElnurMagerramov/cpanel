import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AddProduct from './components/AddProduct'
import UpdateProduct from './components/UpdateProduct'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import Products from './components/Products'
import Home from './components/Home'
export default class App extends Component {
  render() {
    return (
      <div>
          <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route exact path='/add' component={AddProduct} />
            <Route exact path='/edit/:id' component={UpdateProduct} />
            <Route exact path='*' component={NotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}
