"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userCompletedQuestsSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    guildId: { type: String, required: true },
    completedQuests: [{
            quest: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Quest' },
            completedAt: { type: Date, default: Date.now },
            rewardedExp: [{
                    skill: String,
                    amount: Number
                }],
            rewardedCurrency: Number
        }]
});
userCompletedQuestsSchema.statics.findByUser = function (userId, guildId) {
    return this.find({ userId, guildId });
};
userCompletedQuestsSchema.statics.countByUser = function (userId, guildId) {
    return this.countDocuments({ userId, guildId });
};
// Create compound index for userId and guildId
userCompletedQuestsSchema.index({ userId: 1, guildId: 1 }, { unique: true });
module.exports = mongoose_1.default.model('UserCompletedQuests', userCompletedQuestsSchema);
