#!/usr/bin/env node

var path = require('path')

  , fs = require('graceful-fs')
  , glob = require('glob')
  , mime = require('mime')
  , S3 = require('aws-sdk').S3

  , pattern = process.argv[2]
  , bucket = process.argv[3]

  , getRegion = function (callback) {
      var s3 = new S3

      s3.getBucketLocation({ Bucket: bucket }, function (err, data) {
        if (err)
          throw err

        callback(null, data.LocationConstraint)
      })
    }

mime.default_type = null

getRegion(function (err, region) {
  var s3 = new S3({ region: region })

  glob(pattern).on('match', function (match) {
    var contentType = mime.lookup(match)

    fs.readFile(match, function (err, file) {
      if (err)
        if (err.code === 'EISDIR')
          return
        else
          throw err

      var s3options = {
        Bucket: bucket,
        Body: file,
        Key: match
      }

      if (contentType)
        s3options.ContentType = contentType

      s3.putObject(s3options, function (err) {
        if (err)
          throw err

        console.log('uploaded %s finished (%s kb)', match, Math.round(file.length / 1024))
      })

    })

  })
})
