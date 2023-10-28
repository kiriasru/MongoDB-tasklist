const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
  try {
    const { task, description, priority, dueDate } = req.body;
    const newTask = new Task({ task, description, priority, dueDate });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Actualizar una tarea por ID
router.put('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Eliminar una tarea por ID
router.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findOneAndDelete({ _id: taskId });
    res.json(deletedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
