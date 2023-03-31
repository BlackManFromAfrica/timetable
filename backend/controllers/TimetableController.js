import TimetableModel from "../models/Timetable.js";

export const create = async (req, res) => {
  try {
    const doc = new TimetableModel({
      date: req.body.date,
      groups: req.body.groups,
      dataEvent: req.body.dataEvent
    });

    const timetable = await doc.save();
    res.json(timetable);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать расписание",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const timetables = await TimetableModel.find().exec();
    res.json(timetables);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить расписание",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const timetableId = req.params.id;

    TimetableModel.findByIdAndUpdate(
      {
        _id: timetableId,
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось вернуть расписание",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "расписание не найдено",
          });
        }
        res.json(doc);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить расписание",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const applicationId = req.params.id;

    TimetableModel.findByIdAndDelete(
      {
        _id: applicationId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить расписание",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "заявка не найден",
          });
        }
        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить расписание",
    });
  }
};
export const update = async (req, res) => {
  try {
    const timetableId = req.params.id;
    await TimetableModel.updateOne(
      {
        _id: timetableId,
      },
      {
        classes: req.body.classes,
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить расписание",
    });
  }
};
