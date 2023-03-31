import GroupModel from "../models/Group.js";

export const create = async (req, res) => {
  try {
    const doc = new GroupModel({
      name: req.body.name,
      academic: req.body.academic,
    });

    const group = await doc.save();
    res.json(group);
  } catch (err) {
    
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать группу",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const groups = await GroupModel.find().exec();
    res.json(groups);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить группу",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const groupId = req.params.id;

    GroupModel.findByIdAndUpdate(
      {
        _id: groupId,
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось вернуть группу",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "группа не найдена",
          });
        }
        res.json(doc);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить группу",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const groupId = req.params.id;

    GroupModel.findByIdAndDelete(
      {
        _id: groupId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить группу",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Группа не найден",
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
      message: "Не удалось получить группу",
    });
  }
};
export const update = async (req, res) => {
  try {
    const groupId = req.params.id;
    await GroupModel.updateOne(
      {
        _id: groupId,
      },
      {
        academic: req.body.academic,
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить группу",
    });
  }
};

