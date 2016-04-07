var Canvas2Image=function(){function scaleCanvas(canvas,width,height){var w=canvas.width,h=canvas.height;void 0==width&&(width=w),void 0==height&&(height=h);var retCanvas=document.createElement("canvas"),retCtx=retCanvas.getContext("2d");return retCanvas.width=width,retCanvas.height=height,retCtx.drawImage(canvas,0,0,w,h,0,0,width,height),retCanvas}function getDataURL(canvas,type,width,height){return canvas=scaleCanvas(canvas,width,height),canvas.toDataURL(type)}function saveFile(strData){document.location.href=strData}function genImage(strData){var img=document.createElement("img");return img.src=strData,img}function fixType(type){type=type.toLowerCase().replace(/jpg/i,"jpeg");var r=type.match(/png|jpeg|bmp|gif/)[0];return"image/"+r}function encodeData(data){if(!window.btoa)throw"btoa undefined";var str="";if("string"==typeof data)str=data;else for(var i=0;i<data.length;i++)str+=String.fromCharCode(data[i]);return btoa(str)}function getImageData(canvas){var w=canvas.width,h=canvas.height;return canvas.getContext("2d").getImageData(0,0,w,h)}function makeURI(strData,type){return"data:"+type+";base64,"+strData}var $support=function(){var canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");return{canvas:!!ctx,imageData:!!ctx.getImageData,dataURL:!!canvas.toDataURL,btoa:!!window.btoa}}(),downloadMime="image/octet-stream",genBitmapImage=function(oData){var biWidth=oData.width,biHeight=oData.height,biSizeImage=biWidth*biHeight*3,bfSize=biSizeImage+54,BITMAPFILEHEADER=[66,77,255&bfSize,bfSize>>8&255,bfSize>>16&255,bfSize>>24&255,0,0,0,0,54,0,0,0],BITMAPINFOHEADER=[40,0,0,0,255&biWidth,biWidth>>8&255,biWidth>>16&255,biWidth>>24&255,255&biHeight,biHeight>>8&255,biHeight>>16&255,biHeight>>24&255,1,0,24,0,0,0,0,0,255&biSizeImage,biSizeImage>>8&255,biSizeImage>>16&255,biSizeImage>>24&255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],iPadding=(4-3*biWidth%4)%4,aImgData=oData.data,strPixelData="",biWidth4=biWidth<<2,y=biHeight,fromCharCode=String.fromCharCode;do{for(var iOffsetY=biWidth4*(y-1),strPixelRow="",x=0;biWidth>x;x++){var iOffsetX=x<<2;strPixelRow+=fromCharCode(aImgData[iOffsetY+iOffsetX+2])+fromCharCode(aImgData[iOffsetY+iOffsetX+1])+fromCharCode(aImgData[iOffsetY+iOffsetX])}for(var c=0;iPadding>c;c++)strPixelRow+=String.fromCharCode(0);strPixelData+=strPixelRow}while(--y);var strEncoded=encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER))+encodeData(strPixelData);return strEncoded},saveAsImage=function(canvas,width,height,type){if($support.canvas&&$support.dataURL)if("string"==typeof canvas&&(canvas=document.getElementById(canvas)),void 0==type&&(type="png"),type=fixType(type),/bmp/.test(type)){var data=getImageData(scaleCanvas(canvas,width,height)),strData=genBitmapImage(data);saveFile(makeURI(strData,downloadMime))}else{var strData=getDataURL(canvas,type,width,height);saveFile(strData.replace(type,downloadMime))}},convertToImage=function(canvas,width,height,type){if($support.canvas&&$support.dataURL){if("string"==typeof canvas&&(canvas=document.getElementById(canvas)),void 0==type&&(type="png"),type=fixType(type),/bmp/.test(type)){var data=getImageData(scaleCanvas(canvas,width,height)),strData=genBitmapImage(data);return genImage(makeURI(strData,"image/bmp"))}var strData=getDataURL(canvas,type,width,height);return genImage(strData)}};return{saveAsImage:saveAsImage,saveAsPNG:function(canvas,width,height){return saveAsImage(canvas,width,height,"png")},saveAsJPEG:function(canvas,width,height){return saveAsImage(canvas,width,height,"jpeg")},saveAsGIF:function(canvas,width,height){return saveAsImage(canvas,width,height,"gif")},saveAsBMP:function(canvas,width,height){return saveAsImage(canvas,width,height,"bmp")},convertToImage:convertToImage,convertToPNG:function(canvas,width,height){return convertToImage(canvas,width,height,"png")},convertToJPEG:function(canvas,width,height){return convertToImage(canvas,width,height,"jpeg")},convertToGIF:function(canvas,width,height){return convertToImage(canvas,width,height,"gif")},convertToBMP:function(canvas,width,height){return convertToImage(canvas,width,height,"bmp")}}}();