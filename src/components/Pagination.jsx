import React , { Component }from 'react';
import Pagination from "react-js-pagination";

export default class Pag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: props.page,
            itemsCountPerPage: 10,
        };
    }

    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState(
            {activePage: --pageNumber},
            () => this.props.changeContent(this.state.activePage)
        );

    };

    render() {
        return (
            <div>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.props.total}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
            </div>
        );
    }
}
