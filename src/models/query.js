import bytom from "./bytom";

let query = {};

query.chainStatus = function() {
  return bytom.query.getVoteStatus();
};

export default query;
