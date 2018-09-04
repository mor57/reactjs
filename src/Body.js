import React, { Component } from "react";

class Body extends Component {
  render() {
    return (
      <div className="container margintop10">
        <div className="document-title">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#/">صفحه اصلی</a></li>
              <li className="breadcrumb-item" aria-current="page">استعلام قیمت بیمه بدنه خودرو</li>
            </ol>
          </nav>
        </div>
      </div>
    );
  }
}

export default Body;