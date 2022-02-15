import React,{Component} from "react";

class ErrorBoundr extends Component{
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
        return this.state.hasError ? <h1>Ooooops, something went wrong!!</h1> :
        this.props.children
    }
}

export default ErrorBoundr;