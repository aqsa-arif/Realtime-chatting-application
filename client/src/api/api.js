import axios from 'axios'; 

const addUser = async (userInfo) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER}/api/users/addUser`,
            data: userInfo,
        })
        if(response) {
             console.log(response.data);
        }
        
    } catch (error) {
        console.log("Something went wrong", error);
    }
}


const getUsers = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/users/AllUsers`, 
        })
        if(response) {
            console.log(response.data);
            return response.data.users;
        }
        
    } catch (error) {
        console.log("Something went wrong", error);
    }
}



const addConversation = async (usersData) => {
    try {
        const {data} = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER}/api/chats/createConversation`,
            data: usersData,
        })
        if(data.success) {
            console.log(data);
            return data.conversation;
        }else{
            console.log(data);
            return data.existChat;
        }
        
    } catch (error) {
        console.log("Something went wrong", error);
    }
}


const sendMessage = async (message) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER}/api/chats/addMessage`,
            data: message,
        })
        if(response) {
            console.log(response.data);
        }
        
    } catch (error) {
        console.log("Something went wrong", error);
    }
}


const fetchAllMessages = async(id) => { 
    console.log(id);
    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/chats/getAllTexts/${id}`, 
        })
        if(response) {
            console.log(response.data);
           return  response.data ;
        }
        
    } catch (error) {
        console.log("Something went wrong", error);
    }
}
 

const directFile = async(data) => {  
    console.log(data);
    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER}/api/file/upload`, 
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
        if(response) {
           const result = response.data ;
           return result ;
        }
        
    } catch (error) {
        console.log("Something went wrong", error);
    }
}
 

export {addUser, getUsers, addConversation, sendMessage, fetchAllMessages, directFile };

