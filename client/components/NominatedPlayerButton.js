import React, { Component } from 'react'

class NominatedPlayerButton extends  Component {
  render() {
    const {
      buttonColor,
      clickFunction,
      iconName,
      text,
      value
    } = this.props;
    return (
      <button
        type="submit"
        className={`ui animated ${buttonColor} button`}
        onClick={value ? (event) => clickFunction(event.target.value) : () => clickFunction()}
        value={value}
      >
        <div className="visible content white">{text}</div>
        <div className="hidden content">
          <i className={`${iconName} icon white`} />
        </div>
      </button>
    )
  }
}

export default NominatedPlayerButton;
