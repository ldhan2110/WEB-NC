import React from "react";
import Carousel from 'react-material-ui-carousel'

const contentStyle = {
    height: '30vh',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const CarouselComponent = (props) => {
    const {imgList} = props;
    
    const [listImg, setListImg] = React.useState(imgList);

    React.useEffect(()=>{
        console.log(imgList);
    },[imgList])

    return (<Carousel>
        {
            listImg.map( (item, i) => 
            <div>
                <h3 style={contentStyle}>1</h3>
            </div>)
        }
    </Carousel>);
};

export default CarouselComponent;