import React from 'react';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import PropTypes from 'prop-types';

const MessageForm = ({
  message,
  setMsg,
  packageMsg,
  sendMessage,
  handleCloudinary,
  counter,
  handleDropdown,
  isOpen,
  rooms,
  setChatRoom,
  currentRoom
}) => {
  const widget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ['react-firebase-chat'],
        sources: ['local', 'url', 'image_search'],
        googleApiKey: process.env.REACT_APP_GOOGLE_IMAGE_SEARCH,
        defaultSource: 'local',
        multiple: false,
        folder: 'react_chat',
        clientAllowedFormats: ['png', 'gif', 'jpeg', 'jpg'],
        maxFileSize: 10000000,
        showUploadMoreButton: false
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log(result);
          if (message !== '') {
            handleCloudinary(`${message} ${result.info.secure_url}`);
          } else {
            handleCloudinary(result.info.secure_url);
          }
        }
      }
    );
  };

  const maxCount = 200;

  return (
    <>
      <div className="sticky-footer">
        <Form onSubmit={packageMsg}>
          <FormGroup id="messageForm" row>
            <Label for="chatInput" className="text-center" md={2} sm={2}>
              <div className="my-1">
                <Dropdown
                  direction="up"
                  size="sm"
                  group
                  isOpen={isOpen}
                  toggle={handleDropdown}
                >
                  <DropdownToggle caret>Choose Room</DropdownToggle>
                  <DropdownMenu>
                    {rooms.map(room => (
                      <DropdownItem
                        tag="button"
                        active={currentRoom === room ? true : false}
                        key={room}
                        value={room}
                        name={room}
                        onClick={setChatRoom}
                      >
                        {room}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
              {counter < maxCount
                ? (counter - maxCount).toString().slice(1)
                : 0}{' '}
              chars remaining
            </Label>
            <Col md={10} sm={12}>
              <InputGroup className="mt-2 mb-3" size="md">
                <InputGroupAddon onClick={widget} addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-camera" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="textarea"
                  name="text"
                  id="chatInput"
                  value={message}
                  onChange={setMsg}
                  onKeyUp={event =>
                    event.key === 'Enter' && counter <= maxCount
                      ? sendMessage()
                      : false
                  }
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText id="sendBtnInput">
                    <button
                      disabled={counter > maxCount}
                      className="btn font-weight-bold text-dark btn-link"
                    >
                      Send
                    </button>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};

MessageForm.propTypes = {
  message: PropTypes.string,
  setMsg: PropTypes.func,
  packageMsg: PropTypes.func,
  sendMessage: PropTypes.func,
  handleCloudinary: PropTypes.func,
  counter: PropTypes.number
};

export default MessageForm;
