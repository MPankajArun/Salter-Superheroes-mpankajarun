import React, {Component } from 'react';
import SuperheroList from '../../components/SuperheroList/SuperheroList';
import Superhero from '../../components/SuperheroList/Superhero/Superhero';
import Modal from '../../common/Modal/Modal';
import './Home.css';
require('dotenv').config();



class Home extends Component{

    state = {
        superheroData: null,
        superheroDetails: null,
        superheroLastId: 1,
        superheroName: '',
        showDetails: false
    }

    componentDidMount(){
        this.loadSuperheroList();
    }


    loadSuperheroList = () =>{
        if(this.state.superheroData !== null){
            this.setState({superheroData: null});
        }

        const API_KEY = process.env.REACT_APP_API_KEY;
        const API_URL = process.env.REACT_APP_API_URL;

        const getInitialFetchList = () => {
            const fetchList = [];
            for(let i = 0; i< 20;i++) {
                fetchList.push(
                    fetch(`${API_URL}${API_KEY}/${Math.floor(Math.random() * 730)}`)
                );
            }
            return fetchList;
        } 

        const promises = Promise.all(getInitialFetchList());

          promises.then((results) => 
                Promise.all(results.map(r => r.json()))
            )
            .then(results => {
                console.log(results);
                
                this.setState(prevState => ({superheroData:results}));
                window.scroll({
                    top:0,
                    left:0,
                    behavior:"smooth"
                })
            }).catch(err =>{
                console.log(err);
            })
    }

    inputHandler = (e) => {
        let name = e.target.value;
        this.setState({superheroName: name});
    }

    submitHandler = (e) => {
        e.preventDefault();

        this.setState({superheroData: null});

        const API_KEY = process.env.REACT_APP_API_KEY;
        const API_URL = process.env.REACT_APP_API_URL;
        const url = `${API_URL}${API_KEY}/search/${this.state.superheroName}`;
        fetch(url).then(response =>{
            response.json().then(data =>{
                this.setState({superheroData: data.results ,superheroName: ""});
            }).catch(err =>{
                console.log(err);
            })
        }).catch(err =>{
            console.log(err);
        })
    }

    cardClickHandler = (e) => {
        for(let i = 0; i<this.state.superheroData.length; i++){
            if(this.state.superheroData[i].id === e.target.id){
             this.setState({superheroDetails: this.state.superheroData[i], showDetails:true});           
            }
        }

        window.scroll({
            top:0,
            left:0,
            behavior:"smooth"
        })
    }

    modalCloseHandler = () => {
        this.setState({superheroDetails:null, showDetails:false});
    }

    render(){
        let superheroList = "";
        let superhero = "";
        if(this.state.superheroData === undefined){
            superheroList = <h1 style={{color:'white', backgroundColor:"rgba(0,0,0,0.5)"}}>Superhero data not present!</h1>
        }
        else if(this.state.superheroData !== null ){
            superheroList = <SuperheroList superheroData = {this.state.superheroData} cardClick = {this.cardClickHandler}/>
        }

        if(this.state.superheroDetails !== null){
            superhero = <Superhero details={this.state.superheroDetails}/>
        }

        return(
            <React.Fragment>
            <div className={'Home'}>
                <div className="wrapper">
                    <div className="searchBar">
                        <input id="searchQueryInput" type="text" onChange={(e) => this.inputHandler(e)} value={this.state.superheroName} name='superhero-name' placeholder='Enter Superhero Name' autoComplete="off" />
                        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit" onClick={(e) => this.submitHandler(e)}>
                        <svg style={{width:'24px', height:'24px'}} viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                        </svg>
                        </button>
                    </div>
                 </div>
                {superheroList}
            </div>
            
            <br/>
            <Modal show={this.state.showDetails} modalClosed={this.modalCloseHandler}>
                    {superhero}
            </Modal>
            </React.Fragment>
        )
    }
}



export default Home;