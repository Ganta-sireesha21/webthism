const supabase = require("../config/supabaseClient");


const getTodos = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*");

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};


const addTodo = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { text, due_at, dueAt, created_at, schedule } = req.body;

    const insertObj = { text };

    if (due_at) insertObj.due_at = due_at;
    if (dueAt && !insertObj.due_at) insertObj.due_at = dueAt;
    if (created_at) insertObj.created_at = created_at;
    if (schedule) insertObj.schedule = schedule;

    const { data, error } = await supabase
      .from("todos")
      .insert([insertObj])
      .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    res.status(201).json(data);

  } catch (err) {
    console.log("CATCH ERROR:", err);

    res.status(500).json({
      error: "Server Error",
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const { text } = req.body;

    const { data, error } = await supabase
      .from("todos")
      .update({ text })
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};