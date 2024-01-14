import {Router} from "express";
import {universityRepository} from "./university.repository.js";
import {EntityId} from "redis-om";

export const universityRouter = Router();

universityRouter.post('/', async (req, res) => {
  const university = await universityRepository.save({
    name: req.body.name,
    type: req.body.type,
    miasto: req.body.miasto,
  });

  let id = university[EntityId];
  res.send({ id });
})

universityRouter.get('/:id', async (req, res) => {
    const university = await universityRepository.fetch(req.params.id);
    res.send(university);
})

universityRouter.delete('/:id', async (req, res) => {
    await universityRepository.remove(req.params.id);
    res.type('application/json')
    res.send('OK');
})