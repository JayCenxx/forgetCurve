
import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            hasError:false ,
            errorMessage: '', // To store a custom message or error  
            errorInfo: null   // To store error stack trace  
        }
    }

    static getDerivedStateFromError(err){
        //update state so the next render ll show the fallback UI 
        return {
            hasError:true,
            errorMessage: `Something went wrong: ${err.message}`

        }
    }

    componentDidCatch(error,errorInfo){
        this.setState({ errorInfo: errorInfo.componentStack });
        // replace with logging to a service if needed
        console.error("Error caught by Error Boundary: ", error, errorInfo);
    }

    render(){
        if(this.state.hasError){
            return <h1>{this.state.errorMessage}</h1>
        }

        return this.props.children;
    }

}