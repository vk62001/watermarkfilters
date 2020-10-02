const sharp = require('sharp');
const ffmpeg =  require('fluent-ffmpeg');
const ffmpeg_static = require('ffmpeg-static');


function img(){

    const tempPath = './temp';
    const imageName = 'imagenprocesada';
    const filePosted = './temp/unaimagen.jpg'
    const domainModel = 'www.myladydusha.com';
    const watermark =  true;
    const newImage =  'nuevaimagen.png'
    sharp(filePosted)
    .resize(720)
    .toFormat('jpg')
    .rotate()
    .withMetadata()
    .toFile(newImage, (error, info)=>{
        console.log(error, info)
        if(watermark){
            ffmpeg(newImage)
                .output(newImage)
                .complexFilter([
                    {
                        filter: 'drawtext',
                        options: {
                        // fontfile: this.config.fontFile.path+this.config.fontFile.fileName,
                        text: domainModel,
                        fontsize: 20,
                        fontcolor: 'white',
                        x: '(main_w/2-text_w/2)',
                        y: '(text_h/2)+15',
                        shadowcolor: 'black@0.7',
                        shadowx: 1,
                        shadowy: 1
                        }
                    },
                ])
                .on("start", function (commandLine) {
                    console.log('Spawned ffmpeg with command: ' + commandLine);
                })
                .on('end', function () {
                    console.log('files have been merged succesfully');
                })
                .on("error", function (err) {
                    console.log("Error occurred during merging: " + err.message)
                })
                .run()
        }
    });
}

//img();

function test(){
    ffmpeg('./temp/unaimagen.jpg')
    .output('nuevaimagen2.jpg')
    .complexFilter([
        {
            filter: 'drawtext',
            options: {
              // fontfile: this.config.fontFile.path+this.config.fontFile.fileName,
              text: 'VERY LONG TEXT VERY VERY VERY VERY LOL!!!',
              fontsize: 36,
              fontcolor: 'white',
              x: '(main_w/2-text_w/2)',
              y: '(text_h/2)+15',
              shadowcolor: 'black@0.7',
              shadowx: 1,
              shadowy: 1
            }
          }
     ])
  .on("start", function (commandLine) {
    console.log('Spawned ffmpeg with command: ' + commandLine);
    })
    .on('end', function () {
        console.log('files have been merged succesfully');
    })
    .on("error", function (err) {
        console.log(err)
        return err.message
        console.log("Error occurred during merging: " + err.message)
    })
    .run()
}

 //test();


 function video(){
    console.log('entra')
    const tempPath = './temp/';
    const file = 'test.mp4';
    const newFile='salida.mp4';
    const tempFilePath = tempPath+file;
    console.log(tempFilePath)
    const targetTempFilePath = tempPath+newFile;
    const watermark = true;
    const domainModel = 'www.myladydusha.com';
    const addWatermark = watermark ? domainModel : '';
    let count=0;
    ffmpeg(tempFilePath)
        .on('progress',async (progress)=>{
            if(progress.percent){
                console.log(progress.percent, count);
            }
        })
        .on('end', function () {
            console.log('files have been merged succesfully');
        })
        .on("error", function (err) {
            console.log(err)
        })
        // .setFfmpegPath(ffmpeg_static.path)
        .videoBitrate(1850)
        .videoCodec('libx264')
        .format('mp4')
        // .withSize('1080x?')
        .complexFilter([
            // {
            //     fi
            // }
            {
                filter: 'drawtext',
                options: {
                fontfile: './courier-bold.ttf',
                text: addWatermark,
                fontsize: 24,
                fontcolor: 'white',
                x: '(w-text_w)/2',
                y: 'h-th-10',
                shadowcolor: 'black@0.7',
                shadowx: 1,
                shadowy: 1
                }
            }
        ])
        .output(targetTempFilePath)
        .run()
}

video()