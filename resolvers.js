const { User } = require('./models/user');
const { Medication } = require('./models/medications');

const resolvers = {
    Query: {
        getUsers: async () => await User.find({}).exec(),
        getUserbyName: async (_, args) => await User.findOne(args).exec(),
        getUserbyId: async (_, args) => await User.findById(args.id)
    },
    Mutation: {
        addUser: async (_, args) => {
            try {
                let response = await User.create(args);
                return response;
            } catch(e) {
                return e.message;
            }
        },
        updateUserMedicalQualifications: async (_, args) => {
            var filter = { _id: args.id };
            var update = { $set: {isMedicalProfessional: args.isMedicalProfessional} };
            result = User.findOneAndUpdate(filter, update, function(err, res) {
                if (err) throw err;
              });
            return result
        },
        updateUserBio: async (_, args) => {
            var filter = { _id: args.id };
            var update = { $set: {bio: args.bio} };
            result = User.findOneAndUpdate(filter, update, function(err, res) {
                    if (err) throw err;
                  });
            return result
        },
        addMedication: async (_, args) => {
            try {
                let response = await Medication.create(args);
                return response;
            } catch(e) {
                return e.message;
            }
        }
    }
};

exports.resolvers = resolvers;

