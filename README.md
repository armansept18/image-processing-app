# Image Processing API

Welcome to the Image Processing API! This API provides functionalities for converting, resizing, and compressing images.

## Installation

To install and run the Image Processing API locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/image-processing-api.git

2. Install dependency :
   ```bash
   cd image-processing-api
   npm install

4. Start the server :
   ```bash
   npm start

## Usage
To use the Image Processing API, make HTTP requests to the following endpoints:

/convertToJPEG : Convert image files from PNG to JPEG.

/resize : Resize images according to specified dimensions.

/compress : Compress images to reduce file size while maintaining reasonable quality.

## Endpoints
### Convert to JPEG

Endpoint: `/convertToJPEG`

Method: `POST`

Parameters:

`inputFile`: Image file to be converted (multipart/form-data).

Response:

Status Code: 200 OK

Body: "Image converted to JPEG successfully."

### Resize
Endpoint: `/resize`

Method: `POST`

Parameters:

`inputFile`: Image file to be resized (multipart/form-data).

`width`: Width of the resized image.

`height`: Height of the resized image.
   
Response:

Status Code: 200 OK

Body: "Image resized successfully."

### Compress
Endpoint: `/compress`

Method: `POST`

Parameters:

`inputFile`: Image file to be compressed (multipart/form-data).

`quality`: Compression quality (0-100).

Response:

Status Code: 200 OK

Body: "Image compressed successfully."
