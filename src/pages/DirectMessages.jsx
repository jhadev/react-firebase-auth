import React from 'react';
import { withAuthorization } from '../components/Session';
import { INITIAL_STATE, reducer } from '../reducers/dmReducer';
import { useChat } from '../hooks/useChat';
import Row from '../components/common/Row';
import Column from '../components/common/Column';
import Container from '../components/common/Container';
import ChatList from '../components/ChatList';
import MessageForm from '../components/MessageForm';
import click from '../sounds/click.mp3';
const clickSound = new Audio(click);

const DirectMessages = ({ firebase }) => {
  // destructure individual state values, dispatch, and authUser from useChat return array
  // initialize it with imported reducer and initial state, firebase prop, and type for effect switch.
  const [{ users, chat, userToDm }, dispatch, authUser, handleLayout] = useChat(
    reducer,
    INITIAL_STATE,
    firebase,
    'dms'
  );

  // pass down scroll funcs as props from here, useScroll takes array to track and max length to stop smooth scroll
  // const { scrollToBottom, scrollToTop } = useScroll(chat, 50);

  const setChatRoom = event => {
    const { value } = event.target;
    dispatch({ type: 'SET_USER_TO_DM', userToDm: value });
    clickSound.play();
  };

  // filter authUser from list can't dm yourself
  const handleDmList = arr => {
    return arr.filter(({ email }) => email !== authUser.email);
  };

  const usersButNotAuthUser = handleDmList(users);

  return (
    <>
      <div className="space">
        <Container>
          <Row helper="mt-4">
            <Column size="12 md-3">
              <div className="sticky-top">
                <div id="spacer" />
                <h6 className="text-center">
                  You are chatting with:{' '}
                  <p className="mt-1 font-italic">
                    {userToDm !== '' ? userToDm : 'yourself'}
                  </p>
                </h6>
                <ChatList
                  rooms={usersButNotAuthUser}
                  setChatRoom={setChatRoom}
                  currentRoom={userToDm}
                  dms
                />
                <div id="space-last-seen" />
              </div>
            </Column>
            <Column size="12 md-9">
              <div className="wrapper">
                <div id="spacer" />
                <div className="mt-5">
                  {chat.length > 0 ? (
                    chat.map((message, idx) => handleLayout(message, idx))
                  ) : (
                    <h3 className="text-center">
                      {userToDm !== '' ? (
                        'No messages with this user yet.'
                      ) : (
                        <>
                          <p>Select a user to chat with...</p>
                          <p>or talk to yourself.</p>
                        </>
                      )}
                    </h3>
                  )}
                </div>
              </div>
            </Column>
          </Row>
        </Container>
      </div>
      <div className="sticky-footer">
        <Container>
          <MessageForm
            username={authUser.email}
            uid={authUser.uid}
            rooms={usersButNotAuthUser}
            receiver={userToDm}
            setChatRoom={setChatRoom}
            currentRoom={'dms'}
            chat={chat}
            firebase={firebase}
            dms
          />
        </Container>
      </div>
      <div id="bottom" />
    </>
  );
};

//condition for authuser check to restrict routes. If user isn't authorized, home is off limits
const condition = authUser => !!authUser;

export default withAuthorization(condition)(DirectMessages);
