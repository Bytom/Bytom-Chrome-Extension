import BigNumber from "bignumber.js"

export class Number {
  /***
   * format num to BTM
   * @returns number
   */
  static formatNue(num) {
    let n = new BigNumber(num);
    let base = new BigNumber(100000000)

    let result = n.dividedBy(base)

    return result.toFormat();
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

}

export default Number;
