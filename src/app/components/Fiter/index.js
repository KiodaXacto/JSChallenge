import React , {useState} from 'react';
import { Dropdown, FormControl } from "react-bootstrap";

//styling
import "./style.css";
//this particular part is just to reformat the menu button
//it adds a surch bare to the menu
//for more explanation : https://react-bootstrap.netlify.com/components/dropdowns/
const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={e => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        child =>
                            !value || child.props.children.toLowerCase().indexOf(value)>=0,
                    )}
                </ul>
            </div>
        );
    },
);

//the fitler component starts here
function Filter(props) {
    const [filter, setFilter] = useState("");
    let options = [];
    props.options.forEach(item=>{
        options.push(<Dropdown.Item key ={item} eventKey={item}>{item}</Dropdown.Item>);
    })
    //handling the select event
    const onSelectHandler = (value)=>{
        setFilter(value);
        props.onChange(value);
    }
    return (
        <div className="DropDownList">
            <Dropdown onSelect={onSelectHandler}>
                <Dropdown.Toggle id="dropdown-custom-components">
                    Orbiting Body ({filter===""?"All":filter})
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                    <Dropdown.Item key="#" eventKey="">All</Dropdown.Item>
                    {options}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default Filter;