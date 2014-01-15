#!/usr/bin/env node

var path = require('path')
  , zlib = require('zlib')

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
  , maybeGzip = function (contentType, buffer, callback) {
      if (!contentType || contentType.slice(0, 5) === 'image')
        return callback(null)

      zlib.gzip(buffer, callback)
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

      maybeGzip(contentType, file, function (err, gzipped) {
        var s3options = {
          Bucket: bucket,
          Key: match
        }

        if (err)
          throw err

        if (gzipped) {
          s3options.Body = gzipped
          s3options.ContentEncoding = 'gzip'
        } else {
          s3options.Body = file
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
})
