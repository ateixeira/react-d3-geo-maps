import React, { Component } from "react";

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {mapSize: {width: 0, height: 0}}
    }

    componentDidMount() {
        window.addEventListener("load", this.handleResize.bind(this));
        window.addEventListener("resize", this.handleResize.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener("load", this.handleResize);
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize() {
        if (this.state.mapSize.height !== this.mapSVG.parentNode.clientHeight)
            this.setState({ ...this.state, mapSize: { ...this.state.mapSize, height: this.mapSVG.parentNode.clientHeight} })
        if (this.state.mapSize.width !== this.mapSVG.parentNode.clientWidth)
            this.setState({ ...this.state, mapSize: { ...this.state.mapSize, width: this.mapSVG.parentNode.clientWidth} })
    }

    render() {
        return (
            <div className='map'>
                <svg ref={(mapSVG) => this.mapSVG = mapSVG}>
                    <path />
                </svg>
            </div>
        )
    }
}

export default Map;