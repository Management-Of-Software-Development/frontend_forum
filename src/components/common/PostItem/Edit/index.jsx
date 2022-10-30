import { Button, Input, Modal } from "antd";
import { convertToRaw, EditorState, ContentState, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";

const { TextArea } = Input;

const Edit = ({ id, content, setContent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (content) {
      const blocks = convertFromHTML(content);
      const state = ContentState.createFromBlockArray(
        blocks.contentBlocks,
        blocks.entityMap
      );
      setValue(EditorState.createWithContent(state));
    }
  }, [content]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [value, setValue] = useState(EditorState.createEmpty());

  const convertToHtml = (s) => {
    const rawState = convertToRaw(s);
    return draftToHtml(rawState);
  };

  const handleEditPost = () => {
    const html = convertToHtml(value.getCurrentContent());
    setContent(html);
    handleCancel();
  };

  return (
    <>
      <a onClick={showModal} style={{ color: "blue" }} key="list-loadmore-edit">
        Edit
      </a>
      <Modal
        title="Edit Post Content"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            form="edit-post-form"
            onClick={handleEditPost}
            key="submit"
            htmlType="submit"
          >
            Submit
          </Button>,
        ]}
      >
        <Editor
          editorClassName="new-post-editor"
          wrapperClassName="new-post-wrapper"
          toolbarClassName="new-post-toolbar"
          editorState={value}
          onEditorStateChange={(e) => setValue(e)}
        />
      </Modal>
    </>
  );
};

export default Edit;
