import React from 'react';
import TableComponent from '../../components/TableComponent';
import Filter from '../../components/Fiter';

//styling 
import "./style.css";
//mock
//import nasaData from "../../moks/nasaData";






class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataToShow: [],
            filter: "Mars",
            orbits: [],
            error: false,
            charging: true,

        }
        this.parse = this.parse.bind(this);
    }
    //a compartor to compare tow lines of the fetched data
    comparator(a, b) {
        //calculating the average diameter of the first object
        const aAverage = (a[1] + a[2]) / 2;
        //calculating the average diameter of the second object
        const bAverage = (b[1] + b[2]) / 2;

        return bAverage - aAverage;
    }
    componentDidMount() {
        //using the fetch API to fetch the data from the server;

        fetch("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY")
            .then(res => res.json())
            .then(data => {
                let parsedData = this.state.data;
                let orbits = this.state.orbits;
                let hash = {};
                data.near_earth_objects.forEach(item => {
                    //preparing the list of orbiting bodies
                    let orbit = [];
                    item.close_approach_data.forEach(it => {
                        //here we prepare the final list of orgits
                        if (!hash[it.orbiting_body]) {
                            hash[it.orbiting_body] = true;
                            orbits.push(it.orbiting_body);
                        }
                        orbit.push(it.orbiting_body)
                    })
                    //in the previous step the data has this structure [nam, min diametern, max diameter];
                    // now we ara going to add a list of orbits at the end
                    parsedData.push([item.name, item.estimated_diameter.kilometers.estimated_diameter_min, item.estimated_diameter.kilometers.estimated_diameter_max, orbit])
                })
                if (parsedData.length === 0) {
                    throw new Error("Error");
                }
                this.setState({ data: parsedData });
                this.parse("");
                this.setState({ charging: false });
                this.setState({ orbits: orbits });
            })
            .catch(() => this.setState({ error: true }))

        //item.estimated_diameter.kilometers.estimated_diameter_min
        //for the main time i'm going to use a mock so i can prepare the data since the nasa api limits the number of calls
        //    let data = nasaData;
        //    let parsedData = this.state.data;
        //    let orbits = this.state.orbits;
        //    let hash = {};
        //    data.near_earth_objects.forEach(item=>{
        //        //preparing the list of orbiting bodies
        //        let orbit = [];
        //        item.close_approach_data.forEach(it=>{
        //            //here we prepare the final list of orgits
        //            if(!hash[it.orbiting_body]){
        //                hash[it.orbiting_body] = true;
        //                orbits.push(it.orbiting_body);
        //            }
        //            orbit.push(it.orbiting_body)
        //         })
        //        //in the previous step the data has this structure [nam, min diametern, max diameter];
        //        // now we ara going to add a list of orbits at the end
        //        parsedData.push([item.name,item.estimated_diameter.kilometers.estimated_diameter_min,item.estimated_diameter.kilometers.estimated_diameter_max, orbit])
        //     })
        //     if(parsedData.length === 0){
        //            throw new Error("Error");
        //        }
        //    this.setState({data: parsedData});
        //    this.parse("");
        //    this.setState({ charging: false});
        //    this.setState({ orbits: orbits});


    }
    //this method is going to prepare the data that we are going to draw
    parse(value) {
        let toShow = [];
        const data = this.state.data;
        data.forEach(element => {
            let flag = value === "";
            if (this.state !== "") {
                element[3].forEach(item => {
                    if (item === value) {
                        flag = true
                    }
                })
            }
            if (flag) {
                toShow.push(element.slice(0, 3));
            }
        });
        this.setState({ dataToShow: toShow, filter: value });
    }
    render() {
        let toRednder = "";

        if (this.state.error) {
            toRednder = <h2>Oops!! Somthig went wrong !!</h2>
        } else if (this.state.charging) {
            toRednder = <h2>charging...</h2>
        } else {
            //display the data as table
            toRednder = <TableComponent data={this.state.dataToShow}/>;
        }
        return (
            <>
                <Filter options={this.state.orbits} onChange={this.parse} />
                <div className="container">
                    {toRednder}
                </div>
            </>
        );
    }
}

export default Main;
