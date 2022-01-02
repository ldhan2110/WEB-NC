import React from "react";
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

const CloudinaryImg = (props) => {
    return(
        <div>
            <Image cloudName="dleukbesu" secure={true} upload_preset="my_unsigned_preset" publicId="80389375_3377474308991508_6626622800964616192_n_lqa00m">
                <Transformation width="300" height="250" gravity="south" crop="scale" />
            </Image>
        </div>
    );
}

export default CloudinaryImg;