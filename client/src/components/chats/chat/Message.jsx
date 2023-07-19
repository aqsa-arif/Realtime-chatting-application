import { Avatar, Box,  CardMedia, Typography } from '@mui/material'
import React, { useContext, useState, useEffect } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import pdf from '../../../images/pdf.png';
import file from '../../../images/file.png';
import word from '../../../images/word.png';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import styleTime from '../StyleTime';
import getOriginalFileName from '../FormatFileName';


const Message = ({ message }) => {
  console.log(message.value);

  const { account } = useContext(AccountContext);
  const [isDownloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const isFileDownloaded = localStorage.getItem(message.value); // Access with key -> imagePath or file/image url
    if (isFileDownloaded) {
      setDownloaded(true);
    }
  }, [message.value]);

//  when the download attribute is present on an anchor tag and set to a valid filename, it changes the behavior of the anchor tag. Instead of following the link, the browser interprets it as a directive to download the linked resource as a file.
  const downloadfile = (e, imagePath ) => {
    // prevents the default behavior of an event, in this case, preventing the default behavior of a click event on an anchor tag. It ensures that the event does not trigger the default action, which would be following the link.
    e.preventDefault();
    try {
        fetch(imagePath)
        .then(resp => resp.blob())  //  converts the response object (resp) into a Blob object, which represents the binary data of the file.
        .then(blob => {
            const url = window.URL.createObjectURL(blob);  // generates a unique URL that represents the file data stored in the Blob object. This URL is not the actual file URI, but rather a temporary URL that points to the binary data of the file.
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;

            const nameSplit = imagePath.split("/");  // creates array of strings or path segments
            const duplicateName = nameSplit.pop();   //  removes the last path segment from the array (nameSplit.pop()), It extracts the filename from the path.

            a.download =  duplicateName;  // sets the download attribute of the <a> element to the extracted filename. When the user clicks on the anchor link to download the file, the browser will use the value of the download attribute as the default filename for the downloaded file.
            document.body.appendChild(a);
            a.click();  // programmatically triggers a click event on the <a> element, simulating a user click. It initiates the file download
            window.URL.revokeObjectURL(url);    //  releases the temporary URL created with createObjectURL, freeing up memory resources.

            setDownloaded(true);
            localStorage.setItem(imagePath, 'downloaded'); // key, value
        })
        .catch((error) => console.log('Error while downloading the image ', error))

    } 
    catch (error) {
        console.log('Error while downloading the image ', error);
    }

  }

  return (
    <>

      {
        account.sub === message.senderId ?

          <>
            {
              message.type === 'file'
                ?
                <>
                  {
                    message?.value?.includes('.PNG') || message?.value?.includes('.JPG') ||  message?.value?.includes('.png') || message?.value?.includes('.jpg') ||  message?.value?.includes('.mp4') ||  message?.value?.includes('.mp3') || message?.value?.includes('.MP4') || message?.value?.includes('.MP3')   
                      ?
                      <Box sx={{
                        marginLeft: 'auto',
                        borderRadius: '7.5px',
                        width: '33rem',
                        maxWidth: '60%',
                        backgroundColor: '#d9fdd3',
                        padding: '.5rem',
                        display: 'flex', 
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: '.5rem',
                        boxShadow: '0 1px 0.5px rgba(11,20,26,.13)',
                        position: 'relative',
                      }}>
                        {
                                message?.value?.includes('.mp4') ||  message?.value?.includes('.mp3') || message?.value?.includes('.MP4') || message?.value?.includes('.MP3')   
                                ?
                                <CardMedia
                                component='video'
                                src={message.value}
                                alt='video'   
                                muted
                                autoPlay
                               />
                               :
                               <Avatar src={message.value} alt="Image" variant='square'
                               sx={{
                                 width: '100%',
                                 height: '28.9rem',
                               }}></Avatar> 
                            }

                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}>
                          {
                            !isDownloaded  &&  <DownloadForOfflineOutlinedIcon 
                            onClick={(e) => {
                             downloadfile(e, message.value); 
                            }}
                            sx={{
                             width: '2.5rem', height: '2.5rem',
                             color: '#000',
                             opacity: '.5',
                             cursor: 'pointer',
                             marginBottom: '1.7rem',
                             position: 'absolute',
                             bottom: '1.5rem',
                             right: '1.7rem',
                           }} />
                          }
                         
                          <Typography sx={{
                            marginLeft: '8px',
                            color: '#000',
                            wordBreak: 'normal',
                            fontFamily: 'Segoe UI',
                            position: 'absolute',
                            bottom: '1rem',
                            right: '1.7rem',
                          }} >
                            {styleTime(message.createdAt)}
                          </Typography>

                        </Box>
                      </Box>
                      :
                      <Box sx={{
                        marginLeft: 'auto',
                        borderRadius: '7.5px',
                        width: '33rem',
                        maxWidth: '60%',
                        backgroundColor: '#d9fdd3',
                        padding: '1.3rem 1.9rem',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: '.5rem',
                        boxShadow: '0 1px 0.5px rgba(11,20,26,.13)',
                        position: 'relative',
                      }}>

                        <Box sx={{
                          display: 'flex',
                          gap: '1rem',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                        }} >

                          <Avatar src={message?.value?.includes('.pdf') ? pdf : 
                            message?.value?.includes('.docx') ? word : file } 
                           alt="PDF File" variant='square' sx={{
                            width: '2.6rem', height: '3rem',
                          }} ></Avatar>

                          <Typography sx={{
                            wordBreak: 'break-word',
                            fontSize: '14.2px',
                            lineHeight: '19px',
                            color: '#111b21',
                            fontFamily: 'Segoe UI',
                            fontWeight: '400',
                          }}>
                            {message?.value && getOriginalFileName(message.value)}
                          </Typography>

                        </Box>

                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}>

                          {
                            !isDownloaded  &&  <DownloadForOfflineOutlinedIcon 
                            onClick={(e) => {
                             downloadfile(e, message.value); 
                            }}
                            sx={{
                              width: '2.5rem', height: '2.5rem',
                              color: '#54656F',
                              opacity: '.5',
                              cursor: 'pointer',
                              marginBottom: '1.7rem',
                           }} />
                          } 

                          <Typography sx={{
                            marginLeft: '8px',
                            color: '#667781',
                            wordBreak: 'normal',
                            fontFamily: 'Segoe UI',
                            position: 'absolute',
                            bottom: '1rem',
                            right: '1.7rem',
                          }} >
                            {styleTime(message.createdAt)}
                          </Typography>

                        </Box>

                      </Box>
                  }
                </>
                :

                <Box sx={{
                  marginLeft: 'auto',
                  borderRadius: '7.5px',
                  maxWidth: '75%',
                  width: 'fit-content',
                  backgroundColor: '#d9fdd3',
                  padding: '.9rem .8rem .8rem .8rem',
                  wordBreak: 'break-word',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '.5rem',
                  boxShadow: '0 1px 0.5px rgba(11,20,26,.13)',
                }}>

                  <Typography sx={{
                    fontSize: '14.2px',
                    lineHeight: '19px',
                    color: '#111b21',
                    fontFamily: 'Segoe UI',
                    fontWeight: '400',
                  }}>
                    {message.value}
                  </Typography>

                  <Typography sx={{
                    marginLeft: '8px',
                    marginBottom: '-.5rem',
                    color: '#667781',
                    wordBreak: 'normal',
                    marginTop: 'auto',
                    fontFamily: 'Segoe UI',
                  }} >
                    {styleTime(message.createdAt)}
                  </Typography>

                </Box>
            }
          </>

          :

          <>
            {
              message.type === 'file'
                ?
                <>
                  {
                    message?.value?.includes('.PNG') || message?.value?.includes('.JPG')  ||  message?.value?.includes('.png') || message?.value?.includes('.jpg')  || message?.value?.includes('.mp4') ||  message?.value?.includes('.mp3') || message?.value?.includes('.MP4') || message?.value?.includes('.MP3')

                      ?  

                      <Box sx={{
                        marginRight: 'auto',
                            borderRadius: '7.5px',
                            width: '33rem',
                            maxWidth: '60%',
                            backgroundColor: '#fff',
                            padding: '.5rem',
                            display: 'flex', 
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            marginBottom: '.5rem',
                            boxShadow: '0 1px 0.5px rgba(11,20,26,.13)',
                            position: 'relative',
                          }}>
                            {
                                message?.value?.includes('.mp4') ||  message?.value?.includes('.mp3') || message?.value?.includes('.MP4') || message?.value?.includes('.MP3')   
                                ?
                                <CardMedia
                                component='video'
                                src={message.value}
                                alt='video'   
                                muted
                                autoPlay
                               />
                               :
                               <Avatar src={message.value} alt="Image" variant='square'
                               sx={{
                                 width: '100%',
                                 height: '28.9rem',
                               }}></Avatar> 
                            }
                           
                            <Box sx={{
                              display: 'flex',
                              flexDirection: 'column',
                            }}>

                              {
                                !isDownloaded && <DownloadForOfflineOutlinedIcon 
                                onClick={(e) => downloadfile(e, message.value) }
                                sx={{
                                  width: '2.5rem', height: '2.5rem',
                                  color: '#000',
                                  opacity: '.5',
                                  cursor: 'pointer',
                                  marginBottom: '1.7rem',
                                  position: 'absolute',
                                  bottom: '1.5rem',
                                  right: '1.7rem',
                                }} />
                              }
                              
                              <Typography sx={{
                                marginLeft: '8px',
                                color: '#000',
                                wordBreak: 'normal',
                                fontFamily: 'Segoe UI',
                                position: 'absolute',
                                bottom: '1rem',
                                right: '1.7rem',
                              }} >
                                {styleTime(message.createdAt)}
                              </Typography>

                            </Box>

                      </Box> 



                      :

                      <Box sx={{
                        marginRight: 'auto',
                        borderRadius: '7.5px',
                        width: '33rem',
                        maxWidth: '60%',
                        backgroundColor: '#fff',
                        padding: '1.3rem 1.9rem',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: '.5rem',
                        boxShadow: '0 1px 0.5px rgba(11,20,26,.13)',
                        position: 'relative',
                      }}>

                        <Box sx={{
                          display: 'flex',
                          gap: '1rem',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                        }} >
                          
                          <Avatar src={file} alt="PDF File" variant='square' sx={{
                            width: '2.6rem', height: '3rem',
                          }} ></Avatar>

                          <Typography sx={{
                            wordBreak: 'break-word',
                            fontSize: '14.2px',
                            lineHeight: '19px',
                            color: '#111b21',
                            fontFamily: 'Segoe UI',
                            fontWeight: '400',
                          }}>
                            {message?.value && getOriginalFileName(message.value)}
                          </Typography>

                        </Box>

                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}>

                          {
                            !isDownloaded && <DownloadForOfflineOutlinedIcon 
                            onClick={(e) => downloadfile(e, message.value) }
                            sx={{
                              width: '2.5rem', height: '2.5rem',
                              color: '#54656F',
                              opacity: '.5',
                              cursor: 'pointer',
                              marginBottom: '1.7rem',
                            }} />
                          }
                          
                          <Typography sx={{
                            marginLeft: '8px',
                            color: '#667781',
                            wordBreak: 'normal',
                            fontFamily: 'Segoe UI',
                            position: 'absolute',
                            bottom: '1rem',
                            right: '1.7rem',
                          }} >
                            {styleTime(message.createdAt)}
                          </Typography>

                        </Box>

                      </Box>
                  }
                </>
                :

                  
                    <Box sx={{
                      marginRight: 'auto',
                      borderRadius: '7.5px',
                      maxWidth: '75%',
                      width: 'fit-content',
                      backgroundColor: '#fff',
                      padding: '.9rem .8rem .8rem .8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '.5rem',
                      boxShadow: '0 1px 0.5px rgba(11,20,26,.13)',
                    }}>

                      <Typography sx={{
                        overflowWrap: 'breakWord',
                        fontSize: '14.2px',
                        lineHeight: '19px',
                        color: '#111b21',
                        fontFamily: 'Segoe UI',
                        fontWeight: '400',
                      }}>
                        {message.value}
                      </Typography>

                      <Typography sx={{
                        marginLeft: '8px',
                        marginBottom: '-.5rem',
                        color: '#667781',
                        overflowWrap: 'normal',
                        marginTop: 'auto',
                        fontFamily: 'Segoe UI',
                      }} >
                        {styleTime(message.createdAt)}
                      </Typography>

                    </Box>

 
            }
          </>



      }

    </>


  )
}

export default Message
