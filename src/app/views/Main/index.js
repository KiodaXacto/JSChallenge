import React from 'react';
import Chart from '../../components/Chart';

//styling 
import "./style.css";
//mock
//import nasaData from "../../moks/nasaData";




class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            error: false,
            charging: true,

        }
    }
    //a compartor to compare tow lines of the fetched data
    comparator(a,b){
        //calculating the average diameter of the first object
        const aAverage = (a[1] + a[2])/2;
        //calculating the average diameter of the second object
        const bAverage = (b[1] + b[2])/2;

        return bAverage - aAverage;
    }
    componentDidMount(){
        //using the fetch API to fetch the data from the server;
        fetch("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY")
            .then(res=>res.json())
            .then(data=>{   
                let parsedData = this.state.data;
                //preparing the data
                //here we are going to extract the needed that from the API response
                //the name, the min diameter and the max diameter
                data.near_earth_objects.forEach(item => parsedData.push([item.name, item.estimated_diameter.kilometers.estimated_diameter_min, item.estimated_diameter.kilometers.estimated_diameter_max]));
                //if the length of the data is 0 we are just going to throw an error
                if (parsedData.length === 0) {
                    throw new Error("Error");
                }
                // ordring the data
                parsedData.sort(this.comparator);
                //storing the data to the state
                this.setState({ data: parsedData });
                this.setState({ charging: false });
            })
            .catch(() => this.setState({error: true}))
        
       //item.estimated_diameter.kilometers.estimated_diameter_min
       //for the main time i'm going to use a mock so i can prepare the data since the nasa api limits the number of calls
    //    let data = nasaData;
    //    let parsedData = this.state.data;
    //    data.near_earth_objects.forEach(item=>parsedData.push([item.name,item.estimated_diameter.kilometers.estimated_diameter_min,item.estimated_diameter.kilometers.estimated_diameter_max]));
    //    if(parsedData.length === 0){
    //        throw new Error("Error");
    //    }
    //    this.setState({data: parsedData});
    //    this.setState({ charging: false});
        

    }

    render() {
        let toRednder;
        if(this.state.error){
            toRednder = <h2>Oops!! Somthig went wrong !!</h2>
        }else if(this.state.charging){
            toRednder = <h2>charging...</h2>
        }else{
            toRednder =  <Chart data = {this.state.data}/>
        }
        return (
            <>
                <div className="container">
                    {toRednder}
                </div>
            </>
        );
    }
}

export default Main;
