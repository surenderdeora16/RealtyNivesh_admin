const { SushmaElementaEnquiry } = require("../../models");

exports.EnquiryList = async (req, res) => {
    try {

        var { limit, pageNo, query, orderBy, orderDirection, activeTab } = req.query

        limit = limit ? parseInt(limit) : 10;
        pageNo = pageNo ? parseInt(pageNo) : 1;
        query = query || null;
        orderBy = orderBy || 'createdAt';
        orderDirection = orderDirection ? parseInt(orderDirection) : -1;

        var search = { deletedAt: null }

        if (activeTab) {
            search.type = parseInt(activeTab);
        }

        if (query) {
            search.$or = [
                { name: new RegExp(query, 'i') },
                { mobile: new RegExp(query, 'i') },
                { email: new RegExp(query, 'i') },
                { city: new RegExp(query, 'i') },
                { message: new RegExp(query, 'i') },
                { preferredHomeSize: new RegExp(query, 'i') },
                { broker: new RegExp(query, 'i') },
                { howHeardAboutUs: new RegExp(query, 'i') },
                { event: new RegExp(query, 'i') },
                { otpStatus: new RegExp(query, 'i') },
            ];
        }

        if (req?.query?.createdAt?.from || req?.query?.createdAt?.to) {
            search.createdAt = {};
            const createdAtFrom = req?.query?.createdAt?.from ? new Date(req?.query?.createdAt?.from) : null;
            const createdAtTo = req?.query?.createdAt?.to ? new Date(req?.query?.createdAt?.to) : null;

            if (createdAtFrom && createdAtTo && createdAtFrom.getTime() === createdAtTo.getTime()) {
                search.createdAt.$gte = createdAtFrom;
                createdAtTo.setHours(23, 59, 59, 999);
                search.createdAt.$lte = createdAtTo;
            } else {
                if (createdAtFrom) {
                    search.createdAt.$gte = createdAtFrom;
                }
                if (createdAtTo) {
                    search.createdAt.$lte = createdAtTo;
                }
            }
        }

        // Date filtering for siteVisitDate
        if (req?.query?.siteVisitDate?.from || req?.query?.siteVisitDate?.to) {
            console.log('search.siteVisitDate', search.siteVisitDate)
            search.siteVisitDate = {};
            const siteVisitFrom = req?.query?.siteVisitDate?.from ? new Date(req.query.siteVisitDate.from) : null;
            const siteVisitTo = req?.query?.siteVisitDate?.to ? new Date(req.query.siteVisitDate.to) : null;
            console.log('siteVisitDateFT', siteVisitFrom, siteVisitTo)
        
            if (siteVisitFrom && siteVisitTo && siteVisitFrom.getTime() === siteVisitTo.getTime()) {
                console.log("same come")
                search.siteVisitDate.$gte = siteVisitFrom;
                siteVisitTo.setHours(23, 59, 59, 999); // Adjust to the end of the day
                search.siteVisitDate.$lte = siteVisitTo;
            } else {
                if (siteVisitFrom) {
                    search.siteVisitDate.$gte = siteVisitFrom; // From date
                    console.log("range come from", search.siteVisitDate.$gte)
                }
                if (siteVisitTo) {
                    search.siteVisitDate.$lte = siteVisitTo; // To date
                    console.log("range come to",search.siteVisitDate.$lte)
                }
            }
        }
        

        var results = await SushmaElementaEnquiry
            .find(search)
            .select('type name mobile email city message siteVisitDate preferredHomeSize broker howHeardAboutUs event otpStatus createdAt')
            .limit(limit)
            .skip((pageNo - 1) * limit)
            .sort({ [orderBy]: orderDirection })
        console.log('results', results)
        const total_count = await SushmaElementaEnquiry.countDocuments(search);
        if (results.length > 0) {
            return res.pagination(results, total_count, limit, pageNo);
        } else {
            return res.datatableNoRecords();
        }
    } catch (error) {
        return res.someThingWentWrong(error);
    }
}