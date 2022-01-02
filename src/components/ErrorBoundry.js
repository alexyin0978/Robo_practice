import React,{Component} from "react";

class ErrorBoundry extends Component{
    constructor(props){
        super(props)
        this.state ={
            hasError: false
        }
    }

    componentDidCatch(err){
        this.setState({hasError: true})
    }

    render(){
        if(this.state.hasError){
            return <h1>Ooooops, something went wrong!!</h1>
        }
        return this.props.children
        
        
        // !this.state.hasError ? <h1>Ooooops, something went wrong!!</h1> :
        // this.props.children
    }
}

export default ErrorBoundry;