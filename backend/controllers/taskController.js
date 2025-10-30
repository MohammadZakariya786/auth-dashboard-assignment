import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ user: req.user.id, title, description });
  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const { search, status } = req.query;

    // Build dynamic filter object
    const filter = { user: req.user.id };

    // 🔍 Search by title or description
    if (search && search.trim() !== "") {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // ⚙️ Filter by task status
    if (status && status !== "all") {
      filter.status = status;
    }

    // Fetch data with filters, pagination & sorting
    const total = await Task.countDocuments(filter);
    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      tasks,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(task);
};

export const deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: "Task deleted" });
};
