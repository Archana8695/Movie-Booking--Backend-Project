module.exports = (mongoose) => {
    const Users = mongoose.model(
      "Users",
      mongoose.Schema({
        userid: Number,
        email: String,
        first_name: String,
        last_name: String,
        username: String,
        contact: String,
        password: String,
        role: String,
        isLoggedIn: {
          type: Boolean,
        default: false,
      },
        uuid: String,
        accesstoken: String,
        coupens: [
          {
            id: Number,
            discountValue: Number,
          },
        ],
        bookingRequests: [
          {
            reference_number: Number,
            coupon_code: Number,
            show_id: Number,
            tickets: [Number],
          },
        ],
      })
    );
    return Users;
  };