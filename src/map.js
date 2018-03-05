import React, { Component } from "react";
import { geoMercator, geoPath  } from 'd3-geo';
import usGeoData from './states.geo';

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
        const { height, width } = this.state.mapSize;

        const projection = geoMercator()
            .scale(width * 0.9)
            .translate([width / 2, height / 2])
            .center([-98.35, 39.5])
  
        const pathGenerator = geoPath().projection(projection);
        
        const states = usGeoData.features
            .map((feature, idx) => {
                const fakeData = Math.random();
                return <path
                    key={"path" + idx}
                    d={pathGenerator(feature)}
                    style={{ fill: "#dedede", fillOpacity: fakeData, stroke: "black", strokeWidth: 2, strokeOpacity: 1, cursor: "pointer" }}
                    className="states"
            />})

        return (
            <div className='map'>
                <svg width={'100%'} height={'100%'} ref={(mapSVG) => this.mapSVG = mapSVG}>
                    {states}
                </svg>
            </div>
        )
    }
}

export default Map;