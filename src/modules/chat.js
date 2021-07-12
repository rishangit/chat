import React from 'react';
import { Chat, HeroCard } from '@progress/kendo-react-conversational-ui';
import { Calendar } from '@progress/kendo-react-dateinputs';

import * as AdaptiveCards from "adaptivecards";
import '@progress/kendo-theme-default/dist/all.css';

const ChatBox = ({ client, bot, user }) => {
  const [messages, setMessages] = React.useState([]);
  React.useEffect(() => {
    client.activity$.subscribe(activity => onResponse(activity));
  }, []);

  const аttachmentTemplate = props => {
    let attachment = props.item;

    if (attachment.contentType === 'application/vnd.microsoft.card.hero') {
      return (
        <HeroCard
          title={attachment.content.title || attachment.content.text}
          imageUrl={
            attachment.content.images ? attachment.content.images[0].url : ''
          }
          subtitle={
            attachment.content.subtitle
              ? attachment.content.subtitle
              : 'HealthCareBotService'
          }
          actions={attachment.content.buttons}
          onActionExecute={addNewMessage}
        />
      );
    } else if (attachment.type === 'calendar') {
      return (
        <Calendar
          onChange={event => {
            addNewMessage(event);
          }}
        />
      );
    } else {
      let adaptiveCard = new AdaptiveCards.AdaptiveCard();
      adaptiveCard.parse(attachment.content);
      let renderedCard = adaptiveCard.render();
      let htmlToinsert = {
        __html: renderedCard.innerHTML,
      };
      return <div dangerouslySetInnerHTML={htmlToinsert} />;
    }
  };

  const parseActions = actions => {
    if (actions !== undefined) {
      actions.actions.map(action => {
        if (action.type === 'imBack') {
          action.type = 'reply';
        }
      });
      return actions.actions;
    }

    return [];
  };

  const parseText = event => {
    if (event.action !== undefined) {
      return event.action.value;
    } else if (event.value) {
      return event.value;
    } else {
      return event.message.text;
    }
  };

  const onResponse = activity => {
    let newMessage;
    let dateRe = /date/i;

    if (activity.from.id === 'HealthCareBotService') {
      newMessage = {
        text: activity.text,
        author: bot,
        typing: activity.type === 'typing' ? true : false,
        timestamp: new Date(activity.timestamp),
        suggestedActions: parseActions(activity.suggestedActions),
        attachments: activity.attachments ? activity.attachments : [],
      };
      setMessages(oldMessages => [...oldMessages, newMessage]);
    }

    if (dateRe.test(activity.text)) {
      let newAttachments = [
        {
          type: 'calendar',
        },
      ];
      setMessages([
        ...messages,
        {
          author: bot,
          timestamp: new Date(activity.timestamp),
          attachments: newAttachments,
        },
      ]);
    }
  };

  const addNewMessage = event => {
    let value = parseText(event);
    client
      .postActivity({
        from: {
          id: user.id,
          name: user.name,
        },
        type: 'message',
        text: value,
      })
      .subscribe(
        id => console.log('Posted activity, assigned ID ', id),
        error => console.log('Error posting activity', error),
      );

    if (!event.value) {
      setMessages(oldMessages => [
        ...oldMessages,
        {
          author: user,
          text: value,
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <Chat
      messages={messages}
      user={user}
      onMessageSend={addNewMessage}
      attachmentTemplate={аttachmentTemplate}
    />
  );
};

export default ChatBox;
