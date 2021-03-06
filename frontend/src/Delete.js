import React from 'react';
const url = 'http://localhost:8000/countries/';

export class DeleteCountry extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     countryInfo: [],
        //     value: ''
        // };
        this.state = {
            countryInfo: [],
            value: '',
            name: '',
            code: ''
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch(url)
            .then((response) => { return response.json() })
            .then((response) => {
                this.setState({countryInfo: response});
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    handleChange(event) {
        this.setState({code:event.target.value})
    }

    handleDelete() {
        let jsonBody = JSON.stringify({
                name: this.state.name,
                code: this.state.code
            });
        fetch(url + this.state.code, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody),
        }).then(response=> {
            if (!response.ok) {
                throw new Error('Request failed!: ' + response.ok);
            }
            
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
            return jsonResponse;
        });
    }

    render() {
        let organizeCountries = this.state.countryInfo
        organizeCountries.sort(function(a, b){
            var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
            if (nameA < nameB) //sort string ascending
                return -1 
            if (nameA > nameB)
                return 1
            return 0 //default return value (no sorting)
        })

        let optionItems = this.state.countryInfo.map((options, i) =>
                <option key={i} value={options.code}>{options.name}</option>
            );
        
        return (
            <div>
                <h2>Use the dropdown to pick what country to remove from the database:<br/></h2>
                <label>
                    Pick your country:  
                    <select 
                        value={this.state.code}
                        onChange={this.handleChange}
                    >
                        {optionItems}
                    </select>
                    <br /> <br />
                    Please note that deleting a country will delete <br /> all states associated with that country as well
                </label> <br /><br />
                <button type="button" onClick={this.handleDelete}>Delete Country</button><br /><br />
            </div>
        );


    }
}
