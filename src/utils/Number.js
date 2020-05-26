import BigNumber from "bignumber.js"

export class Number {
  /***
   * format num to BTM
   * @returns number
   */
  static formatNue(num, dec, exp) {
    let n = new BigNumber(num);
    if(!exp){
      exp = dec
    }

    let result = n

    return result.toFormat(dec);
  }

  /***
   * convert num to Nue
   * @returns number
   */
  static convertToNue(num, dec) {
    let n = new BigNumber(num);
    let base = new BigNumber(10).exponentiatedBy(dec)

    let result = n.multipliedBy(base)

    return result.toNumber().toFixed(0) ;
  }

  /***
   * format num to percent
   * @returns percentage
   */
  static fractionalNum(upper, lower) {
    let n = new BigNumber(upper).div(lower);

    let result = n.shiftedBy(2).decimalPlaces(2)
    return result+'%';
  }

  /***
   * format num to currency value
   * @returns percentage
   */
  static formatCurrency(num, type) {
    let n = new BigNumber(num);
    switch(type){
      case "in_cny":
        return `¥ ${n.toFormat(2)}`
      case "in_usd":
        return `$ ${n.toFormat()}`
      case "in_btc":
        return `₿ ${n.toFormat()}`
      default:
        return `¥ ${n.toFormat(2)}`
    }
  }

}

export default Number;
