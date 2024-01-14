import {Router} from "express";
import {universityRepository} from "./university.repository.js";
import {EntityId} from "redis-om";

export const universityRouter = Router();

universityRouter.post('/', async (req, res) => {
  const universityExists = !!await universityRepository
      .search()
      .where('name')
      .equals(req.body.name)
      .returnFirst();

  if(universityExists) {
      res.status(400).send('University with given name already exists');
      return;
  }

  const university = await universityRepository.save({
    name: req.body.name,
    type: req.body.type,
    miasto: req.body.miasto,
    score: req.body.score ?? 0,
  });

  let id = university[EntityId];
  res.send({ id });
})

universityRouter.get('/:id', async (req, res) => {
    const university = await universityRepository.fetch(req.params.id);
    res.send(university);
})

universityRouter.put('/:id', async (req, res) => {
    let university = await universityRepository.fetch(req.params.id);

    if(!university.name) {
        res.status(404).send('University with given id not found');
        return;
    }

    university = {
        ...university,
        type: req.body.type,
        miasto: req.body.miasto,
    }

    university = await universityRepository.save(university);
    res.send(university);
})

universityRouter.delete('/:id', async (req, res) => {
    let university = await universityRepository.fetch(req.params.id);

    if(!university.name) {
        res.status(404).send('University with given id not found');
        return;
    }

    await universityRepository.remove(req.params.id);
    res.type('application/json')
    res.send('OK');
})

universityRouter.post('/vote', async (req, res) => {
    let university = await universityRepository
        .search()
        .where('name')
        .equals(req.body.name)
        .returnFirst();

    if(!university) {
        res.status(400).send("University with given name doesn't exist");
        return;
    }

    university = {
        ...university,
        score: university.score + 1,
    }

    university = await universityRepository.save(university);
    res.send(university);
});