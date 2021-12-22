import React from "react";
import Carousel from 'react-material-ui-carousel'
import CloudinaryImg from './CloudinaryImg';

const contentStyle = {
   marginTop: "10px"
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
            <div className={contentStyle}>
                <CloudinaryImg/> 
            </div>)
        }
    </Carousel>);
};

export default CarouselComponent;