import TeacherModel from "../models/Teacher.js";

export const create = async (req, res) => {
  try {
    const doc = new TeacherModel({
      fullName: req.body.fullName,
    });

    const teacher = await doc.save();
    res.json(teacher);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Учитель уже создан",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const teachers = await TeacherModel.find().exec();
    res.json(teachers);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить учителей",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const teacherId = req.params.id;

    TeacherModel.findByIdAndUpdate(
      {
        _id: teacherId,
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось получить учителя",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Учител не найден",
          });
        }
        res.json(doc);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить учителя",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const applicationId = req.params.id;

    TeacherModel.findByIdAndDelete(
      {
        _id: applicationId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить учителя",
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
      message: "Не удалось получить учителя",
    });
  }
};
export const update = async (req, res) => {
  try {
    const teacherId = req.params.id;
    await TeacherModel.updateOne(
      {
        _id: teacherId,
      },
      {
        holidays: req.body.holidays,
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить учителя",
    });
  }
};
