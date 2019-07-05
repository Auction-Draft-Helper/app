import React, { Component } from 'react'

class NominatedPlayerButton extends  Component {
  render() {
    const {
      buttonClasses,
      clickFunction,
      iconName,
      text,
      value
    } = this.props;
    return (
      <button
        type="submit"
        className={`ui ${buttonClasses ? buttonClasses + " " : ""}button`}
        onClick={value ? (event) => clickFunction(event.target.value) : () => clickFunction()}
        value={value}
      >
        <div className="visible content white">{text}</div>
        <div className="hidden content">
          <i className={iconName + " icon white"} />
        </div>
      </button>
    )
  }
}

export default NominatedPlayerButton;
