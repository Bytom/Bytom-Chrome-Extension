import bytom from "./bytom";

let query = {};

query.chainStatus = function() {
  return bytom.query.getVoteStatus();
};

query.blockStatus = function() {
  return bytom.query.getblockcount();
};

export default query;
