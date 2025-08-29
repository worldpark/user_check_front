import {useRef, useState} from "react";
import {EventSourcePolyfill} from "event-source-polyfill";
import {useSelector} from "react-redux";

const ChatUI = () => {
    const [chatInputText, setChatInputText] = useState('');
    const [chatDisable, setChatDisable] = useState(false);
    const messageListRef = useRef(null);
    const inputArea = useRef(null);

    const loginInfo = useSelector((state) => state.loginInfo);

    const chatInput = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            submitMessage();
        }
    }

    const submitMessage = () => {
        if(chatInputText == ''){
            alert('채팅을 입력해주세요.');
        }else{
            let userDivElement = addMessageElement(true);
            userDivElement.innerText = chatInputText;

            setChatInputText('');
            setChatDisable(true);
            let responseDiv = addMessageElement(false);
            getRagResponse(chatInputText, responseDiv);
            setChatDisable(false);
        }
    }

    const addMessageElement = (userType) => {

        let messageBubbleElement = document.createElement('div');
        messageBubbleElement.className = 'chat-bubble';

        let messageElement = document.createElement('div');

        if(userType){
            messageElement.className = 'chat chat-end';
        }else{
            messageElement.className = 'chat chat-start';
        }

        messageElement.append(messageBubbleElement);
        messageListRef.current.append(messageElement);

        messageBubbleElement.innerText = '응답 생성중.....';
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;

        return messageBubbleElement;
    }

    const getRagResponse = (message, responseDiv) => {
        const eventSource = new EventSourcePolyfill(import.meta.env.VITE_WEB_URL + "/api/assistant?message=" + message, {
            headers:{
                Authorization: 'Bearer ' + loginInfo.token
            },
            withCredentials: true
        });

        responseDiv.innerText = '';

        eventSource.onmessage = (event) => {

            if(event.data === '__END__'){

                eventSource.close();
                return;
            }
            responseDiv.innerText += event.data;
        }

        eventSource.onerror = (error) => {
            responseDiv.innerText = '응답 생성에 실패했습니다.';
            console.log(error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }

    return(
        <>
            <div className='h-[70%] px-5 overflow-y-scroll' ref={messageListRef}>
                <div className="chat chat-start">
                    <div className="chat-bubble">
                        안녕하세요. 시스템 도우미입니다. 시스템에 대해서 궁금한 점을 물어보세요.
                    </div>
                </div>
            </div>

            <div className='h-[30%] p-2 flex'>
                <textarea className="textarea w-full h-[100%] resize-none"
                          ref={inputArea}
                          placeholder="채팅 입력 후 Enter"
                          value={chatInputText}
                          disabled={chatDisable}
                          onChange={(e) => setChatInputText(e.target.value)}
                          onKeyDown={(e) => chatInput(e)}>
                </textarea>
                <button className="btn ml-2 h-full" onClick={() => submitMessage()}>
                    전송
                </button>
            </div>

        </>
    )
}

export default ChatUI;