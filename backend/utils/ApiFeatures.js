const { get } = require("mongoose");

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

  /**
   * @method search for product searching using keyword available in name
   * @returns Mongoose query object
   */
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

  filter() {
    let queryString = { ...this.queryString };
    // removing some fields which are not needed to filter
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryString[key]);

    // filter for price and rating range
    // adding $ in key for mongoose query like {"price":{"gt":"12000"}} => {"price":{"$gt":"12000"}}
    queryString = JSON.stringify(queryString);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );

    queryString = JSON.parse(queryString);
    this.query = this.query.find(queryString);
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = currentPage * (resultPerPage - 1);

    return this;
  }
}

module.exports = ApiFeatures;
