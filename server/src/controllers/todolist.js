const { todolist } = require("../../models");

exports.addTodo = async (req, res) => {
  try {
    await todolist.create(req.body);
    res.send({
      status: "success",
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todolists = await todolist.findAll({
      attributes: {
        exclude: ["idUser", "updatedAt"],
      },
      order:[[
        "createdAt","DESC" 
      ]],
    });

    let todos = JSON.parse(JSON.stringify(todolists));

    res.send({
      status: "success",
      data: { todos },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed get resources",
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const todolists = await todolist.findAll({
      where: {
        status :"Done",
      },
      attributes: {
        exclude: ["idUser", "updatedAt"],
      },
      order:[[
        "createdAt","DESC" 
      ]],
    });

    let todos = JSON.parse(JSON.stringify(todolists));

    res.send({
      status: "success",
      data: { todos },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed get resources",
    });
  }
};


exports.getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    let todolists = await todolist.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: { todolists },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await todolist.update(req.body, {
      where: {
        id,
      },
    });

    let todolists = await todolist.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      todolist: { todolists },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Server Error",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await todolist.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
    });
  }
};
