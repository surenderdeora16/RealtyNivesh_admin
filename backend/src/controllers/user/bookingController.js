const { encrypt } = require('../../helpers/utils');
const { DiscountCoupon, Booking, Retreat } = require('../../models');

exports.createBooking = async (req, res) => {
    try {
        let data = req.getBody(['retreat_id', 'single_occupancy', 'double_occupancy', 'triple_occupancy', 'currency', 'discount_code', 'type']);

        const retreat = await Retreat.findOne({ _id: data.retreat_id, deletedAt: null });
        if (!retreat) throw new Error('Invalid Retreat.');

        if (data.type == 1 && retreat.maximum_bookings <= retreat.booked) {
            throw new Error('Sorry, All seats are booked.');
        }

        const currency = data.currency === 1 ? 1 : 2;
        const singleOccupancyPrice = retreat.prices?.find(p => p?.occupancy_type === 1 && p?.currency === currency)?.amount || 0;
        const doubleOccupancyPrice = retreat.prices?.find(p => p?.occupancy_type === 2 && p?.currency === currency)?.amount || 0;
        const tripleOccupancyPrice = retreat.prices?.find(p => p?.occupancy_type === 3 && p?.currency === currency)?.amount || 0;

        data.sub_total = (data.single_occupancy * singleOccupancyPrice) + (data.double_occupancy * doubleOccupancyPrice) + (data.triple_occupancy * tripleOccupancyPrice);

        data.sub_total = Math.round(data.sub_total * 100) / 100;
        data.tax = Math.round((data.sub_total * parseFloat(process.env.TAX_RATE || 0) / 100) * 100) / 100;
        data.discount = 0;

        if (data.discount_code) {
            const discount = await DiscountCoupon.findOne({ code: data.discount_code, deletedAt: null });
            if (!discount) return res.status(404).json({ message: 'Discount code not valid !!' });

            if (discount.expaire_date < new Date()) throw new Error('Discount code has been expired.');

            if (data.sub_total < discount.min_cart_amount) {
                throw new Error(`Minimum cart amount should be ${data.currency === 1 ? 'Rs.' : 'USD'} ${discount.min_cart_amount}`);
            }

            if (discount.max_uses <= discount.used_count) throw new Error('Discount code usage limit reached.');

            if (data.sub_total < discount.discount_amount) throw new Error("Not able to apply this code on your cart.");

            if (!discount.status) throw new Error('Discount code is not available right now.');

            // Check if the user has already used this discount code
            const existingBooking = await Booking.findOne({ user_id: req.user._id, discount_id: discount._id });
            if (existingBooking) throw new Error('You have already used this discount code');

            data.discount_id = discount._id;
            data.discount = Math.round(discount.discount_amount * 100) / 100;
        }

        data.user_id = req.user._id;
        data.total = Math.round((data.sub_total + data.tax - data.discount) * 100) / 100;
        data.status = 0;

        let result = await Booking.create(data);
        const dataObj = {
            tid: Math.ceil(Math.random() * 1000000000),
            merchant_id: process.env.MERCHANT_ID,
            order_id: result._id,
            currency: 'INR',
            amount: data.total,
            redirect_url: process.env.REDIRECT_URL_SUCCESS,
            cancel_url: process.env.REDIRECT_URL_ERROR,
            language: 'EN',
            billing_name: `${req.user.first_name} ${req.user.last_name}`,
            billing_tel: req.user.mobile,
            billing_email: req.user.email,
        }

        var dataString = ``;
        Object.keys(dataObj).forEach(function (key) { dataString += `${key}=${dataObj[key]}&` });

        const encRequest = encrypt(dataString, process.env.WORKING_KEY);
        if (encRequest) {
            return res.json({ status: true, message: 'Success', encRequest, accessCode: process.env.ACCESS_CODE });
        } else {
            return res.status(500).json({ status: false, message: 'Failed to encrypt data' });
        }
    } catch (error) {
        return res.someThingWentWrong(error);
    }
}

exports.bookingHistoryList = async (req, res) => {
    try {
        var { limit, pageNo, query, orderBy, orderDirection, type } = req.query;

        limit = limit ? parseInt(limit) : 10;
        pageNo = pageNo ? parseInt(pageNo) : 1;
        query = query || null;
        orderBy = orderBy || 'createdAt';
        orderDirection = orderDirection ? parseInt(orderDirection) : -1;

        var search = { deletedAt: null, user_id: req.user._id };
        if (query) {
            search.$or = [
                { retreat_id: new RegExp(query, 'i') },
                { discount_code: new RegExp(query, 'i') },
                { total: new RegExp(query, 'i') },
            ];
        }
        if (type) {
            search.type = parseInt(type);
        }
        var results = await Booking
            .find(search)
            .select('retreat_id single_occupancy double_occupancy triple_occupancy currency discount_code sub_total discount tax total user_plan booking createdAt')
            .limit(limit)
            .skip((pageNo - 1) * limit)
            .sort({ [orderBy]: orderDirection });


        const total_count = await Booking.countDocuments(search);
        if (results.length > 0) {
            return res.pagination(results, total_count, limit, pageNo);
        } else {
            return res.datatableNoRecords();
        }
    } catch (error) {
        return res.someThingWentWrong(error);
    }
}
