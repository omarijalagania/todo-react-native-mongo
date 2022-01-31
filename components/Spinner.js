import * as Progress from "react-native-progress";

import React from "react";

const Spinner = () => {
  return <Progress.Bar indeterminate={true} progress={0.4} width={null} />;
};

export default Spinner;
