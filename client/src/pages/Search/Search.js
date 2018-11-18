import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import Geocode from "react-geocode";
import { withRouter } from 'react-router-dom'
// import { Col, Row, Container } from "../../components/Grid";
import SearchWall from "../../components/SearchWalls";
import SearchResults from "../../components/SearchResults";
import API from "../../utils/API";
import axios from 'axios';
import "./Search.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import "../../components/SearchResults/SearchResults.css";
import { Container, Row, Col } from 'react-grid-system';




const emailConfirmation = () => toast.success("Your e-mail has been successfully sent", { position: toast.POSITION.TOP_CENTER });
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width:'60%',
        backgroundColor:'#38425B',
        color:'white'


    }
};

class Search extends Component {
    //modal functions and states
    // constructor() {
    //     super();

    //     this.state = {
    //         modalIsOpen: false
    //     };

    //     this.openModal = this.openModal.bind(this);
    //     this.afterOpenModal = this.afterOpenModal.bind(this);
    //     this.closeModal = this.closeModal.bind(this);
    // }
    // insert state changes and methods here
    state = {
        autoCompleteState: [],
        modalIsOpen:false,
        gifts: "",
        address: "",
        range: "",
        errorMessage: "",
        results: [],
        sectionTitle: "",
        limit: null,
        hasSearched: false,
        showEmailForm: false,
        giftType: "",
        giftName: "",
        distance: "",
        guestLat: "",
        guestLong: "",
        userLat: "",
        userLong: ""
    };
    
                 componentDidMount = () => {
     
                
                     this.handleGiftAutocomplete();
                // this.openModal();
                     this.getLocation();
                     this.latLong();
            
                }
                
                
                
                
                // getCurrentPosition
                displaySearchResults = () => {
                    return this.state.results.map(result => {
                        if (result) {
                            <SearchResults

                            id={result._id}
                            key={result._id}
                            gifts={result.gifts}
                            wallName={result.wallName}
                            name={result.name}
                            email={result.email}
                            zipCode={result.zipCode}
                            city={result.city}
                            latitude={result.latitude}
                            longtude={result.longtude}
                            distance={result.distance}
                            
                            />
                        }
                    })
                }
                
                openModal = () => {
                    this.setState({modalIsOpen: true },
                    () => console.log(this.state.results));
                }
            
                afterOpenModal = () => {
            
                    console.log("Open Modal")
                }
            
                closeModal = () => {
                    this.setState({ modalIsOpen: false });
                }
                handleErrorMessage = () => {
        this.setState({ errorMessage: "Please fill in all fields before searching." })
        console.log(this.state.errorMessage);
    }
    handleGiftsChange = event => {
        this.setState({ gifts: event.target.value.toLowerCase() });
    }

    handleGiftsInputChange = (event, giftType) => {
        this.setState({ giftType: event.target.value.toLowerCase() })
    }




    handleAreaChange = event => {
        this.setState({ address: event.target.value });
    };




    clearEmailForm() {
        document.getElementById('emailFrom').value = '';
        document.getElementById('emailSubject').value = '';
        document.getElementById('emailBody').value = '';

    };


