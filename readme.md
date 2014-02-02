# node-s3upload

An opinionated application to upload a folder to a s3 bucket.

## installation

```
  npm install -g s3upload
```

## features

* Content-Type is set based on file extension, so example.png will get the Content-Type "image/png"
* Files that are compressible (according to the [compressible](https://npmjs.org/package/compressible) module) are gzipped and the Content-Encoding is set correctly
* When uploading you define what files to include using a glob (e.g "**/*.js" to only upload javascript files)
* Region for the bucket is automatically identified, but you need to create the bucket yourself in AWS beforehand
* Cache-Control is automatically set to `max-age=60` (one minute) if the Content-Type is "text/html"

## usage

```
  export AWS_ACCESS_KEY_ID=*access key from AWS*
  export AWS_SECRET_ACCESS_KEY=*secret access key from AWS*
  s3upload "*/**" bucket-name
```

## licence

Copyright (c) 2014 Like.tv

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

