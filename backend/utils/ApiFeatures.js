/**
 * @class ApiFeature
 * @constructor takes two params
 * @param query : mongoose query object
 * @param queryString : serach, filter, pagination criteria
 * @method search : to search a keyword from a query
 * @returns query function
 */
class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i", // i stands for case insinsitive
          },
        }
      : {};
    this.query = this.query.find(keyword);
    return this;
  }
}

module.exports = ApiFeatures;
