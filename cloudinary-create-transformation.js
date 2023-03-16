require("dotenv").config({ path: `.env.local` });
const cloudinary = require("cloudinary").v2;


cloudinary.api
  .create_transformation(process.env.NEXT_PUBLIC_CLOUDINARY_OG_IMAGE_TRANSFORMATION_NAME, {transformation: [
    {width: 600, height: 630, crop: "fill"},
    {overlay: process.env.CLOUDINARY_OG_IMAGE_OVERLAY_PUBLIC_ID, width: 1200, height: 630, gravity: "west"},
    {width: 560, height: 450, crop: "fit", color: "#FFFFFF", gravity: "east", x: 80, y: 0, overlay: {
      text: '$(title)', font_family: 'Roboto', font_size: 60, font_weight: 'bold', font_color: 'FFFFFF'
    }},
    {quality: "auto", format: "auto"}
  ]})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });