import {Stomp} from "@stomp/stompjs";
import SockJS from 'sockjs-client/dist/sockjs';

let stompClient = null;

export const socketOpen = (url, token, result) => {
    const socket = new SockJS(url);

    stompClient = Stomp.over(socket);

    stompClient.connect(
        {Authorization: token},
        () => {
            stompClient.subscribe("/topic/public", (message) => {
                const msg = JSON.parse(message.body);
                result(msg);
            });
        }, (error) => {
            console.error(error);
        }
    )
}

export const messageSend = (sender, content) => {
    if(stompClient && stompClient.connected){
        let message = {
            sender: sender,
            content: content
        }

        stompClient.send("/app/chat.send", {}, JSON.stringify(message));
    }
}

export const socketClose = () => {
    if(stompClient && stompClient.connected){
        stompClient.disconnect(() => {
        });
    }
}

