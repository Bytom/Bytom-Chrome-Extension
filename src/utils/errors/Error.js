import * as ErrorTypes from './ErrorTypes'

export const ErrorCodes = {
  NO_SIGNATURE:402,
  FORBIDDEN:403,
  TIMED_OUT:408,
  LOCKED:423,
  TOO_MANY_REQUESTS:429,
  TYPE_MISSED:411,
  TYPE_DUPLICATE:405,
  TYPE_DISAUTH:401
};

export default class Error {

  constructor(_type, _message, _code = ErrorCodes.LOCKED){
    this.type = _type;
    this.message = _message;
    this.code = _code;
    this.isError = true;
  }

  static locked(){
    return new Error(ErrorTypes.LOCKED, "The user's Bytom is locked. They have been notified and should unlock before continuing.")
  }

  static duplicate(_type){
    return new Error(ErrorTypes.TYPE_DUPLICATED, `The current value has been set to '${_type}', please select another parameter.`, ErrorCodes.TYPE_DUPLICATE)
  }

  static disauth(){
    return new Error(ErrorTypes.TYPE_DISAUTH, `The current domain is no auth, it can't be disauth`, ErrorCodes.TYPE_DISAUTH)
  }

  static promptClosedWithoutAction(){
    return new Error(ErrorTypes.PROMPT_CLOSED, "The user closed the prompt without any action.", ErrorCodes.TIMED_OUT)
  }

  static signatureError(_type, _message){
    return new Error(_type, _message, ErrorCodes.NO_SIGNATURE)
  }

  static typeMissed(_type){
    return new Error(ErrorTypes.TYPE_MISSED, `Parameter '${_type}' is missing, please add the Parameter '${_type}'.`)
  }

  static identityMissing(){
    return this.signatureError("identity_missing", "Identity no longer exists on the user's keychain");
  }

  static signatureAccountMissing(){
    return this.signatureError("account_missing", "Missing required accounts, repull the identity");
  }

  static malformedRequiredFields(){
    return this.signatureError("malformed_requirements", "The requiredFields you passed in were malformed");
  }

  static usedKeyProvider(){
    return new Error(
      ErrorTypes.MALICIOUS,
      "Do not use a `keyProvider` with a Bytom. Use a `signProvider` and return only signatures to this object. A malicious person could retrieve your keys otherwise.",
      ErrorCodes.NO_SIGNATURE
    )
  }

}
