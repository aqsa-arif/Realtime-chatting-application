

const getOriginalFileName = (filePath) => { 
    const decodedResponse = decodeURIComponent(filePath);
    const fileName = decodedResponse.substring(decodedResponse.lastIndexOf('/') + 1);
    const replacedFileName = fileName.replace(/%20/g, ' ');
    return  replacedFileName;
}

export default getOriginalFileName;