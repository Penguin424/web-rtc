import React from "react";

interface IPropsConversationButton {
  handleClick: () => Promise<void>;
  children: React.ReactNode;
}

const ConversationButton = ({
  handleClick,
  children,
}: IPropsConversationButton) => {
  return (
    <div
      onClick={handleClick}
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "40px",
        border: "2px solid #e6e5e8",
        textDecoration: "none",
        backgroundColor: "#282C34",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
        boxShadow: "none",
        borderImage: "none",
        borderStyle: "none",
        borderWidth: "0px",
        outline: "none",
      }}
    >
      {children}
    </div>
  );
};

export default ConversationButton;
