const express = require('express');
const User = require("../models/user");
const mongoose = require("mongoose");
const router = express.Router();
const {Types} = mongoose;

// Crear usuario
router.post("/", (req, res) => {
    const { Usuario, Contraseña } = req.body;
    const newUser = new User({ Usuario, Contraseña });
    newUser
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Obtener usuario por ID
router.get("/:parametro", (req, res) => {
  const { parametro } = req.params;

  // Verificar si el parámetro es un ObjectId válido
  if (Types.ObjectId.isValid(parametro)) {
    // Si es un ObjectId, buscar por ID
    User.findById(parametro)
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(data);
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  } else {
    // Si no es un ObjectId válido, buscar por nombre de usuario
    User.findOne({ Usuario: parametro })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(data);
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }
});


// Eliminar usuario por ID
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    User
        .findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Actualizar usuario por ID
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { Usuario, Contraseña } = req.body;
    User
        .findByIdAndUpdate(id, { Usuario, Contraseña }, { new: true })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Obtener todos los usuarios
router.get("/", (req, res) => {
    User.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
