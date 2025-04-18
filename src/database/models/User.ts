import mongoose from 'mongoose';
const UserCompletedQuests = require('./UserCompletedQuests');

// User interface
interface User {
    userId: string,
    guildId: string,
    balance: number,
    accessToken: string,
    refreshToken: string,
    activeQuest: {
        quest: {},
        startedAt: Date,
        completed: boolean
    },
    availableQuests: [
        {
            quest: {},
            startedAt: Date,
            completed: boolean
        }
    ]
}
// Define Quest interface
interface Quest {
    _id: mongoose.Types.ObjectId;
    reward: {
        experience: number;
        currency: number;
    };
}

const UserSchema = new mongoose.Schema<User>({
    userId: { type: String, required: true},
    guildId: { type: String, required: false },
    balance: { type: Number, default: 0 },
    accessToken: { type: mongoose.SchemaTypes.String, required: false},
    refreshToken: { type: mongoose.SchemaTypes.String, required: false},
    
    // Quest-related fields
    activeQuest: {
        quest: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest' },
        startedAt: { type: Date },
        completed: { type: Boolean, default: false }
    },
    
    availableQuests: [{
        quest: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest' },
        expiresAt: { type: Date, default: null }
    }]
    }, 
    {
    timestamps: true,
    methods: {
        async acceptQuest(questIndex) {
            if (this.activeQuest?.quest) {
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
        },

        async completeQuest() {
            if (!this.activeQuest?.quest) {
                throw new Error('No active quest to complete');
            }

            if (!this.activeQuest?.completed) {
                throw new Error('Quest not yet completed');
            }

            // Cast to Quest type to access reward properties
            const completedQuest = this.activeQuest.quest as any;
            
            // Record completion - this saves automatically due to findOneAndUpdate
            await UserCompletedQuests.findOneAndUpdate(
                { userId: this.userId, guildId: this.guildId },
                {
                    $push: {
                        completedQuests: {
                            quest: completedQuest._id,
                            completedAt: new Date(),
                            rewardedExp: completedQuest.reward.experience,
                            rewardedCurrency: completedQuest.reward.currency
                        }
                    }
                },
                { upsert: true, new: true }
            );

            // Update balance
            this.balance += completedQuest.reward.currency;

            // Clear active quest
            this.activeQuest = {
                quest: null!,
                startedAt: null!,
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
        },
    }
});

UserSchema.index({ userId: 1, guildId: 1 }, { unique: true });

// Validations
UserSchema.path('availableQuests').validate(function(quests) {
    return quests.length <= 3;
}, 'Cannot have more than 3 available quests');

export default mongoose.model('Users', UserSchema);