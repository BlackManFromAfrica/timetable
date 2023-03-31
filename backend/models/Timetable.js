import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true,
  },
  dataEvent: {
    name: {
      type: String
    },
    cabinet: {
      type: String
    },
    time: {
      type: String
    },
    groupNames: [],
  },
  groups: [
    {
      group: {
        type: String,
        required: true,
      },
      lessons: [
        {
          title: {
            type: String,
    
          },
          teacher: {
            type: String,
    
          },
          cabinet: {
            type: String,
   
          },
        },
      ],
    },
  ],
});
export default mongoose.model("Timetable", TimetableSchema);
