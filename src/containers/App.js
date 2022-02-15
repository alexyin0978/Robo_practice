// import React,{Component} from "react";
import React, {useState,useEffect} from 'react';
import CardList from "../components/CardList";
// import {robots} from '../robots';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry';

function App(){

    //用useState來hook state
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    const [count, setCount] = useState(0);

    const onSearchChange = (event) => {
        //用setSearchfield來取代this.setState
        setSearchfield(event.target.value)
    }

    // componentDidMount(){
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(response => { return response.json()})
    //     .then(users => this.setState({robots: users}))
    // }

    useEffect( () => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => { return response.json()})
        .then(users => setRobots(users))
        console.log(count)
    },[count])
    //dep = [count] means only do useEffect when count changes


    const filterRobots = robots.filter( robot => robot.name.toLowerCase().includes(searchfield.toLowerCase()))
    //不可用array = array.filter()...,因為自己本身會被filter越來越少(不可逆)
    //舉例:本來array裡有10個value,
    //-->event1(輸入) -->filter array(10) -->array(8) -->event(刪除輸入) -->filter array(8) -->array(8) -->此array被永久改變
    //要解決不可逆,直接令array = const newArray
    //-->event1(輸入) -->filter array(10) to newArray -->newArray(8) 
    //-->event(刪除輸入) -->filter array(10) to newArray(8) -->newArray(10) -->此newArray為可逆,變動狀態
    //根本上的規則,filter不能作用在自己身上,規則上是要產生new array -> const newArray = array.filter()
    
    return !robots.length ? <h1 className="tc">Loading</h1> :
        <div className="tc">
            <h1 className="f1">Robofriends</h1>
            <button onClick={() => setCount(count+1)}>Click me!</button>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                    <CardList robots={filterRobots}/>
                </ErrorBoundry>
            </Scroll>
        </div>
}

//備註：React Lifecycle -> constructor -> render -> componentDidMount -> rerender  

export default App;