    sendEmail = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: '/api/send/mail',
            params: {
                // emailTo: this.state.results[0].email,
                emailTo: document.getElementById('emailTo').value,
                emailFrom: document.getElementById('emailFrom').value,
                emailSubject: document.getElementById('emailSubject').value,
                emailBody: document.getElementById('emailBody').value
            }
        }).then((response) => {
            this.closeModal();
            console.log(response);
            // console.log("email:", this.state.results[0].email);

        })

        this.clearEmailForm();


        this.emailSentMessage();
    };
    emailButtonEffect() {
        let effect = document.getElementById('emailSendButton');
        effect.classList.add('running');
        setTimeout(function () { effect.classList.remove('running') }, 1000);
    };

    clearEmailForm() {
        document.getElementById('emailTo').value = '';
        document.getElementById('emailFrom').value = '';
        document.getElementById('emailSubject').value = '';
        document.getElementById('emailBody').value = '';

    };

    emailSentMessage() {
        let toast = document.getElementById('toast');
        toast.classList.remove('invisible');

        setTimeout(function () { toast.classList.add('invisible') }, 1000);
        document.getElementById('emailForm').classList.add("invisible");
        emailConfirmation();



    };

    handleRangeChange = event => {
        this.setState({ range: event.target.value });
    };


    handleGiftAutocomplete = event => {
        console.log("hello autocomplete", this.state.giftType);
        if (this.state.giftType || this.state.autoCompleteState.length === 0) {
            API.getAllGifts({
                gifts: this.state.giftType,
            })
                .then(res => {


                    let giftListFromDatabase = res.data
                    let finalGiftArray = [];
                    let uniqueArray
                    let giftAutoCompleteArray
                    let autoCompleteArray = []


                    giftListFromDatabase.forEach((element) => {
                        let gifts = element.gifts
                        if (gifts.length === 1) {
                            finalGiftArray.push(gifts[0])
                        } else {
                            gifts.forEach((element) => {
                                finalGiftArray.push(element)
                            })
                        }

                        let removeDuplicates = (arr) => {
                            uniqueArray = arr.filter(function (elem, index, self) {
                                return index == self.indexOf(elem)
                            })
                            return uniqueArray
                        }

                        giftAutoCompleteArray = removeDuplicates(finalGiftArray)



                        return giftAutoCompleteArray
                    })

                    giftAutoCompleteArray.forEach((element) => {
                        let giftObject = { abbr: element, name: element }
                        autoCompleteArray.push(giftObject)
                        return autoCompleteArray
                    })

                    this.setState({ autoCompleteState: autoCompleteArray })
                })
                .catch(err => console.log(err))
        }
    }

    searchButtonEffect() {
        let effect = document.getElementById('effect');
        effect.classList.add('running');
        setTimeout(function () { effect.classList.remove('running') }, 2000);
    }



    handleSearchBtnSubmit = event => {
        event.preventDefault();



        if (this.state.giftType) {
            API.lookForGifts({
                gifts: this.state.giftType,
                address: this.state.address,
                range: this.state.range
            })

                .then(res => {
                    let resultsArray = [];
                    console.log("results:", res);
                    res.data.forEach(function (element) {
                        console.log("element:", element);
                        resultsArray.push(element);

                    });
                    console.log("result array:", resultsArray);
                    this.setState({ results: resultsArray })
                    // console.log("new state:", this.state.results[0].zipCode);
                    let newAddress = this.state.results[0].zipCode
                    console.log("newAddress:", newAddress);
                    this.latLong(newAddress)

                    console.log("new state isssssss:", this.state);

                })
                .catch(err => console.log(err))
        }
        if (this.state.giftType === "" || this.state.address === "" || this.state.range === "") {
            this.handleErrorMessage();
            console.log("working");

        }

        this.setState({
            hasSearched: true
        })

    };



    distanceCalc = (lat1, lon1, lat2, lon2, unit) => {
        let radlat1 = Math.PI * lat1 / 180
        let radlat2 = Math.PI * lat2 / 180
        let theta = lon1 - lon2
        let radtheta = Math.PI * theta / 180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist

    };




    latLong = (address) => {
        Geocode.setApiKey("AIzaSyC_nTVvqzEckQ6WzQmCV_POw6a80BmOQPo");

        // Enable or disable logs. Its optional.
        Geocode.enableDebug();
        Geocode.fromAddress(address).then(
            response => {
                let { lat, lng } = response.results[0].geometry.location;
                console.log("lat and long are:", lat, lng);
                let newLat = lat;
                let newLong = lng;
                console.log("newlat and newlong are:", newLat, newLong);

                this.setState({
                    userLat: newLat,
                    userLong: newLong

                })

            },
            error => {
                console.error(error);
            }
            // ,

        );


    }

    //////////////////////////////////////////


    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition);
        }
    };

    setPosition = (position) => {

        this.setState({
            guestLat: position.coords.latitude,
            guestLong: position.coords.longitude

        })
        console.log("state jadide", this.state)
        // document.getElementById("demo").innerHTML = "Latitude: " + position.coords.latitude + 
        // "<br>Longitude: " + position.coords.longitude;
    }




    ////////////////////////////////////////



    render() {
        return (
            <div>
                <Wrapper>

                    <SearchWall
                        handleGiftAutocomplete={this.handleGiftAutocomplete}
                        values={this.state.autoCompleteState}
                        handleGiftsChange={this.handleGiftsChange}
                        // handleGiftsType={this.handleGiftsType}
                        handleGiftsInputChange={this.handleGiftsInputChange}
                        handleAreaChange={this.handleAreaChange}
                        handleRangeChange={this.handleRangeChange}
                        handleSearchBtnSubmit={this.handleSearchBtnSubmit}
                        displaySearchResults={this.displaySearchResults}
                        errorMessage={this.state.errorMessage}
                        giftTypeStock={this.giftTypeStock}
                        giftType={this.state.giftType}
                        distanceCalc={this.distanceCalc}
                        getLocation={this.getLocation}
                        latLong={this.latLong}
                    />


                    {this.state.hasSearched ?
                        (
                            <div>
                                <h3 className="resultTitle">Results</h3>
                                <Container>
                                        <Row>

                                            {this.state.results.map(result => (
                                                <SearchResults
                                                     key={result.id}
                                                     name= {result.name}
                                                     wallName= {result.wallName}
                                                     gifts= {result.gifts}
                                                     email= {result.email}
                                                     city= {result.city}
                                                     zipCode= {result.zipCode}
                                                    //  distance= {result.distanceCalc(result.userLat,result.userLong,result.guestLat,result.guestLong)}
                                                     results={this.state.results}
                                                     guestLat={this.state.guestLat}
                                                     guestLong={this.state.guestLong}
                                                     openModal={this.openModal}
                                                     sendEmail={this.sendEmail}
                                                     distanceCalc={this.distanceCalc}
                                                     getLocation={this.getLocation}
                                                     userLat={this.state.userLat}
                                                     userLong={this.state.userLong}
    
                                    // latLong={this.latLong}
    
                                                 />

                                            ))}
                                    </Row>
                                </Container>
                            {/* {this.state.results.map(result => ( */}
                                <Modal
                                    isOpen={this.state.modalIsOpen}
                                    onAfterOpen={this.afterOpenModal}
                                    onRequestClose={this.closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                >
                                   
                                    <form id='emailForm'>
                                        <h4>To: <input type="text" id="emailTo" placeholder="Donor's Email"/> </h4>
                                        <h4>From: <input type="text" id="emailFrom" placeholder="Your Email"/></h4>
                                        <h4>Subject:<input type="text" id="emailSubject" placeholder="Message Title" /></h4>
                                        <h4>Message:</h4>
                                        <textarea id="emailBody"></textarea>
                                        <button onClick={this.sendEmail} 
                                        type="submit" 
                                        id="emailSendButton" 
                                        className="btn btn-success ld-over-full-inverse registerBtn">
                                        <div className="ld ld-ball ld-flip"></div>Send
                                        
                                        </button>
                                        <button className="closeModal" onClick={this.closeModal}>Close</button>
                                    </form> 
                                </Modal>

                            
                            </div>
                        )
                        :
                        <div className="welcomeDiv">
                            <h1 className="welcomeBanner">Welcome!</h1>
                            <p id="welcomeNote">Feel free to search our list of gifts available to you from our donors. If you like what you see, you can request it from an angel and organize a time to pick it up!</p>
                        </div>

                    }

                    {/* <MakeRequest /> */}
                    <ToastContainer />
                </Wrapper>

            </div>

        );
    }

}

export default Search 