import { DirectLine } from 'botframework-directlinejs';
import ChatBox from './chat';
import { Route, useParams } from "react-router-dom";

const ChatContainer = () => {
  let { id, name , avatar } = useParams();
  
  const defaultId = 'yFLWlpeK3CI.cwA.r18.M9VxoEcUnMthu5zsWX2Ox95r5YCcvbC_GvPJooRM0sQ';
  const defaultName = 'Bobby McBot';
  const defaultAvatar = 'https://demos.telerik.com/kendo-ui/content/chat/HealthCareBot.png'
  const client = new DirectLine({
    secret: id? id :defaultId,
  });

  const user = {
    id: '1',
    name: 'John',
  };
  const bot = {
    id: '0',
    name: name ? name : defaultName,
    avatarUrl:avatar ? unescape(avatar) : defaultAvatar,
  };
  return <ChatBox client={client} bot={bot} user={user} />;
};

export default ChatContainer