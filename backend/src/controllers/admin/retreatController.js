const { Retreat } = require('../../models')
const { convertToSlug } = require('../../helpers/string');

exports.create = async (req, res) => {
    try {
        let data = req.getBody(['name', 'short_description', 'location', 'access', 'check_in', 'check_out', 'maximum_bookings', 'details', 'prices', 'status']);

        if (req.file && req.file.filename) {
            data.image = req.file.filename;
        } else {
            return res.status(422).json({
                status: false,
                message: 'Please provide image file.',
                data: []
            });
        }

        data.slug = convertToSlug(data.name);

        let result = await Retreat.create(data);
        return res.successInsert(result);
    } catch (error) {
        return res.someThingWentWrong(error);
    }
}

exports.update = async (req, res) => {
    try {
        let record = await Retreat.findById(req.query.id);
        if (!record) return res.noRecords();

        let data = req.getBody(['name', 'short_description', 'location', 'access', 'check_in', 'check_out', 'maximum_bookings', 'image', 'status', 'details', 'prices']);
        if (req.file && req.file.filename) data.image = req.file.filename;

        const result = await record.updateOne(data);
        return res.successUpdate(result);
    } catch (error) {
        return res.someThingWentWrong(error);
    }
}

