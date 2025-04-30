"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserCompletedQuests = require('./UserCompletedQuests');
const UserSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    guildId: { type: String, required: false },
    balance: { type: Number, default: 0 },
    accessToken: { type: mongoose_1.default.SchemaTypes.String, required: false },
    refreshToken: { type: mongoose_1.default.SchemaTypes.String, required: false },
    // Quest-related fields
    activeQuest: {
        quest: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Quest' },
        startedAt: { type: Date },
        completed: { type: Boolean, default: false }
    },
    availableQuests: [{
            quest: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Quest' },
            expiresAt: { type: Date, default: null }
        }]
}, {
    timestamps: true,
    methods: {
        acceptQuest(questIndex) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                if ((_a = this.activeQuest) === null || _a === void 0 ? void 0 : _a.quest) {
                    throw new Error('Already have an active quest');
                }
                if (questIndex < 0 || questIndex >= this.availableQuests.length) {
                    throw new Error('Invalid quest index');
                }
                const selectedQuest = this.availableQuests[questIndex];
                this.activeQuest = {
                    quest: selectedQuest.quest,
                    startedAt: new Date(),
                    completed: false
                };
                this.availableQuests.splice(questIndex, 1);
                return this.activeQuest;
            });
        },
        completeQuest() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (!((_a = this.activeQuest) === null || _a === void 0 ? void 0 : _a.quest)) {
                    throw new Error('No active quest to complete');
                }
                if (!((_b = this.activeQuest) === null || _b === void 0 ? void 0 : _b.completed)) {
                    throw new Error('Quest not yet completed');
                }
                // Cast to Quest type to access reward properties
                const completedQuest = this.activeQuest.quest;
                // Record completion - this saves automatically due to findOneAndUpdate
                yield UserCompletedQuests.findOneAndUpdate({ userId: this.userId, guildId: this.guildId }, {
                    $push: {
                        completedQuests: {
                            quest: completedQuest._id,
                            completedAt: new Date(),
                            rewardedExp: completedQuest.reward.experience,
                            rewardedCurrency: completedQuest.reward.currency
                        }
                    }
                }, { upsert: true, new: true });
                // Update balance
                this.balance += completedQuest.reward.currency;
                // Clear active quest
                this.activeQuest = {
                    quest: null,
                    startedAt: null,
                    completed: false
                };
                // Note: We don't save here because the service layer will handle saving
                return {
                    quest: completedQuest,
                    rewards: {
                        experience: completedQuest.reward.experience,
                        currency: completedQuest.reward.currency
                    }
                };
            });
        },
    }
});
UserSchema.index({ userId: 1, guildId: 1 }, { unique: true });
// Validations
UserSchema.path('availableQuests').validate(function (quests) {
    return quests.length <= 3;
}, 'Cannot have more than 3 available quests');
exports.default = mongoose_1.default.model('Users', UserSchema);
