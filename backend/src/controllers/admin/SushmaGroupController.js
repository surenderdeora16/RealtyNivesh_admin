const {SushmaGroupEnquiry, SushmaElementaEnquiry } = require("../../models");

exports.EnquiryList = async (req, res) => {
    try {

        var { limit, pageNo, query, orderBy, orderDirection } = req.query

        limit = limit ? parseInt(limit) : 10;
        pageNo = pageNo ? parseInt(pageNo) : 1;
        query = query || null;
        orderBy = orderBy || 'createdAt';
        orderDirection = orderDirection ? parseInt(orderDirection) : -1;

        var search = { deletedAt: null }
        if (query) {
            search.$or = [
                { name: new RegExp(query, 'i') },
                { mobile: new RegExp(query, 'i') },
                { email: new RegExp(query, 'i') },
                { projectName: new RegExp(query, 'i') },
                { message: new RegExp(query, 'i') },
                { event: new RegExp(query, 'i') },
                { otpStatus: new RegExp(query, 'i') },
            ];
        }

        var results = await SushmaGroupEnquiry
            .find(search)
            .select('type name mobile email message siteVisitDate projectName event otpStatus createdAt')
            .limit(limit)
            .skip((pageNo - 1) * limit)
            .sort({ [orderBy]: orderDirection })

        const total_count = await SushmaGroupEnquiry.countDocuments(search);
        if (results.length > 0) {
            return res.pagination(results, total_count, limit, pageNo);
        } else {
            return res.datatableNoRecords();
        }
    } catch (error) {
        return res.someThingWentWrong(error);
    }
}