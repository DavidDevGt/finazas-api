const BaseController = require("./BaseController");
const DiaryEntry = require("../models/DiaryEntry");

class DiaryEntryController extends BaseController {
    constructor() {
        super(new DiaryEntry());
    }
}

module.exports = DiaryEntryController;