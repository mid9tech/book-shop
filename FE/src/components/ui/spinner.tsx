// components/Spinner.js
import React from "react";
import PropTypes from "prop-types";

const Spinner = ({ size = 50 }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="border-4 border-t-blue-500 border-transparent rounded-full animate-spin"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.number,
};

export default Spinner;
