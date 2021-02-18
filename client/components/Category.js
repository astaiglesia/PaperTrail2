import React, { Component } from 'react';
import { render } from 'react-dom';
// import { useMediaQuery } from 'react-responsive';
import "./styling.scss";
// import logo from './logo.png';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import ImageUploader from "react-images-upload";


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: []
    }
    this.onChangeFile = this.onChangeFile.bind(this);
    this.addItem = this.addItem.bind(this);
  }


// addCategory(){
// //POST??
// }
addItem(e) {
  e.preventDefault();
  let files = {};
  let dataArr = [];
  const catName = document.getElementById('newCategory').value;
  console.log('catName', catName)
  let looped = this.state.file;
  for(let i = 0; i < looped.length; i++) {
    // console.log('looped Data', looped[i].name)
    files = {
      'lastModified'    : looped[i].lastModified,
      'lastModifiedDate': looped[i].lastModifiedDate,
      'name'       : looped[i].name,
      'size'       : looped[i].size,
      'type'       : "image/png",
    }
    dataArr.push(files)
  }
console.log('dataArr after loop', dataArr)
// console.log(this.props.state.user.categories)
  const receiptRequest = JSON.stringify({email: this.props.state.user.email, password: this.props.state.user.password, category: catName, receiptData: dataArr});  
  fetch('/test', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: receiptRequest
  })
  .then(response => response.json())
  .then(result => {
    console.log('addItem results: ', result);
  })
  .catch(err => console.log('error sending the request:', err))
};
  
onChangeFile(receipt) {
  this.setState({
    file: this.state.image.concat(receipt)
  })
}


render() {
  // console.log('propssss', this.props.state.user.categories)
  let arrOfCategories= [];
  const categories = this.props.state.user.categories;
  for (let i=0; i < categories.length; i++) {
    arrOfCategories.push(
    <button id = "newReceipt"> 
      {categories[i].category}
      <ImageUploader
            key = {`imgUploader${i}`}
            withIcon={false}
            withPreview={true}
            label=''
            buttonText='Upload Receipt'
            onChange={this.onChangeFile}
            imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
            maxFileSize={1000000}
          />
          <button id="save" onClick = {this.addItem}>Save</button>
    </button>)
  };
  // console.log('state after onchangeFile', this.state.file)

    return (
      <div id="allMain">
         <header>
            <Link id="home" to = "/" style = {styles.container}>
              <button className='btn btn-secondary' id="homeButton">
                Home
              </button>
            </Link>
            <div id="titleBox">
              <span id="banner">PaperTrail</span>
            </div>
          </header>

        <div id="mainTop">
          <h1>{this.props.state.user.userName}'s Dashboard</h1>
          <form id="category">
            <input type="text" className="form-control" id="newCategory" aria-describedby="passwordHelpInline" placeholder="start a new category" onSubmit={this.props.addCategory}/>
            <button type="submit" className='btn btn-primary' id="submitCategory" onClick={this.props.addCategory} >
              upload receipts
            </button>
          </form>
        </div>

        <div id="mid">
          <h1>Your Categories:</h1>
        </div>
        
        <div id="receiptContainer">
          {arrOfCategories}
        </div>

        <div id="submission">
          <button className='btn btn-primary' id="totalsButton">
            <Link to = "/totals" style = {styles.container}>totals</Link>
          </button>
          <button className="btn btn-secondary" id="logout">
            <Link to = "/" style = {styles.container}> logout </Link>
          </button>
        </div>  
      </div>
    );
  }
}

const styles = {
  container: {
    color: "white",
    textDecoration: "none",
  }
}

export default Category;