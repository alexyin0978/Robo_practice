import React,{Component} from "react";
import CardList from "../components/CardList";
// import {robots} from '../robots';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component{
    constructor(){
        super()
        this.state = {
            robots: [],
            //一開始將robots設置為空array
            //目的為先載入網頁其他資訊,最後才用componentDidMount從網頁api grab info for CardList
            searchfield: ''
        }
        console.log('constructor')
    }
    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => { return response.json()})
        .then(users => this.setState({robots: users}))
        console.log('component')
    }

    render(){
        const {robots, searchfield} = this.state
        //destructure this.state.robots & this.state.searchfield
        const filterRobots = robots.filter( robot => robot.name.toLowerCase().includes(searchfield.toLowerCase()))
        //不可用array = array.filter()...,因為自己本身會被filter越來越少(不可逆)
        //舉例:本來array裡有10個value,
        //-->event1(輸入) -->filter array(10) -->array(8) -->event(刪除輸入) -->filter array(8) -->array(8) -->此array被永久改變
        //要解決不可逆,直接令array = const newArray
        //-->event1(輸入) -->filter array(10) to newArray -->newArray(8) 
        //-->event(刪除輸入) -->filter array(10) to newArray(8) -->newArray(10) -->此newArray為可逆,變動狀態
        //根本上的規則,filter不能作用在自己身上,規則上是要產生new array -> const newArray = array.filter()
        console.log('render')
        return !robots.length ? <h1 className="tc">Loading</h1> :
            <div className="tc">
                <h1 className="f1">Robofriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filterRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
    }
}

//備註：React Lifecycle -> constructor -> render -> componentDidMount -> rerender  

export default App;