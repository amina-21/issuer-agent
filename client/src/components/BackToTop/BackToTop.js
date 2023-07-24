import React, { Component } from "react";

export class BackToTop extends Component {
  render() {
    return (
      <div>
        <nav aria-label="Back to top" className="back-to-top">
          <a
            href="#top"
            className="back-to-top-link btn btn-icon btn-secondary"
            title="Back to top"
          >
            <span className="visually-hidden">Back to top</span>
          </a>
        </nav>
      </div>
    );
  }
}

export default BackToTop;
