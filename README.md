# File Metadata Microservice

My solution for one of the tasks from [freecodecamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/file-metadata-microservice)freecodecamp. This task involved creation of a simple exercise tracker  microservice according to the given guidelines that can be found in the above link. The solution is currently available on my [website](https://filemetadata.profresor.net).

## Requirements

The only requirement is Docker, which can be installed from [official website](https://www.docker.com/products/docker-desktop/)

## Setup

Micro service can be run using the following command run from the project main directory:

```
sudo docker compose up -d
```

As the result, the microservice will be available at 127.0.0.1:10004.

## Description

The documentation of the application endpoints can be found under [<i>/api/docs</i>](https://filemetadata.profresor.net/api/docs).

NOTE: Remember to update the paths to conform to file layout on your machine in [<i>compose.yaml</i>](https://github.com/MrResor/freecodecamp-filemetadata/blob/main/compose.yaml).

## Errors

Program blocks upload of files bigger than 10MB, with certain extensions (mainly executable types such as <i>.exe</i>, <i>.sh</i> and <i>.bat</i>) or when two extensions are detected (though said detection is fairly crude, simply splitting name string on <i>.</i>, meaning that name such as <i>1.1.1970.log</i> will not be uploaded). However if file is larger than 10MB and violates one of the above extensions rules the response is not send back to the user, resulting in endlessly pending request. This issue does not seem to be caused by implementation as other users experience the same problem ([here](https://github.com/expressjs/multer/discussions/1282)) and even before in similar situations ([here] (https://github.com/expressjs/multer/issues/1218) and [here](https://github.com/expressjs/multer/issues/53)). As such, no attempt of fixing that beyond what was already attempted will be made untill some new information come to light.
