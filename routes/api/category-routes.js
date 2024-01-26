const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categorieData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categorieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categorieData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if(!categorieData) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    res.status(200).json(categorieData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categorieData = await Category.create(req.body);
    res.status(200).json(categorieData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categorieData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categorieData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categorieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categorieData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!categorieData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categorieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
